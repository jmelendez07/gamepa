import { Rectangle, Sprite, Texture } from "pixi.js";
import { useRef, useState } from "react";

interface UseIconMissionAnimationProps {
    texture: Texture;
    frameWidth: number;
    frameHeight: number;
    totalFrames: number;
    animationSpeed: number;
}

export default function useIconMissionAnimation ({ texture, frameWidth, frameHeight, totalFrames, animationSpeed }: UseIconMissionAnimationProps) {
    const [sprite, setSprite] = useState<Sprite | null>(null);
    const [hovered, setHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
    const frameRef = useRef(0);
    const elapsedTimeRef = useRef(0);

    const createSprite = (row: number, column: number) => {
        const frame = new Rectangle(column * frameWidth, row * frameHeight, frameWidth, frameHeight);
        const frameTexture = new Texture({
            source: texture.source,
            frame: frame
        });

        const newSprite = new Sprite(frameTexture);
        newSprite.width = frameWidth;
        newSprite.height = frameHeight;

        return newSprite;
    }

    const updateSprite = () => {
        if (!isAnimating) {
            // Si no está animando, solo mantener el frame actual
            const newSprite = createSprite(0, frameRef.current);
            setSprite(newSprite);
            return;
        }

        elapsedTimeRef.current += animationSpeed;
        if (elapsedTimeRef.current >= 1) {
            elapsedTimeRef.current = 0;

            if (direction === 'forward') {
                if (frameRef.current < totalFrames - 1) {
                    frameRef.current += 1;
                } else {
                    // Llegó al último frame, detener animación
                    setIsAnimating(false);
                    console.log("Animation ended, staying on last frame:", frameRef.current);
                }
            } else {
                // Animación reversa
                if (frameRef.current > 0) {
                    frameRef.current -= 1;
                } else {
                    // Llegó al primer frame, detener animación
                    setIsAnimating(false);
                    console.log("Reverse animation ended, staying on first frame:", frameRef.current);
                }
            }
        }

        const newSprite = createSprite(0, frameRef.current);
        setSprite(newSprite);
    }

    const handleHoverStart = () => {
        console.log("Hover start");
        setHovered(true);
        setDirection('forward');
        setIsAnimating(true);
    }

    const handleHoverEnd = () => {
        console.log("Hover end");
        setHovered(false);
        setDirection('reverse');
        setIsAnimating(true);
    }

    return { sprite, updateSprite, handleHoverStart, handleHoverEnd, hovered };
}