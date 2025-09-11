import { ANIMATION_SPEED } from '@/components/constants/game-world';
import useEnemyAnimation from '@/components/enemy/useEnemyAnimation';
import IEnemy from '@/types/enemy';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Sprite, Texture, Graphics, Text } from 'pixi.js';
import { useEffect, useState } from 'react';

extend({ Container, Sprite, Graphics, Text });

interface IEnemyProps {
    enemy: IEnemy;
}

export const Enemy = ({ enemy }: IEnemyProps) => {
    const [enemyTexture, setEnemyTexture] = useState<Texture | null>(null);
    const [maxHp, setMaxHp] = useState(enemy.health);
    const [isHovered, setIsHovered] = useState(false);

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
        Assets.load<Texture>(enemy.spritesheet).then((texture) => {
            setEnemyTexture(texture);
        });
    }, [enemy.spritesheet]);

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
                        x={enemy.combat_position?.x || 0} 
                        y={enemy.combat_position?.y || 0} 
                        width={128} 
                        height={128}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                    
                    {isHovered && (
                        <pixiText
                            text={enemy.name}
                            anchor={0.5}
                            x={(enemy.combat_position?.x || 0) + 64}
                            y={enemy.combat_position?.y || 0}
                            style={{
                                fontFamily: 'Arial',
                                fontSize: 20,
                                fill: 0xffffff,
                                fontWeight: 'bold',
                                stroke: { color: 0x000000, width: 2 },
                            }}
                        />
                    )}

                    <pixiContainer x={(enemy.combat_position?.x || 0) - 11} y={(enemy.combat_position?.y || 0) + 140}>
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
                                const healthPercentage = enemy.health / maxHp;
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
                            text={`${enemy.health}/${maxHp}`}
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