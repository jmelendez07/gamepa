import { useTick } from "@pixi/react";
import { useState } from "react";

interface INextTurnButtonProps {
    onClick?: () => void;
}

export default function NextTurnButton({ onClick }: INextTurnButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    useTick(() => {
        const target = isHovered ? 1 : 0;
        const speed = 0.1;
        setAnimationProgress(prev => {
            const diff = target - prev;
            if (Math.abs(diff) < 0.01) return target;
            return prev + diff * speed;
        });
    });

    const interpolateColor = (color1: number, color2: number, progress: number) => {
        const r1 = (color1 >> 16) & 0xFF;
        const g1 = (color1 >> 8) & 0xFF;
        const b1 = color1 & 0xFF;
        
        const r2 = (color2 >> 16) & 0xFF;
        const g2 = (color2 >> 8) & 0xFF;
        const b2 = color2 & 0xFF;
        
        const r = Math.round(r1 + (r2 - r1) * progress);
        const g = Math.round(g1 + (g2 - g1) * progress);
        const b = Math.round(b1 + (b2 - b1) * progress);
        
        return (r << 16) | (g << 8) | b;
    };

    const backgroundColor = interpolateColor(0x2c2c2c, 0xFFD700, animationProgress);
    const borderColor = interpolateColor(0x444444, 0xDAA520, animationProgress);
    const strokeColor = interpolateColor(0x000000, 0xDAA520, animationProgress);
    
    const yOffset = animationProgress * 3;
    const shadowAlpha = (1 - animationProgress) * 0.3;

    return (
        <pixiContainer 
            x={window.innerWidth - 240} 
            y={window.innerHeight - 100 + yOffset} 
            interactive={true}
            zIndex={10}
            eventMode="static"
            cursor="pointer"
            onClick={onClick}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    
                    if (shadowAlpha > 0.01) {
                        g.roundRect(5, 5, 200, 60, 12);
                        g.fill({ color: 0x000000, alpha: shadowAlpha });
                    }
                    
                    g.roundRect(0, 0, 200, 60, 12);
                    g.fill({ color: backgroundColor });
                    g.stroke({ color: borderColor, width: 2 });
                }}
            />
            <pixiText
                text="Terminar Turno"
                anchor={0.5}
                x={100}
                y={30}
                style={{
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fill: 0xffffff,
                    fontWeight: '600',
                    stroke: { color: strokeColor, width: 1 },
                }}
            />
        </pixiContainer>
    );
}