import { Stage as IStage } from "@/types/planet";
import { Graphics, Texture } from "pixi.js";
import { useEffect, useRef } from "react";

interface IStageProps {
    stage: IStage;
    x: number;
    y: number;
    stageTextures: { [key: string]: Texture };
}

export default function Stage({ stage, x, y, stageTextures }: IStageProps) {
    const maskRef = useRef<Graphics>(null);
    const spriteRef = useRef<any>(null);

    useEffect(() => {
        if (spriteRef.current && maskRef.current) {
            spriteRef.current.mask = maskRef.current;
        }
    }, [stageTextures[stage.id]]);

    return (
        <pixiContainer interactive={true} cursor="pointer" key={stage.id} x={x} y={y}>
            <pixiGraphics
                draw={g => {
                    g.clear();
                    g.beginFill(0x8b5cf6);
                    g.drawCircle(0, 0, 55);
                    g.endFill();
                }}
            />
            <pixiGraphics
                ref={maskRef}
                draw={g => {
                    g.clear();
                    g.beginFill(0x8b5cf6);
                    g.drawCircle(0, 0, 50);
                    g.endFill();
                }}
            />
            {stageTextures[stage.id] && (
                <pixiSprite
                    ref={spriteRef}
                    texture={stageTextures[stage.id]}
                    anchor={0.5}
                    width={100}
                    height={100}
                    x={0}
                    y={0}
                />
            )}
        </pixiContainer>
    );
}