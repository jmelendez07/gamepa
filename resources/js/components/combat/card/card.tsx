import { extend, useTick } from '@pixi/react';
import type { FederatedPointerEvent } from 'pixi.js';
import { Assets, Container, Sprite, Texture, Graphics } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

extend({ Container, Sprite, Graphics });

interface ICardProps {
    onHeldDownChange: (isHeldDown: boolean) => void;
    onCardPositionChange: (cardPosition: { x: number; y: number }) => void;
    isTargetAssigned?: boolean;
    onAttack?: (isAttacking: boolean) => void;
    initialPosition?: { x: number; y: number };
    cardIndex?: number;
    rotation?: number;
}

export const Card = ({ onHeldDownChange, onCardPositionChange, isTargetAssigned, onAttack, initialPosition, cardIndex, rotation }: ICardProps) => {
    const card1Asset = '/assets/cards/card-1.png';

    const [card1Texture, setCard1Texture] = useState<Texture | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [isHeldDown, setIsHeldDown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const defaultPosition = initialPosition || { x: 500, y: 600 };
    const [cardPosition, setCardPosition] = useState(defaultPosition);
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [currentHoverOffset, setCurrentHoverOffset] = useState(0);
    const [currentAlpha, setCurrentAlpha] = useState(0.8);
    const [currentTint, setCurrentTint] = useState(0x808080);
    const targetHoverOffset = isHovered && !isHeldDown ? -20 : 0;
    const targetAlpha = isHovered && !isHeldDown ? 1.0 : 0.8;
    const targetTint = isHovered && !isHeldDown ? 0xFFFFFF : 0x808080;
    const originalPosition = defaultPosition;
    const currentCardPosition = {
        x: cardPosition.x,
        y: cardPosition.y + currentHoverOffset
    };

    useTick((ticker) => {
        const lerpSpeed = 0.15;
        
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

    useEffect(() => {
        onHeldDownChange?.(isHeldDown);
        if (!isHeldDown) {
            onCardPositionChange?.(cardPosition);
        }
    }, [isHeldDown, onHeldDownChange, cardPosition, onCardPositionChange]);

    const resetCard = useCallback(() => {
        setIsPressed(false);
        setIsHeldDown(false);
        setCardPosition(defaultPosition);

        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }
    }, [defaultPosition]);

    const handlePointerDown = () => {
        setIsPressed(true);

        pressTimerRef.current = setTimeout(() => {
            setIsHeldDown(true);
        }, 200);
    };

    const handlePointerUp = () => {
        const finalPosition = cardPosition;
        
        resetCard();

        if (finalPosition.x == originalPosition.x && finalPosition.y == originalPosition.y) {
            setIsClicked(!isClicked);
        }

        if (isTargetAssigned) {
            console.log('Card played on target!', { finalPosition });
            setIsAttacking(true);
            onAttack?.(true);
        }
    };

    const handlePointerUpOutside = () => {
        const finalPosition = cardPosition;
        console.log('Card released outside', { finalPosition });
        resetCard();
    };

    const handlePointerMove = (event: FederatedPointerEvent) => {
        if (isHeldDown) {
            const globalPos = event.global;
            const newPosition = {
                x: globalPos.x - 100, // Adjust for center anchor
                y: globalPos.y - 150, // Adjust for center anchor
            };
            setCardPosition(newPosition);
            onCardPositionChange({
                x: globalPos.x,
                y: globalPos.y
            });
        }
    };

    const handlePointerOver = () => {
        if (!isHeldDown) {
            setIsHovered(true);
        }
    };

    const handlePointerOut = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        Assets.load<Texture>(card1Asset).then((texture) => {
            setCard1Texture(texture);
        });
    }, []);

    return (
        <pixiContainer interactive={true}>
            {card1Texture && (
                <>
                    <pixiSprite
                        interactive={true}
                        texture={card1Texture}
                        width={200}
                        height={300}
                        x={currentCardPosition.x + 100} // Offset for center anchor
                        y={currentCardPosition.y + 150} // Offset for center anchor
                        anchor={0.5} // Center anchor point
                        rotation={rotation || 0} // Apply rotation
                        tint={currentTint} // Aplicar tinte animado
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                        // onPointerUpOutside={handlePointerUpOutside}
                        onPointerMove={handlePointerMove}
                        alpha={isHeldDown ? (isTargetAssigned ? 0.1 : 0.7) : currentAlpha}
                    />
                    {isClicked && (
                        <pixiGraphics
                            interactive={true}
                            onPointerDown={handlePointerDown}
                            onPointerUp={handlePointerUp}
                            onPointerOver={handlePointerOver}
                            onPointerOut={handlePointerOut}
                            // onPointerUpOutside={handlePointerUpOutside}
                            onPointerMove={handlePointerMove}
                            draw={(g) => {
                                g.clear();
                                g.rect(-103, -153, 206, 306); // Center the rectangle around origin
                                // g.fill({ color: 0x00ff00, alpha: 0.3 }); para rellenar todo el rectangulo
                                g.stroke({ color: 0x00ff00, width: 3 }); 
                            }}
                            x={currentCardPosition.x + 100}
                            y={currentCardPosition.y + 150}
                            rotation={rotation || 0}
                        />
                    )}
                </>
            )}
        </pixiContainer>
    );
};
