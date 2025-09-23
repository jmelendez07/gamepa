import { useState, useCallback, useEffect } from 'react';
import Galaxy from "@/types/galaxy";
import { Application, extend } from '@pixi/react';
import { calculateCanvasSize } from '@/components/helpers/common';
import { Container, Sprite, Text, Graphics, TextStyle, Assets, Texture } from 'pixi.js';

extend({ Container, Sprite, Text, Graphics });

interface IGalaxiesShowProps {
    galaxy: Galaxy;
}

// Configuración de posiciones de planetas
const planetPositions = [
    { x: 0.2, y: 0.3, name: 'top-left' },     // planeta 1
    { x: 0.8, y: 0.3, name: 'top-right' },    // planeta 4
    { x: 0.35, y: 0.7, name: 'bottom-left' }, // planeta 2
    { x: 0.65, y: 0.7, name: 'bottom-right' } // planeta 3
];

// Configuración de conexiones
const connections = [
    { from: 0, to: 2 }, // planeta 1 -> planeta 2
    { from: 2, to: 3 }, // planeta 2 -> planeta 3
    { from: 3, to: 1 }, // planeta 3 -> planeta 4
];

export default function GalaxiesShow({ galaxy }: IGalaxiesShowProps) {
    const [isClient, setIsClient] = useState(false);
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [planetTextures, setPlanetTextures] = useState<{[key: string]: Texture}>({});

    const updateCanvasSize = useCallback(() => {
        setCanvasSize(calculateCanvasSize());
    }, []);

    useEffect(() => {
        setIsClient(true);
        window.addEventListener('resize', updateCanvasSize);
        
        // Cargar imagen de fondo de la galaxia
        if (galaxy.image_url) {
            Assets.load<Texture>(galaxy.image_url).then(setBgTexture);
        }

        // Cargar texturas de planetas
        galaxy.planets.forEach(planet => {
            if (planet.image_url) {
                Assets.load<Texture>(planet.image_url).then(texture => {
                    setPlanetTextures(prev => ({
                        ...prev,
                        [planet.id]: texture
                    }));
                });
            }
        });

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [updateCanvasSize, galaxy]);

    // Estilos de texto
    const titleStyle = new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#333333',
        align: 'center'
    });

    const galaxyNameStyle = new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#4c1d95',
        align: 'center'
    });

    const planetNameStyle = new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#333333',
        align: 'center'
    });

    // Ordenar planetas por número
    const sortedPlanets = [...galaxy.planets].sort((a, b) => a.number - b.number);

    const handlePlanetClick = useCallback((planetId: string) => {
        setSelectedPlanet(planetId);
        console.log('Navigate to planet:', planetId);
    }, []);

    const drawDashedLine = useCallback((g: Graphics, fromX: number, fromY: number, toX: number, toY: number) => {
        g.clear();
        g.lineStyle(3, 0x333333, 1);
        
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const segments = Math.floor(distance / 20);
        
        const stepX = dx / segments;
        const stepY = dy / segments;
        
        for (let i = 0; i < segments; i += 2) {
            const startX = fromX + stepX * i;
            const startY = fromY + stepY * i;
            const endX = fromX + stepX * Math.min(i + 1, segments);
            const endY = fromY + stepY * Math.min(i + 1, segments);
            
            g.moveTo(startX, startY);
            g.lineTo(endX, endY);
        }
    }, []);

    const drawPlanetCircle = useCallback((g: Graphics, isSelected: boolean) => {
        g.clear();
        g.beginFill(isSelected ? 0x8b5cf6 : 0xffffff, 1);
        g.lineStyle(3, isSelected ? 0x7c3aed : 0x8b5cf6, 1);
        g.drawCircle(0, 0, 45);
        g.endFill();
    }, []);

    const drawPlanetRings = useCallback((g: Graphics) => {
        g.clear();
        g.lineStyle(2, 0x8b5cf6, 0.7);
        g.drawEllipse(0, 0, 60, 25);
        g.lineStyle(2, 0x8b5cf6, 0.5);
        g.drawEllipse(0, 0, 70, 30);
    }, []);

    return (isClient && (
        <div className="w-full h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
            {/* Header */}
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Gameplay: Fases de cada temática
                </h1>
                <div className="inline-block bg-white rounded-2xl px-6 py-3 shadow-lg border border-purple-200">
                    <h2 className="text-2xl font-bold text-purple-700">
                        {galaxy.name}
                    </h2>
                </div>
            </div>

            {/* PixiJS Canvas */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-6xl aspect-video bg-white rounded-3xl shadow-2xl border-4 border-gray-800 overflow-hidden">
                    <Application 
                        width={canvasSize.width} 
                        height={canvasSize.height}
                        backgroundColor={0xf8fafc}
                        antialias={true}
                    >
                        <pixiContainer>
                            {/* Imagen de fondo de la galaxia */}
                            {bgTexture && (
                                <pixiSprite 
                                    texture={bgTexture}
                                    width={canvasSize.width}
                                    height={canvasSize.height}
                                    alpha={0.1}
                                />
                            )}

                            {/* Título */}
                            <pixiText 
                                text="Gameplay: Fases de cada temática"
                                style={titleStyle}
                                x={canvasSize.width / 2}
                                y={50}
                                anchor={0.5}
                            />

                            {/* Nombre de la galaxia */}
                            <pixiText 
                                text={galaxy.name}
                                style={galaxyNameStyle}
                                x={canvasSize.width / 2}
                                y={120}
                                anchor={0.5}
                            />

                            {/* Líneas de conexión entre planetas */}
                            {connections.map((connection, index) => {
                                const fromPlanet = sortedPlanets[connection.from];
                                const toPlanet = sortedPlanets[connection.to];
                                
                                if (!fromPlanet || !toPlanet) return null;
                                
                                const fromPos = planetPositions[connection.from];
                                const toPos = planetPositions[connection.to];
                                
                                return (
                                    <pixiGraphics
                                        key={`connection-${index}`}
                                        draw={(g: Graphics) => drawDashedLine(
                                            g,
                                            fromPos.x * canvasSize.width,
                                            fromPos.y * canvasSize.height,
                                            toPos.x * canvasSize.width,
                                            toPos.y * canvasSize.height
                                        )}
                                    />
                                );
                            })}

                            {/* Planetas */}
                            {sortedPlanets.slice(0, 4).map((planet, index) => {
                                const position = planetPositions[index];
                                const x = position.x * canvasSize.width;
                                const y = position.y * canvasSize.height;
                                const isSelected = selectedPlanet === planet.id;
                                const scale = isSelected ? 1.1 : 1;

                                return (
                                    <pixiContainer 
                                        key={planet.id}
                                        x={x}
                                        y={y}
                                        scale={scale}
                                        interactive={true}
                                        cursor="pointer"
                                        onClick={() => handlePlanetClick(planet.id)}
                                    >
                                        {/* Círculo de fondo del planeta */}
                                        <pixiGraphics
                                            draw={(g: Graphics) => drawPlanetCircle(g, isSelected)}
                                        />
                                        
                                        {/* Imagen del planeta */}
                                        {planetTextures[planet.id] && (
                                            <pixiSprite
                                                texture={planetTextures[planet.id]}
                                                anchor={0.5}
                                                width={80}
                                                height={80}
                                            />
                                        )}
                                        
                                        {/* Anillos del planeta */}
                                        <pixiGraphics
                                            draw={(g: Graphics) => drawPlanetRings(g)}
                                        />
                                        
                                        {/* Nombre del planeta */}
                                        <pixiText
                                            text={planet.name}
                                            style={planetNameStyle}
                                            anchor={0.5}
                                            y={70}
                                        />
                                        
                                        {/* Número del planeta */}
                                        <pixiText
                                            text={`#${planet.number}`}
                                            style={new TextStyle({
                                                fontFamily: 'Arial, sans-serif',
                                                fontSize: 12,
                                                fill: '#6b7280',
                                                align: 'center'
                                            })}
                                            anchor={0.5}
                                            y={85}
                                        />
                                    </pixiContainer>
                                );
                            })}
                        </pixiContainer>
                    </Application>
                </div>
            </div>

            {/* Footer con información del planeta seleccionado */}
            {selectedPlanet && (
                <div className="p-4 bg-white border-t border-purple-200">
                    <div className="max-w-4xl mx-auto text-center">
                        {(() => {
                            const planet = sortedPlanets.find(p => p.id === selectedPlanet);
                            return planet ? (
                                <div>
                                    <h3 className="text-xl font-bold text-purple-700 mb-2">
                                        {planet.name}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        {planet.description}
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                            {planet.stages.length} lugares disponibles
                                        </span>
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                                            Explorar Planeta
                                        </button>
                                    </div>
                                </div>
                            ) : null;
                        })()}
                    </div>
                </div>
            )}
        </div>
    ));
}