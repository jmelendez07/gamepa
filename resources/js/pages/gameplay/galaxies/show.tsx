import { useState, useCallback, useEffect } from 'react';
import Galaxy from "@/types/galaxy";
import { Application, extend } from '@pixi/react';
import { calculateCanvasSize } from '@/components/helpers/common';
import { Container, Sprite, Text, Graphics, TextStyle, Assets, Texture } from 'pixi.js';
import Planet from '@/components/gameplay/galaxies/planet';
import IPlanet from '@/types/planet';
import Stage from '@/components/gameplay/planets/stage';

extend({ Container, Sprite, Text, Graphics });

interface IGalaxiesShowProps {
    galaxy: Galaxy;
}

const planetPositions = [
    { x: 0.1, y: 0.35, name: 'top-left' },
    { x: 0.35, y: 0.8, name: 'top-right' },
    { x: 0.6, y: 0.35, name: 'bottom-left' },
    { x: 0.85, y: 0.8, name: 'bottom-right' }
];

const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
];

const titleStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 40,
    fontWeight: '100',
    fill: '#efefef',
    align: 'center'
});

const galaxyNameStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 100,
    fontWeight: '500',
    fill: '#4c1d95',
    align: 'center'
});

const planetNameStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 120,
    fontWeight: '500',
    fill: '#4c1d95',
    align: 'center'
});

const planetDescriptionStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 40,
    fontWeight: '100',
    fill: '#efefef',
    align: 'center'
});

const exitStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 50,
    fontWeight: '400',
    fill: '#fff',
    align: 'center',
});

export default function GalaxiesShow({ galaxy }: IGalaxiesShowProps) {
    const [isClient, setIsClient] = useState(false);
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [planetTextures, setPlanetTextures] = useState<{[key: string]: Texture}>({});
    const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(null);
    const [transitionStage, setTransitionStage] = useState<"enter" | "exit" | undefined>(undefined);
    const [stageTextures, setStageTextures] = useState<{[key: string]: Texture}>({});
    const [showStages, setShowStages] = useState(false);
    const [appReady, setAppReady] = useState(false);

    const updateCanvasSize = useCallback(() => {
        setCanvasSize(calculateCanvasSize());
    }, []);

    useEffect(() => {
        setIsClient(true);
        
        const timer = setTimeout(() => {
            setAppReady(true);
        }, 100);

        window.addEventListener('resize', updateCanvasSize);
        
        if (galaxy.image_url) {
            Assets.load<Texture>(galaxy.image_url)
                .then(texture => {
                    setBgTexture(texture);
                });
        }

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
            clearTimeout(timer);
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [updateCanvasSize, galaxy]);

    useEffect(() => {
        if (selectedPlanet && selectedPlanet.stages) {
            selectedPlanet.stages.forEach(stage => {
                if (stage.image_url && !stageTextures[stage.id]) {
                    Assets.load<Texture>(stage.image_url).then(texture => {
                        setStageTextures(prev => ({
                            ...prev,
                            [stage.id]: texture
                        }));
                    });
                }
            });
        }
    }, [selectedPlanet, stageTextures]);

    const sortedPlanets = [...galaxy.planets].sort((a, b) => a.number - b.number);

    const handleTransitionEnd = useCallback(() => {
        if (transitionStage === "enter") {
            setShowStages(true);
        }
        if (transitionStage === "exit") {
            setShowStages(false);
            setSelectedPlanet(null);
            setTransitionStage(undefined);
        }
    }, [transitionStage]);

    const handlePlanetClick = useCallback((planet: IPlanet) => {
        setSelectedPlanet(planet);
        setTransitionStage("enter");
        setShowStages(false);
    }, []);

    const handleExit = useCallback(() => {
        setTransitionStage("exit");
        setShowStages(false);
    }, []);

    const drawDashedLine = useCallback((g: Graphics, fromX: number, fromY: number, toX: number, toY: number) => {
        g.clear();

        const dashLength = 20;
        const gapLength = 12;

        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        let progress = 0;
        while (progress < distance) {
            const startX = fromX + Math.cos(angle) * progress;
            const startY = fromY + Math.sin(angle) * progress;
            progress += dashLength;
            if (progress > distance) progress = distance;
            const endX = fromX + Math.cos(angle) * progress;
            const endY = fromY + Math.sin(angle) * progress;

            g.moveTo(startX, startY);
            g.lineTo(endX, endY);
            g.stroke({ width: 4, color: 0x8b5cf6, alpha: 1 });

            progress += gapLength;
        }
    }, []);

    return (
        <>
            {(isClient && appReady) && (
                <Application 
                    width={canvasSize.width} 
                    height={canvasSize.height}
                    antialias={true}
                    resizeTo={window}
                    autoDensity={true}
                >
                    <pixiContainer>
                        {bgTexture && (
                            <pixiSprite 
                                texture={bgTexture}
                                width={canvasSize.width}
                                height={canvasSize.height}
                                alpha={0.4}
                            />
                        )}

                        {!selectedPlanet && (
                            <>
                                <pixiText 
                                    text="Gameplay: Fases de cada temática"
                                    style={titleStyle}
                                    x={canvasSize.width / 2}
                                    y={50}
                                    anchor={0.5}
                                />

                                <pixiText 
                                    text={galaxy.name}
                                    style={galaxyNameStyle}
                                    x={canvasSize.width / 2}
                                    y={110}
                                    anchor={0.5}
                                />

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

                                {sortedPlanets.slice(0, 4).map((planet, index) => {
                                    const position = planetPositions[index];
                                    const x = position.x * canvasSize.width;
                                    const y = position.y * canvasSize.height;
                                    return (
                                        <Planet
                                            handleOnClick={handlePlanetClick}
                                            key={planet.id}
                                            planet={planet}
                                            x={x}
                                            y={y}
                                            planetTextures={planetTextures}
                                        />
                                    );
                                })}
                            </>
                        )}

                        {selectedPlanet && planetTextures[selectedPlanet.id] && (() => {
                            const texture = planetTextures[selectedPlanet.id];
                            const expandedScale = (canvasSize.height / 1.5) / texture.height;
                            const targetX = canvasSize.width / 2;
                            const targetY = canvasSize.height / 2;
                            const index = sortedPlanets.findIndex(p => p.id === selectedPlanet.id);
                            const initialPos = planetPositions[index];
                            const initialX = initialPos.x * canvasSize.width;
                            const initialY = initialPos.y * canvasSize.height;

                            const radius = (texture.height * expandedScale) / 2 - 80;
                            const stagePositions = selectedPlanet.stages.map((stage, idx) => {
                                const angle = Math.random() * Math.PI * 2;
                                return {
                                    x: targetX + Math.cos(angle) * (Math.random() * radius * 0.8),
                                    y: targetY + Math.sin(angle) * (Math.random() * radius * 0.8),
                                    stage
                                };
                            });

                            return (
                                <>
                                    <Planet
                                        planet={selectedPlanet}
                                        x={transitionStage === "exit" ? targetX : initialX}
                                        y={transitionStage === "exit" ? targetY : initialY}
                                        planetTextures={planetTextures}
                                        handleOnClick={() => {}}
                                        transitionStage={transitionStage}
                                        targetX={transitionStage === "exit" ? initialX : targetX}
                                        targetY={transitionStage === "exit" ? initialY : targetY}
                                        targetScale={transitionStage === "exit" ? 1 : expandedScale}
                                        onTransitionEnd={handleTransitionEnd}
                                    />
                                    {showStages && transitionStage !== "exit" && (
                                        <>  
                                            <pixiText 
                                                text={selectedPlanet.name}
                                                style={planetNameStyle}
                                                x={canvasSize.width / 2}
                                                y={60}
                                                anchor={0.5}
                                            />
                                            {stagePositions.map(({ x, y, stage }) => (
                                                <Stage key={stage.id} stage={stage} x={x} y={y} stageTextures={stageTextures} />
                                            ))}
                                            <pixiText 
                                                text={selectedPlanet.description}
                                                style={planetDescriptionStyle}
                                                x={canvasSize.width / 2}
                                                y={130}
                                                anchor={0.5}
                                            />
                                            <pixiText
                                                text="Salir"
                                                style={exitStyle}
                                                x={canvasSize.width - 50}
                                                y={30}
                                                anchor={0.5}
                                                interactive={true}
                                                cursor="pointer"
                                                onClick={handleExit}
                                            />
                                        </>
                                    )}
                                </>
                            );
                        })()}
                    </pixiContainer>
                </Application>         
            )}
        </>
    );
}