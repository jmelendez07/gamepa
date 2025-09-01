import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import { ANIMATION_SPEED } from '../constants/game-world';
import useEnemyAnimation from '../enemy/useEnemyAnimation';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import { Card } from './card/card';
import { Exercise } from './exercise/exercise';

extend({ Sprite, Container, Graphics });

interface ICharacterProps {
    hero: Texture;
    enemy: Texture;
}

const cards = [
    { id: 1, name: 'Attack', damage: 10 },
    { id: 2, name: 'Defend', damage: 5 },
    { id: 3, name: 'Heal', damage: -5 },
    { id: 4, name: 'Fireball', damage: 20 },
];

export const Combat = ({ hero, enemy }: ICharacterProps) => {
    const spriteBgCombat = '/assets/bg-battle.jpg';

    const [combatTexture, setCombatTexture] = useState<Texture | null>(null);
    const [isCardHeldDown, setIsCardHeldDown] = useState(false);
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

    const { sprite: enemySprite, updateSprite: updateEnemySprite } = useEnemyAnimation({
        texture: enemy,
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
        updateEnemySprite('combatIdle', 'left');
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

            {enemySprite && <pixiSprite texture={enemySprite.texture} x={enemyPosition.x} y={enemyPosition.y} width={128} height={128} />}

            {isCardHeldDown && (
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        g.rect(enemyPosition.x, enemyPosition.y, 128, 128);
                        g.stroke({ color: isTargetAssigned ? 0x00ff00 : 0xff0000, width: 5 });
                    }}
                />
            )}

            <CombatCards
                cards={cards}
                setIsCardHeldDown={setIsCardHeldDown}
                setCardPosition={setSelectedCardPosition}
                isTargetAssigned={isTargetAssigned}
                setIsAttacking={setIsAttacking}
            />

            {isAttacking && 
                <Exercise 
                    enemy="nombre quemado" 
                    onClose={() => setIsAttacking(false)}
                />
            }
        </pixiContainer>
    );
};

interface ICombatCardProps {
    cards: Array<{ id: number; name: string; damage: number }>;
    setIsCardHeldDown: (isHeldDown: boolean) => void;
    setCardPosition: (position: { x: number; y: number }) => void;
    isTargetAssigned: boolean;
    setIsAttacking: (isAttacking: boolean) => void;
}

const CombatCards = ({ cards, setIsCardHeldDown, setCardPosition, isTargetAssigned, setIsAttacking }: ICombatCardProps) => {
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
                        onHeldDownChange={setIsCardHeldDown} 
                        onCardPositionChange={setCardPosition} 
                        isTargetAssigned={isTargetAssigned}
                        onAttack={setIsAttacking}
                        initialPosition={cardPosition}
                        initialRotation={rotationAngle}
                    />
                );
            })}
        </>
    );
}