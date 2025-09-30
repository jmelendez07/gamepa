import { useCallback, useEffect, useState } from "react"
import { Direction, Interactions } from "../types/common";
import { DIRECTION_KEYS } from "../constants/game-world";

export const useHeroControls = (onHeroChange?: (heroIndex: number) => void) => {
    const [heldDirection, setHeldDirection] = useState<Direction[]>([])
    const [currentInteraction, setCurrentInteraction] = useState<Interactions>('NONE');

    const handleKey = useCallback((e:KeyboardEvent, isKeyDown:boolean) => {
        const direction = DIRECTION_KEYS[e.code];

        // Manejar cambio de héroe con números (1-9)
        if (isKeyDown && e.code.startsWith('Digit') && onHeroChange) {
            const digitKey = e.code.replace('Digit', '');
            const heroIndex = parseInt(digitKey) - 1; // Convertir a índice basado en 0
            if (heroIndex >= 0 && heroIndex <= 8) {
                // Límite de 9 héroes
                onHeroChange(heroIndex);
                return;
            }
        }

        if (!direction) return;
        if (direction) {
            setHeldDirection((prev) => {
                if (isKeyDown) {
                    return prev.includes(direction) ? prev : [...prev, direction];
                } else {
                    return prev.filter((dir) => dir !== direction);
                }
            });
            return;
        }

        if (e.code === 'KeyF' && isKeyDown) {
            setCurrentInteraction('SELECT');
            return;
        } else if (e.code === 'KeyF' && !isKeyDown) {
            setCurrentInteraction('NONE');
            return;
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) => handleKey(e, true);
        const handleKeyUp = (e:KeyboardEvent) => handleKey(e, false);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKey])

    const getControlsDirection = useCallback(() => {
        return heldDirection[0] || null;
    }, [heldDirection])

    const getInteraction = useCallback(() => {
        return currentInteraction;
    }, [currentInteraction])

    const resetInteraction = useCallback(() => {
        setCurrentInteraction('NONE');
    }, []);

    return {
        getControlsDirection, 
        getInteraction,
        resetInteraction
    }
}