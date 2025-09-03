import { extend, useTick } from '@pixi/react';
import { Container, Sprite, Texture, Graphics, Text } from 'pixi.js';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useHeroAnimation } from '../Hero/useHeroAnimation';
import { ANIMATION_SPEED } from '../constants/game-world';

extend({ Container, Sprite, Graphics, Text });

interface IHeroStatsProps {
    currentHp: number;
    maxHp: number;
    maxEnergy: number;
    currentEnergy: number;
    heroTexture: Texture;
    energyTexture: Texture | null;
    position?: { x: number; y: number };
}

const HeroStats = ({ currentHp, maxHp, maxEnergy, currentEnergy, heroTexture, energyTexture, position }: IHeroStatsProps) => {
    const defaultPosition = position || { x: 20, y: window.innerHeight - 80 };
    const [animatedHp, setAnimatedHp] = useState(currentHp);
    const [floatAnimation, setFloatAnimation] = useState(0);
    const [colorTransition, setColorTransition] = useState(0);
    const [isHeroHovered, setIsHeroHovered] = useState(false);
    const healthPercentage = animatedHp / maxHp;

    const { sprite: heroSprite, updateSprite: updateHeroSprite } = useHeroAnimation({
        texture: heroTexture,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: ANIMATION_SPEED,
    });

    useTick((ticker) => {
        updateHeroSprite('DOWN', true, false, true);
        setFloatAnimation(prev => prev + 0.02);
        
        const lerpSpeed = 0.05;
        const hpDiff = currentHp - animatedHp;
        
        if (Math.abs(hpDiff) > 0.1) {
            setAnimatedHp(prev => prev + hpDiff * lerpSpeed);
        } else if (hpDiff !== 0) {
            setAnimatedHp(currentHp);
        }

        setColorTransition(prev => (prev + 0.01) % 1);
    });

    const getHealthColor = () => {
        if (healthPercentage > 0.6) return 0x4CAF50;
        if (healthPercentage > 0.35) return 0xFFC107;
        return 0xF44336;
    };

    const getHealthHighlight = () => {
        if (healthPercentage > 0.6) return 0x66BB6A;
        if (healthPercentage > 0.35) return 0xFFD54F;
        return 0xFF7043;
    };

    const floatOffset = Math.sin(floatAnimation) * 3;

    return (
        <pixiContainer x={defaultPosition.x} y={defaultPosition.y + floatOffset}>
            {heroSprite && (
                <>
                    <pixiSprite 
                        texture={heroSprite.texture} 
                        x={20}
                        y={-140}
                        width={isHeroHovered ? 140 : 128}
                        height={isHeroHovered ? 140 : 128}
                        anchor={0}
                        interactive={true}
                        onPointerOver={() => setIsHeroHovered(true)}
                        onPointerOut={() => setIsHeroHovered(false)}
                    />
                    {isHeroHovered && (
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.lineStyle(0);
                                g.fill({ color: 0xffff99, alpha: 0.35 });
                                g.drawRect(0, -120, 140, 140);
                            }}
                        />
                    )}
                </>
            )}
            {energyTexture && (
                <>
                    <pixiSprite
                        texture={energyTexture}
                        x={272}
                        y={-100}
                        width={80}
                        height={80}
                        anchor={0}
                    />
                    <pixiText
                        text={`${Math.round(currentEnergy)}/${maxEnergy}`}
                        anchor={0.5}
                        x={360}
                        y={-60}
                        style={{
                            fontFamily: 'Arial',
                            fontSize: 24,
                            fill: 0xffffff,
                            fontWeight: 'bold',
                            stroke: { color: 0x000000, width: 2 },
                        }}
                    />
                </>
            )}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    g.roundRect(5, 5, 400, 60, 12);
                    g.fill({ color: 0x000000, alpha: 0.3 });
                    g.roundRect(0, 0, 400, 60, 12);
                    g.fill({ color: 0x2c2c2c });
                    g.stroke({ color: 0x444444, width: 2 });
                }}
            />
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    g.roundRect(5, 5, 390, 50, 12);
                    g.fill({ color: 0x1a1a1a });
                }}
            />
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const barWidth = 384 * (animatedHp / maxHp);
                    if (barWidth > 0) {
                        g.roundRect(8, 8, barWidth, 44, 10);
                        g.fill({ color: getHealthColor() });
                        g.roundRect(8, 8, barWidth, 44, 10);
                        g.stroke({ color: getHealthHighlight(), width: 1, alpha: 0.3 });
                    }
                }}
            />
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const currentBarWidth = 384 * (animatedHp / maxHp);
                    const targetBarWidth = 384 * (currentHp / maxHp);
                    if (Math.abs(currentBarWidth - targetBarWidth) > 1) {
                        if (currentHp < animatedHp) {
                            const lossWidth = currentBarWidth - targetBarWidth;
                            g.roundRect(8 + targetBarWidth, 8, lossWidth, 44, 10);
                            g.fill({ color: 0xFF4444, alpha: 0.4 });
                        } else if (currentHp > animatedHp) {
                            const gainWidth = targetBarWidth - currentBarWidth;
                            g.roundRect(8 + currentBarWidth, 8, gainWidth, 44, 10);
                            g.fill({ color: 0x4CAF50, alpha: 0.4 });
                        }
                    }
                }}
            />
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const barWidth = 384 * (animatedHp / maxHp);
                    if (barWidth > 0) {
                        g.roundRect(8, 8, barWidth, 12, 10);
                        g.fill({ color: getHealthHighlight(), alpha: 0.6 });
                        const pulseAlpha = (Math.sin(colorTransition * Math.PI * 2) + 1) * 0.5;
                        g.roundRect(8, 10, barWidth, 8, 8);
                        g.fill({ color: 0xffffff, alpha: pulseAlpha * 0.2 });
                    }
                }}
            />
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const segments = 4;
                    for (let i = 1; i < segments; i++) {
                        const x = 5 + (390 * (i / segments));
                        g.moveTo(x, 5);
                        g.lineTo(x, 55);
                        g.stroke({ color: 0x000000, width: 1, alpha: 0.3 });
                    }
                }}
            />
            <pixiText
                text={`${Math.round(animatedHp)}/${maxHp}`}
                anchor={0.5}
                x={200}
                y={30}
                style={{
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fill: 0xffffff,
                    fontWeight: 'bold',
                    stroke: { color: 0x000000, width: 2 },
                }}
            />
            {healthPercentage > 0.8 && (
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        const barWidth = 384 * (animatedHp / maxHp);
                        g.roundRect(8, 10, barWidth, 4, 4);
                        g.fill({ color: 0xffffff, alpha: 0.4 });
                    }}
                />
            )}
        </pixiContainer>
    );
};

export default HeroStats;