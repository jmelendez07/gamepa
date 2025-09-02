import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { ANIMATION_SPEED } from '../constants/game-world';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import { Card } from './card/card';
import { Exercise } from './exercise/exercise';
import { ICard, IEnemy } from '@/types';
import { Enemy } from './enemy/enemy';
import HeroStats from './hero-stats';

extend({ Sprite, Container, Graphics });

interface ICharacterProps {
    hero: Texture;
}

interface ICombatCardProps {
    cards: Array<{ id: number; name: string; stats: number; exercises: { id: number; operation: string; }[] }>;
    setIsCardHeldDown: (isHeldDown: boolean) => void;
    setCardPosition: (position: { x: number; y: number }) => void;
    isTargetAssigned: boolean;
    setIsAttacking: (isAttacking: boolean) => void;
    setSelectedCard: (card: ICard | null) => void;
}

interface ICombatEnemiesProps {
    initialPosition: { x: number; y: number };
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
            }
        ]
    },
    { 
        id: 2, 
        name: 'Defend', 
        stats: 30,
        exercises: [
            {
                id: 2,
                operation: 'f´(x)=2x-4',
            }
        ] 
    },
    { 
        id: 3, 
        name: 'Heal', 
        stats: 10,
        exercises: [
            {
                id: 3,
                operation: 'f´(x)=-3x-5',
            }
        ]
    },
    { 
        id: 4, 
        name: 'Fireball', 
        stats: 20,
        exercises: [
            {
                id: 4,
                operation: 'f´(x)=4x+4',
            }
        ] 
    },
];

const enemies: IEnemy[] = [
    {
        id: 1,
        name: 'Goblin',
        avatar: '/assets/generic-enemy.png',
        health: 100
    }
];

export const Combat = ({ hero }: ICharacterProps) => {
    const spriteBgCombat = '/assets/bg-battle.jpg';

    const [heroHealth, setHeroHealth] = useState(100);
    const [maxHeroHealth] = useState(100);
    const [combatTexture, setCombatTexture] = useState<Texture | null>(null);
    const [isCardHeldDown, setIsCardHeldDown] = useState(false);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [selectedCardPosition, setSelectedCardPosition] = useState({ x: 0, y: 0 });
    const [enemyPosition, setEnemyPosition] = useState({ x: window.innerWidth * 0.75, y: window.innerHeight * 0.3 });
    const [isTargetAssigned, setIsTargetAssigned] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);

    const { sprite: heroSprite, updateSprite: updateHeroSprite } = useHeroAnimation({
        texture: hero,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: ANIMATION_SPEED,
    });

    const assignCardTarget = useCallback(
        (
            {
                cardPosition,
                characterTarget,
            }: {
                cardPosition: { x: number; y: number };
                characterTarget: { x: number; y: number };
            },
        ) => {
            return (
                cardPosition.x >= characterTarget.x &&
                cardPosition.x <= characterTarget.x + 128 &&
                cardPosition.y >= characterTarget.y &&
                cardPosition.y <= characterTarget.y + 128
            );
        },
        [],
    );

    useTick((ticker) => {
        const deltaTime = ticker.deltaTime;

        updateHeroSprite('DOWN', true, true);
        if (isCardHeldDown) {
            if (assignCardTarget({ cardPosition: selectedCardPosition, characterTarget: enemyPosition })) {
                setIsTargetAssigned(true);
            } else {
                setIsTargetAssigned(false);
            }
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

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <pixiContainer>
            {combatTexture && <pixiSprite texture={combatTexture} width={window.innerWidth} height={window.innerHeight} x={0} y={0} />}

            {heroSprite && (
                <pixiSprite texture={heroSprite.texture} x={window.innerWidth * 0.15} y={window.innerHeight * 0.3} width={128} height={128} />
            )}

            <CombatEnemies initialPosition={enemyPosition} />
            
            {isCardHeldDown && (
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        g.rect(enemyPosition.x, enemyPosition.y, 128, 128);
                        g.stroke({ color: isTargetAssigned ? 0x00ff00 : 0xff0000, width: 5 });
                    }}
                />
            )}

            <HeroStats currentHp={heroHealth} maxHp={maxHeroHealth} />
            <CombatCards
                cards={cards}
                setIsCardHeldDown={setIsCardHeldDown}
                setCardPosition={setSelectedCardPosition}
                isTargetAssigned={isTargetAssigned}
                setIsAttacking={setIsAttacking}
                setSelectedCard={setSelectedCard}
            />
            {isAttacking && 
                <Exercise 
                    enemy="nombre quemado"
                    card={selectedCard}
                    onClose={() => setIsAttacking(false)}
                />
            }
        </pixiContainer>
    );
};

const CombatEnemies = ({ initialPosition }: ICombatEnemiesProps) => {
    return (
        <>
            {
                enemies.map(enemy => (
                    <Enemy key={enemy.id} initialPosition={initialPosition} enemy={enemy} />
                ))
            }
        </>
    );
}

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
                    x: startX + (index * cardSpacing),
                    y: baseYPosition + elevationAmount
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
}