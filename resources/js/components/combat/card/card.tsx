import { extend } from '@pixi/react';
import type { FederatedPointerEvent } from 'pixi.js';
import { Assets, Container, Sprite, Texture, Graphics } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

extend({ Container, Sprite, Graphics });

export const Card = () => {
    const card1Asset = '/assets/cards/card-1.png';

    const [card1Texture, setCard1Texture] = useState<Texture | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [isHeldDown, setIsHeldDown] = useState(false);
    const [cardPosition, setCardPosition] = useState({ x: 500, y: 600 });
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const originalPosition = { x: 500, y: 600 };

    const resetCard = useCallback(() => {
        setIsPressed(false);
        setIsHeldDown(false);
        setCardPosition({ x: 500, y: 600 });

        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }
    }, [cardPosition]);

    const handlePointerDown = (event: FederatedPointerEvent) => {
        console.log('Card pointer down');
        setIsPressed(true);

        pressTimerRef.current = setTimeout(() => {
            setIsHeldDown(true);
            console.log('Card is now being held down');
        }, 200);
    };

    const handlePointerUp = (event: FederatedPointerEvent) => {
        const finalPosition = cardPosition;
        console.log('Card played!', { 
            finalPosition, 
            resetTo: originalPosition 
        });
        
        resetCard();

        if (finalPosition.x == originalPosition.x && finalPosition.y == originalPosition.y) {
            setIsClicked(!isClicked);
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
            setCardPosition({
                x: globalPos.x - 100,
                y: globalPos.y - 150,
            });
        }
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
                        x={cardPosition.x}
                        y={cardPosition.y}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerUpOutside={handlePointerUpOutside}
                        onPointerMove={handlePointerMove}
                        alpha={isHeldDown ? 0.7 : 1.0}
                    />
                    {isClicked && (
                        <pixiGraphics
                            interactive={true}
                            onPointerDown={handlePointerDown}
                            onPointerUp={handlePointerUp}
                            onPointerUpOutside={handlePointerUpOutside}
                            onPointerMove={handlePointerMove}
                            draw={(g) => {
                                g.clear();
                                g.rect(cardPosition.x - 3, cardPosition.y - 3, 206, 306);
                                // g.fill({ color: 0x00ff00, alpha: 0.3 }); para rellenar todo el rectangulo
                                g.stroke({ color: 0x00ff00, width: 3 }); 
                            }}
                        />
                    )}
                </>
            )}
        </pixiContainer>
    );
};
