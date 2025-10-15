import { Stage } from "@/types/planet";
import { Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";

interface StageUIProps {
    stage: Stage;
}

const stageAsset = 'https://res.cloudinary.com/dvibz13t8/image/upload/v1759327239/etapa_qicev8.png';

export const StageUI = ({ stage }: StageUIProps) => {
    const [texture, setTexture] = useState<Texture | null>(null);

    useEffect(() => {
        Assets.load<Texture>(stageAsset).then((tex) => {
            setTexture(tex);
        });
    }, []);

    return (
        <>
            <pixiText
                text={`Etapa ${stage.number}: ${stage.name}`}
                x={window.innerWidth - 370}
                y={26}
                zIndex={1}
                style={{ fill: 0xffffff, fontSize: 40, fontFamily: 'Jersey 10' }}
                resolution={3}
            />
            { texture && (
                <pixiSprite 
                    texture={texture} 
                    x={window.innerWidth - 160} 
                    y={15}
                    zIndex={1}
                    width={64} 
                    height={64} 
                />
            ) }
        </>
    );
}