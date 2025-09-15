import Card from "@/types/card";
import { useCallback, useState } from 'react';

interface IDiscardedCardsStackProps {
    onClick: (value: boolean) => void;
    cards: Card[];
}

export default function DiscardedCardsStack({ onClick, cards }: IDiscardedCardsStackProps) {
    const [isHovered, setIsHovered] = useState(false);
    

    const drawCardStack = useCallback((g: any) => {
        g.clear();

        let stackLayers = 4;
        
        for (let i = 0; i < stackLayers; i++) {
            const offsetX = -i * 4;
            const offsetY = -i * 4;
            
            g.beginFill(0x000000, 0.3);
            g.drawRoundedRect(52 + offsetX, 52 + offsetY, 50, 50, 4);
            g.endFill();
            
            g.beginFill(0x2a2a2a);
            g.lineStyle(2, 0x1a1a1a, 1);
            g.drawRoundedRect(50 + offsetX, 50 + offsetY, 50, 50, 4);
            g.endFill();
            
            g.lineStyle(1, 0x404040, 1);
            g.drawRoundedRect(52 + offsetX, 52 + offsetY, 46, 46, 2);
            
            g.lineStyle(1, 0x555555, 0.8);
            g.moveTo(60 + offsetX, 68 + offsetY);
            g.lineTo(92 + offsetX, 68 + offsetY);
            g.moveTo(60 + offsetX, 75 + offsetY);
            g.lineTo(92 + offsetX, 75 + offsetY);
            g.moveTo(60 + offsetX, 82 + offsetY);
            g.lineTo(92 + offsetX, 82 + offsetY);
        }
    }, [cards.length]);

    return (
        <pixiContainer 
            cursor="pointer"
            interactive={true}
            x={window.innerWidth - 145} 
            y={window.innerHeight - 210}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onClick={() => onClick(true)}
        >
            <pixiGraphics draw={drawCardStack} />

            {isHovered && (
                <pixiText
                    text="Mostrar cartas descartadas"
                    x={30}
                    y={63}
                    anchor={{ x: 1, y: 0.5 }}
                    style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: 14,
                        fill: '#ffffff',
                        stroke: '#000000',
                        dropShadow: true,
                    }}
                />
            )}

            <pixiText
                text={`${cards.length}`}
                x={55}
                y={50}
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 24,
                    fill: '#ffffff',
                    stroke: '#000000',
                    dropShadow: true,
                }}
            />
        </pixiContainer>
    );
}