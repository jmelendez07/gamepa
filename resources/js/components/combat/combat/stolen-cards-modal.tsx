import ICard from "@/types/card";
import { FederatedPointerEvent, TextStyle } from 'pixi.js';
import { useState, useRef } from 'react';
import { useTick } from '@pixi/react';

interface IStolenCardsModalProps {
    cards: ICard[];
    onClose: (value: boolean) => void;
    isOpen: boolean;
}

export default function StolenCardsModal({ cards, onClose, isOpen }: IStolenCardsModalProps) {
    if (!isOpen) return null;

    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const cardPositions = useRef<{[key: string]: number}>({});
    const [, forceUpdate] = useState({});

    const getCardTypeColor = (typeName: string): number => {
        const typeColors: { [key: string]: number } = {
            'Attack': 0x8b2635,
            'Skill': 0x2d5016,
            'Power': 0x4a1a4a,
            'Status': 0x4a4a4a,
            'Curse': 0x2e1065,
            default: 0x5a5a5a,
        };
        
        return typeColors[typeName] || typeColors.default;
    };

    const cardWidth = 300;
    const cardHeight = 450;
    const padding = 80;
    const cardsPerRow = Math.floor((window.innerWidth - 100) / (cardWidth + padding));

    // Animación suave usando useTick
    useTick(() => {
        let hasChanges = false;

        cards.forEach(card => {
            const targetOffset = hoveredCard === card.id ? -15 : 0;
            const currentOffset = cardPositions.current[card.id] || 0;
            
            if (Math.abs(currentOffset - targetOffset) > 0.1) {
                const newOffset = currentOffset + (targetOffset - currentOffset) * 0.2;
                cardPositions.current[card.id] = newOffset;
                hasChanges = true;
            } else if (Math.abs(currentOffset - targetOffset) > 0) {
                cardPositions.current[card.id] = targetOffset;
                hasChanges = true;
            }
        });

        if (hasChanges) {
            forceUpdate({});
        }
    });

    const handleCardHover = (cardId: string) => {
        // Resetear todas las posiciones que no sean la carta actual
        cards.forEach(card => {
            if (card.id !== cardId && cardPositions.current[card.id] !== 0) {
                cardPositions.current[card.id] = 0;
            }
        });
        setHoveredCard(cardId);
    };

    const handleCardOut = () => {
        setHoveredCard(null);
    };

    return (
        <pixiContainer zIndex={100}>
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    g.rect(0, 0, window.innerWidth, window.innerHeight);
                    g.fill({ color: 0x0f0f23, alpha: 0.9 });
                }}
            />

            <pixiText
                text="CARTAS ROBADAS"
                x={window.innerWidth / 2}
                y={30}
                anchor={0.5}
                style={new TextStyle({
                    fontFamily: 'monospace',
                    fontSize: 36,
                    fill: '#e8e3d3',
                    stroke: { color: '#2c1810', width: 3 },
                    dropShadow: {
                        distance: 2,
                        color: '#000000',
                        alpha: 1
                    }
                })}
            />

            {/* Botón cerrar */}
            <pixiContainer x={0} y={window.innerHeight - 175} onPointerDown={() => onClose(false)} cursor="pointer" interactive={true}>
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        g.roundRect(0, 0, 200, 60, 4);
                        g.fill(0xFC8065);
                        g.stroke({ color: 0x654321, width: 2 });
                    }}
                />
                <pixiText
                    text="Salir"
                    x={100}
                    y={30}
                    anchor={0.5}
                    style={new TextStyle({
                        fontFamily: 'monospace',
                        fontSize: 24,
                        fill: '#e8e3d3',
                        fontWeight: 'bold',
                    })}
                />
            </pixiContainer>

            {/* Contenedor de cartas */}
            <pixiContainer>
                {cards.map((card, index) => {
                    const row = Math.floor(index / cardsPerRow);
                    const col = index % cardsPerRow;
                    const baseX = 50 + col * (cardWidth + padding);
                    const baseY = 120 + row * (cardHeight + padding);
                    const yOffset = cardPositions.current[card.id] || 0;
                    const isHovered = hoveredCard === card.id;
                    
                    return (
                        <pixiContainer
                            key={card.id} 
                            x={baseX} 
                            y={baseY + yOffset}
                            interactive={true}
                            cursor="pointer"
                            zIndex={isHovered ? 100 : 0}
                            onPointerOver={() => handleCardHover(card.id)}
                            onPointerOut={handleCardOut}
                        >
                            {/* Fondo de la carta */}
                            <pixiGraphics
                                draw={(g) => {
                                    const cardColor = getCardTypeColor(card.type.name);
                                    g.clear();
                                    g.roundRect(0, 0, cardWidth, cardHeight, 8);
                                    g.fill(cardColor);
                                    g.stroke({ color: 0x2c1810, width: 3 });
                                }}
                            />

                            <pixiText
                                text={card.name}
                                x={cardWidth / 2}
                                y={15}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20,
                                    fill: '#e8e3d3',
                                    stroke: { color: '#000000', width: 1 },
                                    wordWrap: true,
                                    wordWrapWidth: cardWidth - 20,
                                    align: 'center',
                                })}
                            />

                            <pixiGraphics
                                x={25}
                                y={25}
                                draw={(g) => {
                                    g.clear();
                                    g.circle(0, 0, 20);
                                    g.fill(0x4169e1);
                                    g.stroke({ color: 0x1e3a8a, width: 2 });
                                }}
                            />
                            <pixiText
                                text={card.energy_cost.toString()}
                                x={25}
                                y={25}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20,
                                    fill: '#ffffff',
                                    fontWeight: 'bold',
                                })}
                            />

                            {card.stats > 0 && (
                                <pixiText
                                    text={card.stats.toString()}
                                    x={cardWidth / 2}
                                    y={cardHeight - 70}
                                    anchor={0.5}
                                    style={new TextStyle({
                                        fontFamily: 'monospace',
                                        fontSize: 37,
                                        fill: '#ffdc00',
                                        stroke: { color: '#8b4513', width: 1 },
                                        fontWeight: 'bold',
                                    })}
                                />
                            )}

                            <pixiText
                                text={card.type.name}
                                x={cardWidth / 2}
                                y={cardHeight - 40}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20,
                                    fill: '#b8b8b8',
                                    fontStyle: 'italic',
                                })}
                            />
                        </pixiContainer>
                    );
                })}
            </pixiContainer>
        </pixiContainer>
    );
}