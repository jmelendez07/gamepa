import { extend, useTick } from '@pixi/react'
import { Container, Sprite, Texture } from 'pixi.js'
import React, { use, useRef } from 'react'
import useEnemyAnimation from './useEnemyAnimation';

extend({ Container, Sprite })

interface IEnemyProps {
    texture: Texture;
    position: { x: number; y: number };
}

export default function Enemy({ texture, position }: IEnemyProps) {
  const enemyPosition = useRef({ x: position.x, y: position.y });

  const {sprite, updateSprite} = useEnemyAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 2,
    animationSpeed: 0.1
  });

  useTick((ticker) => {
    const deltaTime = ticker.deltaTime;
    // aqui se podra actualizar la animacion del enemigo
    updateSprite('idle', 'down');
  });

  return (
    <>
      <pixiContainer position={enemyPosition.current}>
        {sprite && (<pixiSprite texture={sprite.texture} 
                        x={enemyPosition.current.x} 
                        y={enemyPosition.current.y}
                        scale={0.6}
                        anchor={0.5} />)}
      </pixiContainer>
    </>
  )
}
