import { COLLISION_MAP } from "../constants/collisionMap";
import { COLUMNS, TILE_SIZE } from "../constants/game-world";
import { Direction, IPosition } from "../types/common";

export const calculateCanvasSize = () => {
  if (typeof window === 'undefined') {
    // Sensible default size for SSR; real size will be set on mount
    return { width: 800, height: 600 };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
};

export const calculateNewTarget = (x:number, y:number, direction:Direction): IPosition => {
  const currentTileX = Math.floor(x / TILE_SIZE);
  const currentTileY = Math.floor(y / TILE_SIZE);
  
  return {
    x: (currentTileX + (direction === 'LEFT' ? -1 : direction === 'RIGHT' ? 1 : 0)) * TILE_SIZE,
    y: (currentTileY + (direction === 'UP' ? -1 : direction === 'DOWN' ? 1 : 0)) * TILE_SIZE
  }
}

export const checkCanMove = (target: IPosition) => {
  const row = Math.floor(target.y / TILE_SIZE);
  const col = Math.floor(target.x / TILE_SIZE);
  const index = COLUMNS*row + col;

  if (index < 0 || index >= COLLISION_MAP.length) {
    return false;
  }
  return COLLISION_MAP[index] !== 1;
}

const moveTowards = (currentPosition:number, targetPosition:number, maxStep: number) => {
  return (currentPosition + Math.sign(targetPosition - currentPosition) * Math.min(maxStep, Math.abs(targetPosition - currentPosition)));
}

const continueMovement = (currentPosition:IPosition, targetPosition:IPosition, step: number): IPosition => {
 return {
  x:moveTowards(currentPosition.x, targetPosition.x, step),
  y:moveTowards(currentPosition.y, targetPosition.y, step)
 }
}

export const handleMovement = (currentPosition:IPosition, targetPosition:IPosition, moveSpeed:number, delta:number) => {
  const step = moveSpeed * delta * TILE_SIZE;
  const distance = Math.hypot(targetPosition.x - currentPosition.x, targetPosition.y - currentPosition.y);

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true
    }
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false
  }
}

export const lerp = (start: number, end: number) => {
    return start + (end - start) * 0.03;
};
