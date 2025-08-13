import { extend } from '@pixi/react';
import type { FederatedPointerEvent } from 'pixi.js';
import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

extend({ Container, Sprite });

export const Card = () => {
    const card1Asset = '/assets/cards/card-1.png';

    const [card1Texture, setCard1Texture] = useState<Texture | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [isHeldDown, setIsHeldDown] = useState(false);
    const [cardPosition, setCardPosition] = useState({ x: 500, y: 600 });
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

    const originalPosition = { x: 500, y: 600 };

    const resetCard = () => {
        setIsPressed(false);
        setIsHeldDown(false);
        setCardPosition(originalPosition);

        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }
    };

    const selectCard = () => {
        console.log('Card selected', { cardPosition })
        // verificar si el usuario mantuvo presionado
        if (!isHeldDown) {
            // lógica para seleccionar la carta
            console.log('Card clicked, not held down');
        }
    };

    const handlePointerDown = () => {
        //verificar si el usuario hizo click o mantuvo presionado
        document.addEventListener('pointerdown', (event) => {
            const pressStartTime = event.timeStamp;
            console.log('time', pressStartTime);
        });

        document.addEventListener('pointerup', (event) => {
            const pressEndTime = event.timeStamp;
            console.log('time', pressEndTime);
        });
    };

    const handlePointerUp = (event: FederatedPointerEvent) => {
        event.stopPropagation();
        setIsPressed(false);
        setIsHeldDown(false);
        setCardPosition(originalPosition);
        console.log('Card played!', { cardPosition });
    };

    const handlePointerUpOutside = () => {
        console.log('Card released outside', { cardPosition });
        resetCard();
    };

    const handlePointerMove = (event: FederatedPointerEvent) => {
        // Solo seguir el mouse si la carta está en estado "held down"
        if (isHeldDown) {
            const globalPos = event.global;
            setCardPosition({
                x: globalPos.x - 100,
                y: globalPos.y - 150,
            });
        } else {
            setCardPosition(originalPosition);
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
                <pixiSprite
                    interactive={true}
                    texture={card1Texture}
                    width={200}
                    height={300}
                    x={cardPosition.x}
                    y={cardPosition.y}
                    onPointerDown={handlePointerDown}
                    // onPointerUp={handlePointerUp}
                    // onPointerUpOutside={handlePointerUpOutside}
                    // onPointerMove={handlePointerMove}
                    alpha={isHeldDown ? 0.7 : 1.0}
                />
            )}
        </pixiContainer>
    );
};
