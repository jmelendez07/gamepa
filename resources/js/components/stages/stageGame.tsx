import { extend } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { GAME_HEIGHT, GAME_WIDTH, OFFSET_X, OFFSET_Y } from "../constants/game-world";
import { Stage } from "@/types/planet";

extend({ Sprite });

interface IStageGameProps {
    stage: Stage;
}

export const StageGame = ({ stage }: IStageGameProps) => {

    const [stageTexture, setStageTexture] = useState<Texture | null>(null);

    useEffect(() => {
        let cancelled = false;
        Assets.load<Texture>(stage.image_url)
            .then((tex) => {
                if (!cancelled) setStageTexture(tex);
            })
            .catch((err) => {
                console.error('Failed to load stage texture', err);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <pixiSprite 
            texture={stageTexture ?? undefined}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            x={OFFSET_X}
            y={OFFSET_Y}
            />
    );
};
