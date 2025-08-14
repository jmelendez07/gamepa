import { extend, useTick } from '@pixi/react';
import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import React, { useState, useEffect } from 'react'
import { ANIMATION_SPEED, GAME_WIDTH } from '../constants/game-world';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import useEnemyAnimation from '../enemy/useEnemyAnimation';
import { Card } from './card/card';

extend({Sprite, Container, Graphics});

interface ICharacterProps{
    hero: Texture;
    enemy: Texture;
}

export const Combat = ({ hero, enemy }: ICharacterProps) => {

  const spriteBgCombat = '/assets/bg-battle.jpg'

  const [combatTexture, setCombatTexture] = useState<Texture | null>(null);
  const [isCardHeldDown, setIsCardHeldDown] = useState(false);

  const { sprite: heroSprite, updateSprite: updateHeroSprite } = useHeroAnimation({
    texture: hero,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 2,
    animationSpeed: ANIMATION_SPEED
  });

  const { sprite: enemySprite, updateSprite: updateEnemySprite } = useEnemyAnimation({
    texture: enemy,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 2,
    animationSpeed: ANIMATION_SPEED
  });

  // Usar useTick para inicializar solo una vez y manejar animaciones
  useTick((ticker) => {
    const deltaTime = ticker.deltaTime;

    updateHeroSprite('DOWN', true, true);
    updateEnemySprite('combatIdle', 'left');

    // if (isCardHeldDown) {
    //   console.log('Card is being held down');
    // }
  });

  useEffect(() => {
    let cancelled = false;

    Assets.load<Texture>(spriteBgCombat)
      .then((tex) => {
        if (!cancelled) {
          setCombatTexture(tex);
        }
      })
      .catch((err) => {
        console.error('Failed to load combat background texture:', err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
      <pixiContainer>
          {/* Combat background */}
          {combatTexture && <pixiSprite texture={combatTexture} width={window.innerWidth} height={window.innerHeight} x={0} y={0} />}

          {heroSprite && (
              <pixiSprite texture={heroSprite.texture} x={window.innerWidth * 0.15} y={window.innerHeight * 0.3} width={128} height={128} />
          )}

          {enemySprite && (
              <pixiSprite texture={enemySprite.texture} x={window.innerWidth * 0.75} y={window.innerHeight * 0.3} width={128} height={128} />
          )}

          {isCardHeldDown && (
              <pixiGraphics
                  draw={(g) => {
                      g.clear();
                      g.rect(window.innerWidth * 0.75, 273, 128, 128);
                      g.stroke({ color: 0xff0000, width: 5 });
                  }}
              />
          )}

          <Card onHeldDownChange={setIsCardHeldDown} />
      </pixiContainer>
  );
}
