import { extend, useTick } from '@pixi/react';
import { Assets, Container, Sprite, Texture, Graphics, Text } from 'pixi.js';
import { useState, useEffect } from 'react';

extend({ Container, Sprite, Graphics, Text });

interface IHeroStatsProps {
    currentHp: number;
    maxHp: number;
    position?: { x: number; y: number };
}

const HeroStats = ({ currentHp, maxHp, position }: IHeroStatsProps) => {
    const defaultPosition = position || { x: 20, y: window.innerHeight - 80 };
    
    // Estados simplificados
    const [animatedHp, setAnimatedHp] = useState(currentHp);
    const [floatAnimation, setFloatAnimation] = useState(0); // Solo animación de flotación
    const [colorTransition, setColorTransition] = useState(0); // Para transiciones de color suaves

    const healthPercentage = animatedHp / maxHp;

    // Detectar cambios de vida con transición suave
    useEffect(() => {
        // No cambiar instantáneamente, dejar que useTick haga la transición
    }, [currentHp]);

    // Animación simple de flotación y transiciones
    useTick((ticker) => {
        // Animar la flotación del contenedor
        setFloatAnimation(prev => prev + 0.02);
        
        // Transición suave de la vida actual
        const lerpSpeed = 0.05; // Velocidad de transición más lenta para suavidad
        const hpDiff = currentHp - animatedHp;
        if (Math.abs(hpDiff) > 0.1) {
            setAnimatedHp(prev => prev + hpDiff * lerpSpeed);
        } else if (hpDiff !== 0) {
            setAnimatedHp(currentHp);
        }
        
        // Transición suave para efectos visuales
        setColorTransition(prev => (prev + 0.01) % 1);
    });

    // Colores dinámicos basados en porcentaje de vida
    const getHealthColor = () => {
        if (healthPercentage > 0.6) return 0x4CAF50; // Verde
        if (healthPercentage > 0.35) return 0xFFC107; // Amarillo
        return 0xF44336; // Rojo
    };

    const getHealthHighlight = () => {
        if (healthPercentage > 0.6) return 0x66BB6A;
        if (healthPercentage > 0.35) return 0xFFD54F;
        return 0xFF7043;
    };

    // Calcular offset de flotación
    const floatOffset = Math.sin(floatAnimation) * 3; // 3px de movimiento arriba/abajo

    return (
        <pixiContainer x={defaultPosition.x} y={defaultPosition.y + floatOffset}>
            {/* Fondo principal con sombra */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    // Sombra más compacta
                    g.roundRect(5, 5, 400, 60, 12);
                    g.fill({ color: 0x000000, alpha: 0.3 });
                    
                    // Fondo principal más compacto
                    g.roundRect(0, 0, 400, 60, 12);
                    g.fill({ color: 0x2c2c2c });
                    g.stroke({ color: 0x444444, width: 2 });
                }}
            />

            {/* Fondo interno de la barra - ahora ocupa todo el contenedor */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    g.roundRect(5, 5, 390, 50, 12);
                    g.fill({ color: 0x1a1a1a });
                    // Sin borde negro
                }}
            />

            {/* Barra de vida principal - ocupa todo el contenedor con transición */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const barWidth = 384 * (animatedHp / maxHp); // Ancho con transición suave
                    if (barWidth > 0) {
                        g.roundRect(8, 8, barWidth, 44, 10);
                        g.fill({ color: getHealthColor() });
                        
                        // Borde suave para mejor transición visual
                        g.roundRect(8, 8, barWidth, 44, 10);
                        g.stroke({ color: getHealthHighlight(), width: 1, alpha: 0.3 });
                    }
                }}
            />

            {/* Barra de transición (para mostrar cambios) */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const currentBarWidth = 384 * (animatedHp / maxHp);
                    const targetBarWidth = 384 * (currentHp / maxHp);
                    
                    // Si hay diferencia entre actual y objetivo, mostrar transición
                    if (Math.abs(currentBarWidth - targetBarWidth) > 1) {
                        if (currentHp < animatedHp) {
                            // Perdiendo vida - mostrar área que se está perdiendo en rojo tenue
                            const lossWidth = currentBarWidth - targetBarWidth;
                            g.roundRect(8 + targetBarWidth, 8, lossWidth, 44, 10);
                            g.fill({ color: 0xFF4444, alpha: 0.4 });
                        } else if (currentHp > animatedHp) {
                            // Ganando vida - mostrar área que se está ganando en verde tenue
                            const gainWidth = targetBarWidth - currentBarWidth;
                            g.roundRect(8 + currentBarWidth, 8, gainWidth, 44, 10);
                            g.fill({ color: 0x4CAF50, alpha: 0.4 });
                        }
                    }
                }}
            />

            {/* Highlight/gradiente superior - ocupa todo el ancho con transición */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const barWidth = 384 * (animatedHp / maxHp);
                    if (barWidth > 0) {
                        // Highlight principal
                        g.roundRect(8, 8, barWidth, 12, 10);
                        g.fill({ color: getHealthHighlight(), alpha: 0.6 });
                        
                        // Highlight animado sutil
                        const pulseAlpha = (Math.sin(colorTransition * Math.PI * 2) + 1) * 0.5;
                        g.roundRect(8, 10, barWidth, 8, 8);
                        g.fill({ color: 0xffffff, alpha: pulseAlpha * 0.2 });
                    }
                }}
            />

            {/* Divisiones/segmentos en la barra - ajustadas al nuevo tamaño */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    const segments = 4; // 4 segmentos de 25% cada uno
                    for (let i = 1; i < segments; i++) {
                        const x = 5 + (390 * (i / segments));
                        g.moveTo(x, 5);
                        g.lineTo(x, 55);
                        g.stroke({ color: 0x000000, width: 1, alpha: 0.3 });
                    }
                }}
            />

            {/* Números de vida - ajustados al centro */}
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

            {/* Efecto de brillo para vida alta - ajustado al nuevo tamaño */}
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