import { extend } from "@pixi/react";
import { Assets, Container, Sprite, Texture } from "pixi.js";
import { useEffect, useState } from "react";

extend({Container, Sprite});

interface IExerciseProps {
  enemy: string;
}

export const Exercise = ({ enemy }: IExerciseProps) => {
    const bgAsset = '/assets/ui/exercise-ui.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(bgAsset)
            .then((tex) => {
                if(!cancelled) {
                    setBgTexture(tex);
                }
            }).catch((err) => {
                console.error("Failed to load background texture:", err);
            });

        return () => {
            cancelled = true;
            bgTexture?.destroy();
        };
    }, [bgAsset]);

    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.80;

    return (
      <pixiContainer 
        x={window.innerWidth / 2 - width / 2} 
        y={window.innerHeight / 2 - height / 2}
      >
        {bgTexture && <pixiSprite texture={bgTexture} width={width} height={height} />}
      </pixiContainer>
    )
}
