import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { ANIMATION_SPEED } from '../constants/game-world';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import { Enemy } from './enemy/enemy';
import { Exercise } from './exercise/exercise';
import HeroStats from './hero-stats';
import IEnemy from '@/types/enemy';
import ICard from '@/types/card';
import NextTurnButton from './combat/next-turn-button';
import DiscardedCardsStack from './combat/discarded-cards-stack';
import CardsInHand from './combat/cards-in-hand';
import StolenCardsStack from './combat/stolen-cards-stack';
import DiscardedCardsModal from './combat/discarded-cards-modal';
import StolenCardsModal from './combat/stolen-cards-modal';

extend({ Sprite, Container, Graphics });

interface ICombatProps {
    hero: Texture;
    enemies: IEnemy[];
    cards: ICard[];
    onSetSelectedEnemies: (enemies: IEnemy[]) => void;
    finish: (isFinished: boolean) => void;
    lose: () => void;
}

interface ICombatEnemiesProps {
    enemies: IEnemy[];
}

const MAX_CARDS_IN_HAND = 4;

const assetEnergy = '/assets/energy.png';
const spriteBgCombat = '/assets/bg-battle.jpg';

export const Combat = ({ hero, enemies, cards, onSetSelectedEnemies, finish, lose }: ICombatProps) => {
    const [heroHealth, setHeroHealth] = useState(100);
    const [heroEnergy, setHeroEnergy] = useState(4);
    const [turn, setTurn] = useState(0);
    const [maxHeroHealth] = useState(100);
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

    const { sprite: heroSprite, updateSprite: updateHeroSprite } = useHeroAnimation({
        texture: hero,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: ANIMATION_SPEED,
    });

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
            setHeroEnergy(prevHeroEnergy => prevHeroEnergy - 1);
            onSetSelectedEnemies(enemies.map(enemy => {
                if (enemy.id === selectedEnemy.id) {
                    return { ...enemy, health: enemy.health - selectedCard.stats };
                } else {
                    return enemy;
                }
            }));
            setDiscardedCards(prev => [...prev, selectedCard]);
            setCardsInHand(prev => prev.filter(card => card.id !== selectedCard.id));
            setSelectedCard(null);
            setIsAttacking(false);
            setIsTargetAssigned(false);
            setSelectedCardPosition({ x: 0, y: 0 });
        }
    }

    const nextTurn = () => {
        setTurn(prev => prev + 1);
        setHeroEnergy(maxHeroEnergy);
        setStolenCards(prev => [...prev,...discardedCards]);
        setDiscardedCards([]);

        if (cardsInHand.length < MAX_CARDS_IN_HAND) {
            const cardsNeeded = MAX_CARDS_IN_HAND - cardsInHand.length;
            const newCards = stolenCards.slice(0, cardsNeeded);
            setCardsInHand(prev => [...prev, ...newCards]);
            setStolenCards(prev => prev.slice(newCards.length, prev.length));
        }

        enemies.forEach(enemy => {
            if (heroHealth > 0) {
                setHeroHealth(prevHeroHealth => {
                    const newHealth = prevHeroHealth - enemy.basic_attack;
                    return newHealth < 0 ? 0 : newHealth;
                });
            }
        });
    }

    useTick((ticker) => {
        updateHeroSprite('DOWN', true, true);
        if (isCardHeldDown) {
            enemies.forEach(enemy => {
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

        Assets.load<Texture>(spriteBgCombat)
            .then((tex) => {
                if (!cancelled) {
                    setCombatTexture(tex);
                }
            });

        Assets.load<Texture>(assetEnergy)
            .then((text) => {
                setEnergyTexture(text);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (enemies.every(enemy => enemy.health <= 0)) {
            finish(true);
        } else if (heroHealth <= 0) {
            lose();
        }
    }, [heroHealth, enemies]);

    return (
        <pixiContainer>
            {combatTexture && <pixiSprite texture={combatTexture} width={window.innerWidth} height={window.innerHeight} x={0} y={0} />}

            <pixiText
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
            />

            {heroSprite && (
                <pixiSprite texture={heroSprite.texture} x={window.innerWidth * 0.15} y={window.innerHeight * 0.4} width={128} height={128} />
            )}

            <CombatEnemies enemies={enemies} />

            {isCardHeldDown && enemies.map(enemy => (
                <pixiGraphics
                    key={enemy.id}
                    draw={(g) => {
                        g.clear();
                        g.rect(enemy.combat_position?.x || 0, enemy.combat_position?.y || 0, 128, 128);
                        g.stroke({ color: (isTargetAssigned && selectedEnemy?.id === enemy.id) ? 0x00ff00 : 0xff0000, width: 5 });
                    }}
                />
            ))}

            <HeroStats currentHp={heroHealth} maxHp={maxHeroHealth} heroTexture={hero} energyTexture={energyTexture} maxEnergy={maxHeroEnergy} currentEnergy={heroEnergy} />
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
            {(isAttacking && selectedCard && selectedEnemy && selectedCard.exercises && selectedCard.exercises.length > 0) && (
                <Exercise
                    enemy={selectedEnemy}
                    card={selectedCard}
                    exercise={selectedCard.exercises[0]}
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