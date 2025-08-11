import { PropsWithChildren, useRef } from "react";
import { IPosition } from "../types/common";
import { Graphics } from "pixi.js";
import { useTick } from "@pixi/react";
import { TILE_SIZE, ZOOM } from "../constants/game-world";
import { lerp } from "../helpers/common";

interface ICameraProps {
    heroPosition: IPosition;
    canvasSize: { width: number; height: number };
}

export const Camera = ({canvasSize, heroPosition, children}: PropsWithChildren<ICameraProps>) => {
    const containerRef = useRef<Graphics>(null);

    const cameraPosition = useRef<IPosition>({ x: canvasSize.width / 2, y: canvasSize.height / 2 });

    useTick(() => {
        if (containerRef.current) {
            const targetX = canvasSize.width/2 - heroPosition.x * TILE_SIZE * ZOOM - TILE_SIZE;
            const targetY = canvasSize.height/2 - heroPosition.y * TILE_SIZE * ZOOM - TILE_SIZE;

            cameraPosition.current.x = lerp(cameraPosition.current.x, targetX);
            cameraPosition.current.y = lerp(cameraPosition.current.y, targetY);

            containerRef.current.x = cameraPosition.current.x;
            containerRef.current.y = cameraPosition.current.y;
        }
    })

    return (
        <pixiContainer ref={containerRef} scale={ZOOM}>
            {children}
        </pixiContainer>
    );
};
