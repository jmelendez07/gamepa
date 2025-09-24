import IPlanet from "@/types/planet";
import { Texture } from "pixi.js";
import React, { useEffect, useState } from "react";
import { useTick } from "@pixi/react";

interface IPlanetProps {
    planet: IPlanet;
    x: number;
    y: number;
    planetTextures: { [key: string]: Texture };
    handleOnClick: (planet: IPlanet) => void;
    transitionStage?: "enter" | "exit";
    targetX?: number;
    targetY?: number;
    targetScale?: number;
    onTransitionEnd?: () => void;
}

export default function Planet({
    planet,
    x,
    y,
    planetTextures,
    handleOnClick,
    transitionStage,
    targetX,
    targetY,
    targetScale,
    onTransitionEnd
}: IPlanetProps) {
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x, y });
    const [scale, setScale] = useState(1);

    useEffect(() => {
        // Reinicia escala y posición solo cuando no hay transición
        if (!transitionStage) {
            if (planetTextures[planet.id]) {
                const texture = planetTextures[planet.id];
                const baseScale = Math.max(200 / texture.width, 200 / texture.height);
                setScale(baseScale);
            } else {
                setScale(1);
            }
            setPos({ x, y });
        }
    }, [x, y, planet.id, transitionStage, planetTextures]);

    useTick(() => {
        if (!planetTextures[planet.id]) return;
        const texture = planetTextures[planet.id];
        const baseScale = Math.max(200 / texture.width, 200 / texture.height);

        let nextScale = scale;
        let nextX = pos.x;
        let nextY = pos.y;

        if (transitionStage === "enter" && targetX !== undefined && targetY !== undefined && targetScale !== undefined) {
            console.log('En el primero');
            
            // Animar hacia el centro y escala grande
            nextScale += (targetScale - nextScale) * 0.15;
            nextX += (targetX - nextX) * 0.15;
            nextY += (targetY - nextY) * 0.15;

            // Detecta fin de animación
            if (
                Math.abs(nextScale - targetScale) < 0.01 &&
                Math.abs(nextX - targetX) < 1 &&
                Math.abs(nextY - targetY) < 1 &&
                onTransitionEnd
            ) {
                onTransitionEnd();
            }
        } else if (transitionStage === "exit" && targetX !== undefined && targetY !== undefined) {
            console.log('En el segundo');
            // Animar hacia posición y escala original
            nextScale += (baseScale - nextScale) * 0.15;
            nextX += (targetX - nextX) * 0.15;
            nextY += (targetY - nextY) * 0.15;

            // Detecta fin de animación
            if (
                Math.abs(nextScale - baseScale) < 0.01 &&
                Math.abs(nextX - targetX) < 1 &&
                Math.abs(nextY - targetY) < 1 &&
                onTransitionEnd
            ) {
                onTransitionEnd();
            }
        } else {
            const target = hovered ? baseScale * 1.2 : baseScale;
            nextScale += (target - nextScale) * 0.15;
            nextX = x;
            nextY = y;
        }

        setScale(nextScale);
        setPos({ x: nextX, y: nextY });
    });

    return (
        <pixiContainer
            x={pos.x}
            y={pos.y}
            interactive={!transitionStage}
            cursor={!transitionStage ? "pointer" : undefined}
            onClick={() => !transitionStage && handleOnClick(planet)}
            onMouseOver={() => !transitionStage && setHovered(true)}
            onMouseOut={() => !transitionStage && setHovered(false)}
        >
            {planetTextures[planet.id] && (() => {
                const texture = planetTextures[planet.id];
                const texWidth = texture.width;
                const texHeight = texture.height;

                return (
                    <pixiSprite
                        texture={texture}
                        anchor={0.5}
                        width={texWidth}
                        height={texHeight}
                        scale={scale}
                    />
                );
            })()}
        </pixiContainer>
    );
}