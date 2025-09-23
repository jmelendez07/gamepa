import ICard from "@/types/card";
import { Assets, FederatedPointerEvent, TextStyle, Texture } from 'pixi.js';
import { useState, useRef, useEffect } from 'react';
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
    const [cardsTexture, setCardsTexture] = useState<{[key: string]: Texture}>({});

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

    // Lógica responsive similar a cards-in-hand
    const getCardLayout = () => {
        const screenScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        const baseCardWidth = 300;
        const baseCardHeight = 450;
        const basePadding = 80;
        const baseTopOffset = 120;

        // Escalar dimensiones según el tamaño de pantalla
        const cardWidth = baseCardWidth * screenScale;
        const cardHeight = baseCardHeight * screenScale;
        const padding = basePadding * screenScale;
        const topOffset = baseTopOffset * screenScale;

        // Calcular cartas por fila basado en el ancho disponible
        const availableWidth = window.innerWidth * 0.9; // 90% del ancho de pantalla
        const cardsPerRow = Math.max(1, Math.floor(availableWidth / (cardWidth + padding)));

        return {
            cardWidth,
            cardHeight,
            padding,
            topOffset,
            cardsPerRow,
            screenScale,
        };
    };

    const layout = getCardLayout();

    // Animación suave usando useTick
    useTick(() => {
        let hasChanges = false;

        cards.forEach(card => {
            const targetOffset = hoveredCard === card.id ? -15 * layout.screenScale : 0;
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

    useEffect(() => {
        const loadTextures = async () => {
            try {
                // Cargar cada textura individualmente para asegurar el tipo correcto
                const texturePromises = cards.map(card => Assets.load<Texture>(card.spritesheet));
                const loadedTextures = await Promise.all(texturePromises);
                
                // Crear el objeto de texturas
                const texturesMap: {[key: string]: Texture} = {};
                cards.forEach((card, index) => {
                    texturesMap[card.id] = loadedTextures[index];
                });
                
                setCardsTexture(texturesMap);
            } catch (error) {
                console.error('Error loading card textures:', error);
            }
        };

        loadTextures();
    }, [cards]);

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
                y={30 * layout.screenScale}
                anchor={0.5}
                style={new TextStyle({
                    fontFamily: 'monospace',
                    fontSize: 36 * layout.screenScale,
                    fill: '#e8e3d3',
                    stroke: { color: '#2c1810', width: 3 * layout.screenScale },
                    dropShadow: {
                        distance: 2 * layout.screenScale,
                        color: '#000000',
                        alpha: 1
                    }
                })}
            />

            {/* Botón cerrar */}
            <pixiContainer 
                x={0} 
                y={window.innerHeight - (175 * layout.screenScale)} 
                onPointerDown={() => onClose(false)} 
                cursor="pointer" 
                interactive={true}
            >
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        g.roundRect(0, 0, 200 * layout.screenScale, 60 * layout.screenScale, 4 * layout.screenScale);
                        g.fill(0xFC8065);
                        g.stroke({ color: 0x654321, width: 2 * layout.screenScale });
                    }}
                />
                <pixiText
                    text="Salir"
                    x={100 * layout.screenScale}
                    y={30 * layout.screenScale}
                    anchor={0.5}
                    style={new TextStyle({
                        fontFamily: 'monospace',
                        fontSize: 24 * layout.screenScale,
                        fill: '#e8e3d3',
                        fontWeight: 'bold',
                    })}
                />
            </pixiContainer>

            {/* Contenedor de cartas */}
            <pixiContainer>
                {cards.map((card, index) => {
                    const row = Math.floor(index / layout.cardsPerRow);
                    const col = index % layout.cardsPerRow;
                    
                    // Centrar las cartas en cada fila
                    const cardsInThisRow = Math.min(layout.cardsPerRow, cards.length - row * layout.cardsPerRow);
                    const totalRowWidth = cardsInThisRow * layout.cardWidth + (cardsInThisRow - 1) * layout.padding;
                    const rowStartX = (window.innerWidth - totalRowWidth) / 2;
                    
                    const baseX = rowStartX + col * (layout.cardWidth + layout.padding);
                    const baseY = layout.topOffset + row * (layout.cardHeight + layout.padding);
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
                            {cardsTexture[card.id] && (
                                <pixiSprite
                                    texture={cardsTexture[card.id]}
                                    width={layout.cardWidth}
                                    height={layout.cardHeight}
                                />
                            )}

                            <pixiText
                                text={card.name}
                                x={layout.cardWidth / 2}
                                y={15 * layout.screenScale}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20 * layout.screenScale,
                                    fill: '#e8e3d3',
                                    stroke: { color: '#000000', width: 1 * layout.screenScale },
                                    wordWrap: true,
                                    wordWrapWidth: layout.cardWidth - (20 * layout.screenScale),
                                    align: 'center',
                                })}
                            />

                            <pixiText
                                text={card.energy_cost.toString()}
                                x={35 * layout.screenScale}
                                y={30 * layout.screenScale}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20 * layout.screenScale,
                                    fill: '#ffffff',
                                    fontWeight: 'bold',
                                })}
                            />

                            {card.stats > 0 && (
                                <pixiText
                                    text={card.stats.toString()}
                                    x={layout.cardWidth / 2}
                                    y={layout.cardHeight - (70 * layout.screenScale)}
                                    anchor={0.5}
                                    style={new TextStyle({
                                        fontFamily: 'monospace',
                                        fontSize: 37 * layout.screenScale,
                                        fill: '#ffdc00',
                                        stroke: { color: '#8b4513', width: 1 * layout.screenScale },
                                        fontWeight: 'bold',
                                    })}
                                />
                            )}

                            <pixiText
                                text={card.type.name}
                                x={layout.cardWidth / 2}
                                y={layout.cardHeight - (40 * layout.screenScale)}
                                anchor={0.5}
                                style={new TextStyle({
                                    fontFamily: 'monospace',
                                    fontSize: 20 * layout.screenScale,
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