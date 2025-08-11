import { Direction } from "../types/common";

export const TILE_SIZE = 32;
export const COLUMNS = 26;
export const ROWS = 17;
export const GAME_WIDTH = COLUMNS * TILE_SIZE - TILE_SIZE * 2;
export const GAME_HEIGHT = ROWS * TILE_SIZE - TILE_SIZE * 2;
export const OFFSET_X = 0;
export const OFFSET_Y = TILE_SIZE / 2;

// Cambiar estas posiciones para que estén dentro del área visible
export const DEFAULT_HERO_POSITION_X = TILE_SIZE * 2; // Posición más a la izquierda
export const DEFAULT_HERO_POSITION_Y = TILE_SIZE * 2; // Posición más arriba

export const DIRECTION_KEYS: Record<string, Direction> = {
    KeyW: 'UP',
    KeyS: 'DOWN',
    KeyA: 'LEFT',
    KeyD: 'RIGHT',
    ArrowUp: 'UP',
    ArrowDown: 'DOWN',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT'
}

export const MOVE_SPEED = 0.03; // Tiles per frame, ajustar según sea necesario

export const ANIMATION_SPEED = 0.1;

export const ZOOM = 3;
