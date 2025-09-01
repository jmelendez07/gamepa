import { ICard } from '@/types';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Sprite, Texture, Graphics } from 'pixi.js';
import { useEffect, useState } from 'react';

extend({ Container, Sprite, Graphics });

interface ICardProps {
    card: ICard;
    onSelectedCard: (card: ICard | null) => void;
    onHeldDownChange: (isHeldDown: boolean) => void;
    onCardPositionChange: (cardPosition: { x: number; y: number }) => void;
    isTargetAssigned?: boolean;
    onAttack?: (isAttacking: boolean) => void;
    initialPosition?: { x: number; y: number };
    initialRotation?: number;
}

export const Card = ({ card, onSelectedCard, onHeldDownChange, onCardPositionChange, isTargetAssigned, onAttack, initialPosition, initialRotation }: ICardProps) => {
    const card1Asset = '/assets/cards/card-1.png';

    const [card1Texture, setCard1Texture] = useState<Texture | null>(null);
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const defaultPosition = initialPosition || { x: 500, y: 600 };
    const [cardPosition, setCardPosition] = useState(defaultPosition);
    const [targetCardPosition, setTargetCardPosition] = useState(defaultPosition);
    const [cardRotation, setCardRotation] = useState(initialRotation || 0);
    const [targetCardRotation, setTargetCardRotation] = useState(initialRotation || 0);
    const [currentHoverOffset, setCurrentHoverOffset] = useState(0);
    const [currentAlpha, setCurrentAlpha] = useState(0.8);
    const [currentTint, setCurrentTint] = useState(0x808080);
    const targetHoverOffset = isHovered && !isPointerDown ? -20 : 0;
    const targetAlpha = (isHovered || isPointerDown) ? 1.0 : 0.8;
    const targetTint = (isHovered || isPointerDown) ? 0xFFFFFF : 0x808080;
    const currentCardPosition = {
        x: cardPosition.x,
        y: cardPosition.y + currentHoverOffset
    };

    useTick((ticker) => {
        const lerpSpeed = 0.15;

        if (!isPointerDown) {
            const posDiffX = targetCardPosition.x - cardPosition.x;
            const posDiffY = targetCardPosition.y - cardPosition.y;
            if (Math.abs(posDiffX) > 0.5 || Math.abs(posDiffY) > 0.5) {
                setCardPosition(prev => ({
                    x: prev.x + posDiffX * lerpSpeed,
                    y: prev.y + posDiffY * lerpSpeed
                }));
            } else if (posDiffX !== 0 || posDiffY !== 0) {
                setCardPosition(targetCardPosition);
            }

            const rotDiff = targetCardRotation - cardRotation;
            if (Math.abs(rotDiff) > 0.01) {
                setCardRotation(prev => prev + rotDiff * lerpSpeed);
            } else if (rotDiff !== 0) {
                setCardRotation(targetCardRotation);
            }
        }
        
        const offsetDiff = targetHoverOffset - currentHoverOffset;
        if (Math.abs(offsetDiff) > 0.1) {
            setCurrentHoverOffset(prev => prev + offsetDiff * lerpSpeed);
        } else if (offsetDiff !== 0) {
            setCurrentHoverOffset(targetHoverOffset);
        }

        const alphaDiff = targetAlpha - currentAlpha;
        if (Math.abs(alphaDiff) > 0.01) {
            setCurrentAlpha(prev => prev + alphaDiff * lerpSpeed);
        } else if (alphaDiff !== 0) {
            setCurrentAlpha(targetAlpha);
        }

        const currentR = (currentTint >> 16) & 0xFF;
        const currentG = (currentTint >> 8) & 0xFF;
        const currentB = currentTint & 0xFF;
        
        const targetR = (targetTint >> 16) & 0xFF;
        const targetG = (targetTint >> 8) & 0xFF;
        const targetB = targetTint & 0xFF;
        
        const newR = Math.round(currentR + (targetR - currentR) * lerpSpeed);
        const newG = Math.round(currentG + (targetG - currentG) * lerpSpeed);
        const newB = Math.round(currentB + (targetB - currentB) * lerpSpeed);
        
        const newTint = (newR << 16) | (newG << 8) | newB;
        
        if (newTint !== currentTint) {
            setCurrentTint(newTint);
        }
    });

    const handlePointerDown = () => {
    setIsPointerDown(true);
    setCardRotation(0);
    onHeldDownChange(true);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (event: PointerEvent) => {
    const globalPos = { x: event.clientX - 100, y: event.clientY - 150 };
    setCardPosition(globalPos);
    onCardPositionChange({ x: event.clientX, y: event.clientY });
    }

    const handlePointerUp = () => {
    setIsPointerDown(false);
    onHeldDownChange(false);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    setTargetCardRotation(initialRotation || 0);
    setTargetCardPosition(initialPosition || { x: 500, y: 600 });
    }

    const handlePointerOver = () => {
        if (!isPointerDown) setIsHovered(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        Assets.load<Texture>(card1Asset).then((texture) => {
            setCard1Texture(texture);
        });
    }, []);

    useEffect(() => {
        if (!isPointerDown && isTargetAssigned) {
            onAttack?.(true);
            onSelectedCard(card);
        }
    }, [isPointerDown]);

    return (
        <pixiContainer
            interactive={true}
            onPointerDown={handlePointerDown}
        >
            {card1Texture && (
                <pixiSprite
                    width={200}
                    anchor={0.5}
                    height={300}
                    tint={currentTint}
                    interactive={true}
                    alpha={(isPointerDown && isTargetAssigned) ? 0.2 : currentAlpha}
                    texture={card1Texture}
                    rotation={cardRotation}
                    x={currentCardPosition.x + 100}
                    y={currentCardPosition.y + 150}
                    onPointerOut={handlePointerOut}
                    onPointerOver={handlePointerOver}
                />
            )}
        </pixiContainer>
    );
};
