import { Rectangle, Sprite, Texture } from "pixi.js"
import { useRef, useState } from "react"
import { TILE_SIZE } from "../constants/game-world"
import { Direction } from "../types/common"

interface IHeroAnimationProps {
  texture: Texture,
  frameWidth: number,
  frameHeight: number,
  totalFrames: number
  animationSpeed: number
}

export const useHeroAnimation = ({texture, frameWidth, frameHeight, totalFrames, animationSpeed}: IHeroAnimationProps) => {
  // Animation logic here
  const [sprite, setSprite] = useState<Sprite | null>(null);
  const frameRef = useRef(0);
  const elapsedTimeRef = useRef(0);

  const getRowByDirection = (direction: Direction|null, isFighting: boolean, isStat: boolean) => {
    if (isFighting) {
      return 45
    } else if (isStat) {
      return 44;
    }

    switch(direction) {
      case 'UP':
        return 8;
      case 'DOWN':
        return 10;
      case 'LEFT':
        return 9;
      case 'RIGHT':
        return 11;
      default:
        return 10;
    }
  }

  const createSprite = (row: number, column: number) => {
    const frame = new Rectangle(column * frameWidth, row * frameHeight, frameWidth, frameHeight);
    const frameTexture = new Texture({
      source: texture.source,
      frame: frame
    });
    const newSprite = new Sprite(frameTexture);
    newSprite.width = TILE_SIZE;
    newSprite.height = TILE_SIZE;

    return newSprite;
  }

  const updateSprite = (direction: Direction| null, isMoving: boolean, isFighting: boolean, isStat?: boolean) => {
      const row = getRowByDirection(direction, isFighting, isStat ?? false);
      let column = 0;

      if (isMoving) {
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

    return { sprite, updateSprite}
}

