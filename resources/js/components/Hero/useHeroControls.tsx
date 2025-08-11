import { useCallback, useEffect, useState } from "react"
import { Direction } from "../types/common";
import { DIRECTION_KEYS } from "../constants/game-world";

export const useHeroControls = () => {
    const [heldDirection, setHeldDirection] = useState<Direction[]>([])

    const handleKey = useCallback((e:KeyboardEvent, isKeyDown:boolean) => {
        const direction = DIRECTION_KEYS[e.code];
        if (!direction) return;
        if (direction) {
            setHeldDirection((prev) => {
                if (isKeyDown) {
                    return prev.includes(direction) ? prev : [...prev, direction];
                } else {
                    return prev.filter((dir) => dir !== direction);
                }
            });
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

    return {getControlsDirection}
}