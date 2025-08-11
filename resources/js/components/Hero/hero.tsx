import { extend, useTick } from '@pixi/react';
import { Container, Sprite, Texture } from 'pixi.js';
import { useCallback, useEffect, useRef } from 'react';
import { ANIMATION_SPEED, DEFAULT_HERO_POSITION_X, DEFAULT_HERO_POSITION_Y, MOVE_SPEED } from '../constants/game-world';
import { useHeroControls } from './useHeroControls';
import { Direction, IPosition } from '../types/common';
import { calculateNewTarget, checkCanMove, handleMovement } from '../helpers/common';
import { useHeroAnimation } from './useHeroAnimation';

extend({ Container, Sprite });

interface IHeroProps {
    texture: Texture;
    onMove: (gridX: number, gridY: number) => void;
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
    const position = useRef({ x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y });
    const targetPosition = useRef<IPosition>(null);
    const currentDirection = useRef<Direction>(null);
    const { sprite, updateSprite } = useHeroAnimation({
        texture,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 9,
        animationSpeed: ANIMATION_SPEED
    });

    const {getControlsDirection} = useHeroControls();

    const direction = getControlsDirection();
    const isMoving = useRef(false);

    useEffect(() => {
        onMove(position.current.x, position.current.y);
    }, [onMove]);

    const setNextTarget = useCallback((direction: Direction) => { 
        if (targetPosition.current) return; // already moving
        const {x, y} = position.current;
        currentDirection.current = direction;
        const newTarget = calculateNewTarget(x, y, direction);

        if (checkCanMove(newTarget)) {
            targetPosition.current = newTarget;
        }
    }, [])

    useTick((ticker) => {
        const delta = ticker.deltaTime;
        
        if (direction) {
            setNextTarget(direction);
        }

        //handle movement
        if (targetPosition.current) {
            const { completed, position: newPosition} = handleMovement(position.current, targetPosition.current, MOVE_SPEED, delta);
            position.current = newPosition;
            isMoving.current = true;

            if (completed) {
                const { x, y } = position.current;
                onMove(x, y);
                targetPosition.current = null;
                isMoving.current = false;
            }
        }

        updateSprite(currentDirection.current!, isMoving.current);

        //handle completion of movement
    })

    return (
        <>
            <pixiContainer>
                {sprite && (<pixiSprite 
                    texture={sprite.texture} 
                    x={position.current.x} 
                    y={position.current.y}
                    scale={0.5}
                    anchor={{ x: 0.5, y: 0.8 }}
                     />)}
            </pixiContainer>
        </>
    );
};
