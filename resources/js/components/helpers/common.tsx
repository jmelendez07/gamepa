import { COLLISION_MAP } from '../constants/collisionMap';
import { COLUMNS, TILE_SIZE } from '../constants/game-world';
import { Direction, IPosition } from '../types/common';

export const calculateCanvasSize = () => {
    if (typeof window === 'undefined') {
        // Sensible default size for SSR; real size will be set on mount
        return { width: 800, height: 600 };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { width, height };
};

export const calculateNewTarget = (x: number, y: number, direction: Direction): IPosition => {
    const currentTileX = Math.floor(x / TILE_SIZE);
    const currentTileY = Math.floor(y / TILE_SIZE);

    return {
        x: (currentTileX + (direction === 'LEFT' ? -1 : direction === 'RIGHT' ? 1 : 0)) * TILE_SIZE,
        y: (currentTileY + (direction === 'UP' ? -1 : direction === 'DOWN' ? 1 : 0)) * TILE_SIZE,
    };
};

export const checkCanMove = (target: IPosition) => {
    const row = Math.floor(target.y / TILE_SIZE);
    const col = Math.floor(target.x / TILE_SIZE);
    const index = COLUMNS * row + col;

    if (index < 0 || index >= COLLISION_MAP.length) {
        return false;
    }
    return COLLISION_MAP[index] !== 1;
};

const moveTowards = (currentPosition: number, targetPosition: number, maxStep: number) => {
    return currentPosition + Math.sign(targetPosition - currentPosition) * Math.min(maxStep, Math.abs(targetPosition - currentPosition));
};

const continueMovement = (currentPosition: IPosition, targetPosition: IPosition, step: number): IPosition => {
    return {
        x: moveTowards(currentPosition.x, targetPosition.x, step),
        y: moveTowards(currentPosition.y, targetPosition.y, step),
    };
};

export const handleMovement = (currentPosition: IPosition, targetPosition: IPosition, moveSpeed: number, delta: number) => {
    const step = moveSpeed * delta * TILE_SIZE;
    const distance = Math.hypot(targetPosition.x - currentPosition.x, targetPosition.y - currentPosition.y);

    if (distance <= step) {
        return {
            position: targetPosition,
            completed: true,
        };
    }

    return {
        position: continueMovement(currentPosition, targetPosition, step),
        completed: false,
    };
};

export const lerp = (start: number, end: number) => {
    return start + (end - start) * 0.03;
};

export const checkProximity = (position1: IPosition, position2: IPosition, maxDistance: number): boolean => {
    // position1 es la posición del héroe en píxeles
    // position2 es la posición del objeto en píxeles

    // Convertir ambas posiciones a tiles usando Math.floor
    const heroTileX = Math.floor(position1.x / TILE_SIZE);
    const heroTileY = Math.floor(position1.y / TILE_SIZE);

    const objectTileX = Math.floor(position2.x / TILE_SIZE);
    const objectTileY = Math.floor(position2.y / TILE_SIZE);

    const dx = Math.abs(heroTileX - objectTileX);
    const dy = Math.abs(heroTileY - objectTileY);
    
    return dx <= maxDistance && dy <= maxDistance;
};

export const handleObjectInteraction = (
    heroPosition: IPosition,
    objectPosition: IPosition,
    interaction: string,
    onInteract: () => void,
    maxDistance: number = 2,
) => {
    const isNear = checkProximity(heroPosition, objectPosition, maxDistance);

    if (isNear) {
        console.log('Hero is near the object.');
    }

    if (isNear && interaction === 'SELECT') {
        onInteract();
        return true;
    }

    return isNear;
};
