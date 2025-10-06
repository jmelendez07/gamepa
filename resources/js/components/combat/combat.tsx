import ICard from '@/types/card';
import IEnemy from '@/types/enemy';
import Hero from '@/types/hero';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { ANIMATION_SPEED } from '../constants/game-world';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import CardsInHand from './combat/cards-in-hand';
import DiscardedCardsModal from './combat/discarded-cards-modal';
import DiscardedCardsStack from './combat/discarded-cards-stack';
import NextTurnButton from './combat/next-turn-button';
import StolenCardsModal from './combat/stolen-cards-modal';
import StolenCardsStack from './combat/stolen-cards-stack';
import { Enemy } from './enemy/enemy';
import { Exercise } from './exercise/exercise';
import HeroStats from './hero-stats';
import { CombatUI } from './combat-ui/combat-ui';
import { Stage } from '@/types/planet';

extend({ Sprite, Container, Graphics });

interface ICombatProps {
    team: Hero[];
    teamTextures: Texture[];
    enemies: IEnemy[];
    cards: ICard[];
    currentStage: Stage;
    onSetSelectedEnemies: (enemies: IEnemy[]) => void;
    finish: (isFinished: boolean, xpGained: number) => void;
    lose: () => void;
}

interface ICombatEnemiesProps {
    enemies: IEnemy[];
}

const MAX_CARDS_IN_HAND = 4;

const assetEnergy = '/assets/energy.png';
const spriteBgCombat = '/assets/bg-battle.jpg';

export const Combat = ({ team, teamTextures, enemies, cards, currentStage, onSetSelectedEnemies, finish, lose }: ICombatProps) => {
    const [heroHealth, setHeroHealth] = useState(team[0]?.health || 100); // Usar el primer héroe como referencia
    const [heroEnergy, setHeroEnergy] = useState(4);
    const [turn, setTurn] = useState(0);
    const [maxHeroHealth] = useState(team[0]?.health || 100);
    const [maxHeroEnergy] = useState(4);
    const [combatTexture, setCombatTexture] = useState<Texture | null>(null);
    const [isCardHeldDown, setIsCardHeldDown] = useState(false);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [selectedEnemy, setSelectedEnemy] = useState<IEnemy | null>(null);
    const [selectedCardPosition, setSelectedCardPosition] = useState({ x: 0, y: 0 });
    const [isTargetAssigned, setIsTargetAssigned] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [energyTexture, setEnergyTexture] = useState<Texture | null>(null);
    const [stolenCards, setStolenCards] = useState<ICard[]>(cards.slice(MAX_CARDS_IN_HAND, cards.length));
    const [cardsInHand, setCardsInHand] = useState<ICard[]>(cards.slice(0, MAX_CARDS_IN_HAND));
    const [discardedCards, setDiscardedCards] = useState<ICard[]>([]);
    const [showDiscardedCardsModal, setShowDiscardedCardsModal] = useState(false);
    const [showStolenCardsModal, setShowStolenCardsModal] = useState(false);
    const [isAttackingAnimation, setIsAttackingAnimation] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [attackingHeroIndex, setAttackingHeroIndex] = useState<number | null>(null);

    // Crear hooks de animación para hasta 4 héroes (ajusta según tus necesidades)
    const hero0Animation = useHeroAnimation({
        texture: teamTextures[0], // fallback
        frameWidth: 64,
        frameHeight: 64,
        totalTilesFrames: team[0].hero_animations.find((anim) => anim.action === 'fighting')?.totalTilesFrames || 2,
        animationSpeed: ANIMATION_SPEED,
        heroAnimation: team[0].hero_animations.find((anim) => anim.action === 'fighting') || team[0].hero_animations[0]
    });

    const hero1Animation = useHeroAnimation({
        texture: teamTextures[1] || teamTextures[0], // fallback
        frameWidth: 64,
        frameHeight: 64,
        totalTilesFrames: team[1]?.hero_animations.find((anim) => anim.action === 'fighting')?.totalTilesFrames || team[0].hero_animations[0].totalTilesFrames || 2,
        animationSpeed: ANIMATION_SPEED,
        heroAnimation: team[1].hero_animations.find((anim) => anim.action === 'fighting') || team[1]?.hero_animations[1]
    });

    const hero2Animation = useHeroAnimation({
        texture: teamTextures[2] || teamTextures[0], // fallback
        frameWidth: 64,
        frameHeight: 64,
        totalTilesFrames: team[2]?.hero_animations.find((anim) => anim.action === 'fighting')?.totalTilesFrames || team[0].hero_animations[0].totalTilesFrames || 2,
        animationSpeed: ANIMATION_SPEED,
        heroAnimation: team[2]?.hero_animations.find((anim) => anim.action === 'fighting') || team[2]?.hero_animations[0] || team[0].hero_animations[0]
    });

    const hero3Animation = useHeroAnimation({
        texture: teamTextures[3] || teamTextures[0], // fallback
        frameWidth: 64,
        frameHeight: 64,
        totalTilesFrames: team[3]?.hero_animations.find((anim) => anim.action === 'fighting')?.totalTilesFrames || team[0].hero_animations[0].totalTilesFrames || 2,
        animationSpeed: ANIMATION_SPEED,
        heroAnimation: team[3]?.hero_animations.find((anim) => anim.action === 'fighting') || team[3]?.hero_animations[0] || team[0].hero_animations[0]
    });

    // Hook para animación de ataque
    const attackAnimation = useHeroAnimation({
        texture: attackingHeroIndex !== null ? teamTextures[attackingHeroIndex] : teamTextures[0],
        frameWidth: 128,
        frameHeight: 64,
        totalTilesFrames: team[attackingHeroIndex || 0].hero_animations.find((anim) => anim.action === 'attack')?.totalTilesFrames || 8,
        animationSpeed: ANIMATION_SPEED,
        heroAnimation: team[attackingHeroIndex || 0].hero_animations.find((anim) => anim.action === 'attack') || team[attackingHeroIndex || 0].hero_animations[0]
    });

    // Array de animaciones para facilitar el acceso
    const heroAnimations = [hero0Animation, hero1Animation, hero2Animation, hero3Animation];

    const assignCardTarget = useCallback(
        ({ cardPosition, characterTarget }: { cardPosition: { x: number; y: number }; characterTarget: { x: number; y: number } }) => {
            return (
                cardPosition.x >= characterTarget.x &&
                cardPosition.x <= characterTarget.x + 128 &&
                cardPosition.y >= characterTarget.y &&
                cardPosition.y <= characterTarget.y + 128
            );
        },
        [],
    );

    const attack = () => {
        if (selectedCard && selectedEnemy && heroEnergy > 0) {
            setHeroEnergy((prevHeroEnergy) => prevHeroEnergy - selectedCard.energy_cost);

            if (selectedCard.hero_id && team.some((hero) => hero.id === selectedCard.hero_id)) {
                const attackingIndex = team.findIndex((hero) => hero.id === selectedCard.hero_id);
                if (attackingIndex !== -1) {
                    setAttackingHeroIndex(attackingIndex);
                    attackAnimation.resetAnimation();
                    setIsAttackingAnimation(true);
                }
            }
            attackAnimation.resetAnimation();
            setIsAttackingAnimation(true);

            onSetSelectedEnemies(
                enemies.map((enemy) => {
                    if (enemy.id === selectedEnemy.id) {
                        if (enemy.health - selectedCard.stats <= 0) {
                            console.log('enemy', enemy);
                            setXpGained((prev) => prev + (enemy.type?.reward_xp || 0));
                            console.log('Total XP gained:', xpGained + (enemy.type?.reward_xp || 0));
                        }
                        return { ...enemy, health: enemy.health - selectedCard.stats };
                    } else {
                        return enemy;
                    }
                }),
            );
            setDiscardedCards((prev) => [...prev, selectedCard]);
            setCardsInHand((prev) => prev.filter((card) => card.id !== selectedCard.id));
            setSelectedCard(null);
            setIsAttacking(false);
            setIsTargetAssigned(false);
            setSelectedCardPosition({ x: 0, y: 0 });
        }
    };

    const nextTurn = () => {
        setTurn((prev) => prev + 1);
        setHeroEnergy(maxHeroEnergy);
        setStolenCards((prev) => [...prev, ...discardedCards]);
        setDiscardedCards([]);

        if (cardsInHand.length < MAX_CARDS_IN_HAND) {
            const cardsNeeded = MAX_CARDS_IN_HAND - cardsInHand.length;
            const newCards = stolenCards.slice(0, cardsNeeded);
            setCardsInHand((prev) => [...prev, ...newCards]);
            setStolenCards((prev) => prev.slice(newCards.length, prev.length));
        }

        enemies.forEach((enemy) => {
            if (heroHealth > 0) {
                setHeroHealth((prevHeroHealth) => {
                    const newHealth = prevHeroHealth - enemy.basic_attack;
                    return newHealth < 0 ? 0 : newHealth;
                });
            }
        });
    };

    useTick(() => {
        if (isAttackingAnimation && attackingHeroIndex !== null) {
            const keepPlaying = attackAnimation.updateAttackSprite('RIGHT', false, false, false, true);
            if (!keepPlaying) {
                attackAnimation.resetAnimation();
                setIsAttackingAnimation(false);
                setAttackingHeroIndex(null);
            }
        }

        // Actualizar animaciones de todos los héroes disponibles
        heroAnimations.forEach((animation, index) => {
            if (index < team.length && (!isAttackingAnimation || attackingHeroIndex !== index)) {
                animation.updateSprite('DOWN', true, true, false, false);
            }
        });

        if (isCardHeldDown) {
            enemies.forEach((enemy) => {
                if (enemy.combat_position && assignCardTarget({ cardPosition: selectedCardPosition, characterTarget: enemy.combat_position })) {
                    setIsTargetAssigned(true);
                    setSelectedEnemy(enemy);
                } else if (selectedEnemy?.id === enemy.id) {
                    setIsTargetAssigned(false);
                    setSelectedEnemy(null);
                }
            });
        }
    });

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(spriteBgCombat).then((tex) => {
            if (!cancelled) {
                setCombatTexture(tex);
            }
        });

        Assets.load<Texture>(assetEnergy).then((text) => {
            setEnergyTexture(text);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (enemies.every((enemy) => enemy.health <= 0)) {
            finish(true, xpGained);
        } else if (heroHealth <= 0) {
            lose();
        }
    }, [heroHealth, enemies]);

    return (
        <pixiContainer>
            {combatTexture && <pixiSprite texture={combatTexture} width={window.innerWidth} height={window.innerHeight} x={0} y={0} />}

            <CombatUI teamHeroes={team} currentTurn={turn + 1} currentStage={currentStage} />

            {/* <pixiText
                text={`Turno N°${turn + 1}`}
                x={5}
                y={5}
                style={{
                    fontFamily: 'Arial',
                    fontSize: 28,
                    fill: 0xffffff,
                    fontWeight: 'bold',
                    stroke: { color: 0x000000, width: 3 },
                }}
            /> */}

            {/* Renderizar héroes con animaciones */}
            {team.map((hero, index) => {
                if (index >= heroAnimations.length) return null;

                const heroSprite = isAttackingAnimation && attackingHeroIndex === index ? attackAnimation.sprite : heroAnimations[index]?.sprite;

                const baseX = window.innerWidth * 0.15;
                const baseY = window.innerHeight * 0.4;
                const spacing = 120;

                // Calcular el ancho del sprite
                const isAttackSprite = isAttackingAnimation && attackingHeroIndex === index;
                const spriteWidth = isAttackSprite ? 384 : 128;
                const normalWidth = 128;

                // Ajustar la posición X para centrar el sprite cuando se estira
                const adjustedX = isAttackSprite ? baseX - (spriteWidth - normalWidth) / 2 : baseX;

                return (
                    heroSprite && (
                        <pixiSprite
                            key={hero.id || index}
                            texture={heroSprite.texture}
                            x={adjustedX} // ← Usar la posición ajustada
                            y={baseY + index * spacing}
                            width={spriteWidth}
                            height={128}
                        />
                    )
                );
            })}

            <CombatEnemies enemies={enemies} />

            {isCardHeldDown &&
                enemies.map((enemy) => (
                    <pixiGraphics
                        key={enemy.id}
                        draw={(g) => {
                            g.clear();
                            g.rect(enemy.combat_position?.x || 0, enemy.combat_position?.y || 0, 128, 128);
                            g.stroke({ color: isTargetAssigned && selectedEnemy?.id === enemy.id ? 0x00ff00 : 0xff0000, width: 5 });
                        }}
                    />
                ))}

            <HeroStats
                currentHp={heroHealth}
                maxHp={maxHeroHealth}
                heroTexture={teamTextures[0]}
                energyTexture={energyTexture}
                maxEnergy={maxHeroEnergy}
                currentEnergy={heroEnergy}
            />
            <CardsInHand
                cards={cardsInHand}
                setIsCardHeldDown={setIsCardHeldDown}
                setCardPosition={setSelectedCardPosition}
                isTargetAssigned={isTargetAssigned}
                setIsAttacking={setIsAttacking}
                setSelectedCard={setSelectedCard}
                isDisabled={heroEnergy <= 0}
            />
            <StolenCardsStack onClick={(value) => setShowStolenCardsModal(value)} cards={stolenCards} />
            <NextTurnButton onClick={nextTurn} />
            <DiscardedCardsStack onClick={(value) => setShowDiscardedCardsModal(value)} cards={discardedCards} />
            {isAttacking && selectedCard && selectedEnemy && selectedCard.exercise && (
                <Exercise
                    enemy={selectedEnemy}
                    card={selectedCard}
                    exercise={selectedCard.exercise}
                    onClose={() => {
                        setIsAttacking(false);
                        setIsTargetAssigned(false);
                        setSelectedCardPosition({ x: 0, y: 0 });
                    }}
                    onIsAttacking={setIsAttacking}
                    attack={attack}
                />
            )}
            <DiscardedCardsModal cards={discardedCards} onClose={(value) => setShowDiscardedCardsModal(value)} isOpen={showDiscardedCardsModal} />
            <StolenCardsModal cards={stolenCards} onClose={(value) => setShowStolenCardsModal(value)} isOpen={showStolenCardsModal} />
        </pixiContainer>
    );
};

const CombatEnemies = ({ enemies }: ICombatEnemiesProps) => {
    return (
        <>
            {enemies.map((enemy) => (
                <Enemy key={enemy.id} enemy={enemy} />
            ))}
        </>
    );
};
