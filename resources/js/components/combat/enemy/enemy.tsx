import { ANIMATION_SPEED } from '@/components/constants/game-world';
import useEnemyAnimation from '@/components/enemy/useEnemyAnimation';
import { IEnemy } from '@/types';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Sprite, Texture, Graphics, Text } from 'pixi.js';
import { useEffect, useState } from 'react';

extend({ Container, Sprite, Graphics, Text });

interface IEnemyProps {
    enemy: IEnemy;
    initialPosition?: { x: number; y: number };
}

export const Enemy = ({ enemy, initialPosition }: IEnemyProps) => {
    const [enemyTexture, setEnemyTexture] = useState<Texture | null>(null);
    const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
    const [currentHp, setCurrentHp] = useState(enemy.health);
    const [isHovered, setIsHovered] = useState(false);
    const maxHp = enemy.health;

    const placeholderTexture = Texture.WHITE;
    const textureToUse = enemyTexture || placeholderTexture;

    const { sprite: enemySprite, updateSprite: updateEnemySprite } = useEnemyAnimation({
        texture: textureToUse,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: ANIMATION_SPEED,
    });

    useEffect(() => {
        Assets.load<Texture>(enemy.avatar).then((texture) => {
            setEnemyTexture(texture);
        });
    }, [enemy.avatar]);

    useTick(() => {
        updateEnemySprite('combatIdle', 'left');
    });

    const handlePointerOver = () => {
        setIsHovered(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
    };

    return (
        <>
            {enemySprite && enemyTexture && (
                <>
                    <pixiSprite 
                        interactive={true}
                        texture={enemySprite.texture} 
                        x={position.x} 
                        y={position.y} 
                        width={128} 
                        height={128}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                    
                    {isHovered && (
                        <pixiText
                            text={enemy.name}
                            anchor={0.5}
                            x={position.x + 64}
                            y={position.y}
                            style={{
                                fontFamily: 'Arial',
                                fontSize: 20,
                                fill: 0xffffff,
                                fontWeight: 'bold',
                                stroke: { color: 0x000000, width: 2 },
                            }}
                        />
                    )}
                    
                    <pixiContainer x={position.x - 11} y={position.y + 140}>
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.roundRect(0, 0, 150, 16, 3);
                                g.fill({ color: 0x1a1a1a });
                                g.stroke({ color: 0x000000, width: 1 });
                            }}
                        />
                        
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                const healthPercentage = currentHp / maxHp;
                                const barWidth = (150 - 4) * healthPercentage;
                                if (barWidth > 0) {
                                    g.roundRect(2, 2, barWidth, 12, 1);
                                    g.fill({ color: 0xFF1744 });
                                    
                                    g.roundRect(2, 2, barWidth, 4, 1);
                                    g.fill({ color: 0xFF5722, alpha: 0.5 });
                                }
                            }}
                        />
                        
                        <pixiText
                            text={`${currentHp}/${maxHp}`}
                            anchor={0.5}
                            x={75}
                            y={8}
                            style={{
                                fontFamily: 'Arial',
                                fontSize: 16,
                                fill: 0xffffff,
                                fontWeight: 'bold',
                                stroke: { color: 0x000000, width: 2 },
                            }}
                        />
                    </pixiContainer>
                </>
            )}
        </>
    );
}