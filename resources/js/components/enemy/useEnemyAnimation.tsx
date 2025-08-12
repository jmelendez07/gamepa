import { Rectangle, Sprite, Texture } from 'pixi.js';
import React, { useRef, useState } from 'react'

interface IUseEnemyAnimation {
  texture: Texture;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  animationSpeed: number;
}

export default function useEnemyAnimation({ texture, frameWidth, frameHeight, totalFrames, animationSpeed }: IUseEnemyAnimation) {

  const [sprite, setSprite] = useState<Sprite | null>(null);
  const frameRef = useRef(0); // Cambiar useState por useRef
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
    
    return newSprite; // Retornar el sprite en lugar de hacer setSprite aquí
  }

  const getRowByEnemyMove = (enemyMove: string, direction: string) => {
    switch (enemyMove) {
      case 'idle':
        switch (direction) {
          case 'up':
            return 23;
          case 'down':
            return 25;
          case 'left':
            return 24;
          case 'right':
            return 26;
          default:
            return 24;
        }
      case 'walk':
        return 1;
      case 'combatIdle':
        return 2;
      case 'attack':
        return 3;
      default:
        return 0;
    }
  }

  const updateSprite = (enemyMove: string, direction: string) => {
    const row = getRowByEnemyMove(enemyMove, direction);
    let column = 0;

    // Animación para estados que requieren movimiento de frames
    if (enemyMove === 'idle' || enemyMove === 'walk' || enemyMove === 'combatIdle' || enemyMove === 'attack') {
      elapsedTimeRef.current += animationSpeed;
      if (elapsedTimeRef.current >= 1) {
        elapsedTimeRef.current = 0;
        frameRef.current = (frameRef.current + 1) % totalFrames;
      }
      column = frameRef.current;
    }

    const newSprite = createSprite(row, column);
    setSprite(newSprite);
  }

  return { sprite, updateSprite }; // Retornar el sprite y la función de actualización
}
