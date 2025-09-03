import { ICard, IEnemy } from '@/types';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { ANIMATION_SPEED } from '../constants/game-world';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import { Card } from './card/card';
import { Enemy } from './enemy/enemy';
import { Exercise } from './exercise/exercise';
import HeroStats from './hero-stats';
import { set } from 'react-hook-form';

extend({ Sprite, Container, Graphics });

interface ICombatProps {
    hero: Texture;
    enemies: IEnemy[];
    onSetSelectedEnemies: (enemies: IEnemy[]) => void;
    finish: (isFinished: boolean) => void;
}

interface ICombatCardProps {
    cards: Array<{ id: number; name: string; stats: number; exercises: { id: number; operation: string }[] }>;
    setIsCardHeldDown: (isHeldDown: boolean) => void;
    setCardPosition: (position: { x: number; y: number }) => void;
    isTargetAssigned: boolean;
    setIsAttacking: (isAttacking: boolean) => void;
    setSelectedCard: (card: ICard | null) => void;
}

interface ICombatEnemiesProps {
    enemies: IEnemy[];
}

const cards = [
    {
        id: 1,
        name: 'Attack',
        stats: 10,
        exercises: [
            {
                id: 1,
                operation: 'f´(x)=2x+5',
                steps: [
                    {
                        id: 1,
                        description: 'Identify the function and its derivative.',
                        order: 1,
                        options: [
                            { id: 1, label: 'f(x)=x+5', isCorrect: false },
                            { id: 2, label: 'f(x)=2(1)+5(0)', isCorrect: true },
                            { id: 3, label: 'f(x)=2+5', isCorrect: false },
                            { id: 4, label: 'f(x)=2(0)+5(1)', isCorrect: false },
                        ],
                    },
                    {
                        id: 2,
                        description: 'Multiply the derivative by the coefficient.',
                        order: 2,
                        options: [
                            { id: 1, label: 'f(x)=5', isCorrect: false },
                            { id: 2, label: 'f(x)=x', isCorrect: false },
                            { id: 3, label: 'f(x)=2', isCorrect: true },
                            { id: 4, label: 'f(x)=7', isCorrect: false },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: 'Defend',
        stats: 30,
        exercises: [
            {
                id: 2,
                operation: 'f´(x)=2x-4',
                steps: [
                    {
                        id: 1,
                        description: 'Identify the function and its derivative.',
                        order: 1,
                        options: [
                            { id: 1, label: 'f(x)=2(0)-4(1)', isCorrect: false },
                            { id: 2, label: 'f(x)=x-4', isCorrect: false },
                            { id: 3, label: 'f(x)=2(1)-4(0)', isCorrect: true },
                            { id: 4, label: 'f(x)=2-4', isCorrect: false },
                        ],
                    },
                    {
                        id: 2,
                        description: 'Multiply the derivative by the coefficient.',
                        order: 2,
                        options: [
                            { id: 1, label: 'f(x)=2', isCorrect: true },
                            { id: 2, label: 'f(x)=x', isCorrect: false },
                            { id: 3, label: 'f(x)=4', isCorrect: false },
                            { id: 4, label: 'f(x)=-2', isCorrect: false },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: 'Heal',
        stats: 10,
        exercises: [
            {
                id: 3,
                operation: 'f´(x)=-3x-5',
                steps: [
                    {
                        id: 1,
                        description: 'Identify the function and its derivative.',
                        order: 1,
                        options: [
                            { id: 1, label: 'f(x)=-3-5', isCorrect: false },
                            { id: 2, label: 'f(x)=-x-5', isCorrect: false },
                            { id: 3, label: 'f(x)=-3(0)-5(1)', isCorrect: false },
                            { id: 4, label: 'f(x)=-3(1)-5(0)', isCorrect: true },
                        ],
                    },
                    {
                        id: 2,
                        description: 'Multiply the derivative by the coefficient.',
                        order: 2,
                        options: [
                            { id: 1, label: 'f(x)=3', isCorrect: false },
                            { id: 2, label: 'f(x)=-3', isCorrect: true },
                            { id: 3, label: 'f(x)=-8', isCorrect: false },
                            { id: 4, label: 'f(x)=0', isCorrect: false },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        name: 'Fireball',
        stats: 20,
        exercises: [
            {
                id: 4,
                operation: 'f´(x)=4x+4',
                steps: [
                    {
                        id: 1,
                        description: 'Identify the function and its derivative.',
                        order: 1,
                        options: [
                            { id: 1, label: 'f(x)=x+4', isCorrect: false },
                            { id: 2, label: 'f(x)=4(0)+4(0)', isCorrect: false },
                            { id: 3, label: 'f(x)=4(0)+4(1)', isCorrect: false },
                            { id: 4, label: 'f(x)=4(1)+4(0)', isCorrect: true },
                        ],
                    },
                    {
                        id: 2,
                        description: 'Multiply the derivative by the coefficient.',
                        order: 2,
                        options: [
                            { id: 1, label: 'f(x)=8', isCorrect: false },
                            { id: 2, label: 'f(x)=0', isCorrect: false },
                            { id: 3, label: 'f(x)=4', isCorrect: true },
                            { id: 4, label: 'f(x)=x', isCorrect: false },
                        ],
                    },
                ],
            },
        ],
    },
];

const assetEnergy = '/assets/energy.png';

export const Combat = ({ hero, enemies, onSetSelectedEnemies, finish }: ICombatProps) => {
    const spriteBgCombat = '/assets/bg-battle.jpg';

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
        if (selectedCard && selectedEnemy) {
            setTurn(prevTurn => prevTurn + 1);

            if (heroEnergy > 0) {
                setHeroEnergy(prevHeroEnergy => prevHeroEnergy - 1);
                onSetSelectedEnemies(enemies.map(enemy => {
                    if (enemy.id === selectedEnemy.id) {
                        return { ...enemy, health: enemy.health - selectedCard.stats };
                    } else {
                        return enemy;
                    }
                }));
            }
        }
    }

    useTick((ticker) => {
        const deltaTime = ticker.deltaTime;

        updateHeroSprite('DOWN', true, true);
        if (isCardHeldDown) {
            enemies.forEach(enemy => {
                if (enemy.combatPosition && assignCardTarget({ cardPosition: selectedCardPosition, characterTarget: enemy.combatPosition })) {
                    setIsTargetAssigned(true);
                    setSelectedEnemy(enemy);
                } else {
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
            })
            .catch((err) => {
                console.error('Failed to load combat background texture:', err);
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
        if (heroHealth <= 0 || enemies.every(enemy => enemy.health <= 0)) {
            finish(true);

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
                <pixiSprite texture={heroSprite.texture} x={window.innerWidth * 0.15} y={window.innerHeight * 0.3} width={128} height={128} />
            )}

            <CombatEnemies enemies={enemies} />

            {isCardHeldDown && enemies.map(enemy => (
                <pixiGraphics
                    key={enemy.id}
                    draw={(g) => {
                        g.clear();
                        g.rect(enemy.combatPosition.x, enemy.combatPosition.y, 128, 128);
                        g.stroke({ color: isTargetAssigned ? 0x00ff00 : 0xff0000, width: 5 });
                    }}
                />
            ))}

            <HeroStats currentHp={heroHealth} maxHp={maxHeroHealth} heroTexture={hero} energyTexture={energyTexture} maxEnergy={maxHeroEnergy} currentEnergy={heroEnergy} />
            <CombatCards
                cards={cards}
                setIsCardHeldDown={setIsCardHeldDown}
                setCardPosition={setSelectedCardPosition}
                isTargetAssigned={isTargetAssigned}
                setIsAttacking={setIsAttacking}
                setSelectedCard={setSelectedCard}
            />
            {(isAttacking && selectedCard && selectedEnemy) && (
                <Exercise
                    enemy={selectedEnemy}
                    card={selectedCard}
                    exercise={selectedCard?.exercises ? selectedCard.exercises[0] : undefined}
                    onClose={() => {
                        setIsAttacking(false);
                        setIsTargetAssigned(false);
                        setSelectedCardPosition({ x: 0, y: 0 });
                    }}
                    onIsAttacking={setIsAttacking}
                    attack={attack}
                />
            )}
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

const CombatCards = ({ cards, setIsCardHeldDown, setCardPosition, isTargetAssigned, setIsAttacking, setSelectedCard }: ICombatCardProps) => {
    return (
        <>
            {cards.map((card, index) => {
                const cardSpacing = 240;
                const totalWidth = cards.length * cardSpacing - 20;
                const startX = (window.innerWidth - totalWidth) / 2;
                const baseYPosition = window.innerHeight - 320;
                const centerIndex = (cards.length - 1) / 2;
                const rotationAngle = (index - centerIndex) * 0.15;
                const isFirstCard = index === 0;
                const isLastCard = index === cards.length - 1;
                const isExtremeCard = isFirstCard || isLastCard;
                const elevationAmount = isExtremeCard ? 0 : -40;

                const cardPosition = {
                    x: startX + index * cardSpacing,
                    y: baseYPosition + elevationAmount,
                };

                return (
                    <Card
                        key={card.id}
                        card={card}
                        onHeldDownChange={setIsCardHeldDown}
                        onCardPositionChange={setCardPosition}
                        isTargetAssigned={isTargetAssigned}
                        onAttack={setIsAttacking}
                        initialPosition={cardPosition}
                        initialRotation={rotationAngle}
                        onSelectedCard={setSelectedCard}
                    />
                );
            })}
        </>
    );
};
