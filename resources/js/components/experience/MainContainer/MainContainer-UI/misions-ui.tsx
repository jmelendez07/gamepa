import useIconMissionAnimation from "@/hooks/animations/useIconMissionAnimation";
import { Stage } from "@/types/planet";
import { useTick } from "@pixi/react";
import { Assets, Texture } from "pixi.js"
import { useEffect, useState } from "react"

const missionsAsset = 'https://res.cloudinary.com/dvibz13t8/image/upload/v1759276935/logo_misiones_lnllk0.png'

interface MissionsUIProps {
    stage: Stage;
}

export const MissionsUI = ({ stage }: MissionsUIProps) => {

    const [missionsTexture, setMissionsTexture] = useState<Texture>(Texture.WHITE);

    const { sprite, updateSprite, handleHoverStart, handleHoverEnd, hovered } = useIconMissionAnimation({
        texture: missionsTexture,
        frameWidth: 254,
        frameHeight: 183,
        totalFrames: 7,
        animationSpeed: 0.5
    });

    useEffect(() => {
        Assets.load<Texture>(missionsAsset).then((texture) => {
            setMissionsTexture(texture);
        });

        // Cleanup function to unload the texture when the component unmounts
        return () => {
            if (missionsTexture) {
                missionsTexture.destroy(true);
            }
        };
    }, []);

    useTick(() => {
        updateSprite();
    });

    return (
        <pixiContainer>
            {sprite && (
                <pixiSprite 
                    texture={sprite.texture} 
                    x={20} 
                    y={window.innerHeight / 4} 
                    width={130} 
                    height={64}
                    interactive={true}
                    onPointerOver={handleHoverStart}
                    onPointerOut={handleHoverEnd}
                />
            )}

            {hovered && (
                <>
                    <pixiText
                        text="Misiones"
                        x={20}
                        y={window.innerHeight / 4 + 70}
                        style={{ fontSize: 24, fill: 'white', fontFamily: 'Jersey 10' }}
                    />

                    {stage.missions.map((mission, index) => (
                        <pixiText
                            key={index}
                            text={`${mission.description} (0/${mission.number_actions})`}
                            x={20}
                            y={window.innerHeight / 4 + 100 + index * 30}
                            style={{ fontSize: 18, fill: 'white', fontFamily: 'Jersey 10' }}
                        />
                    ))}
                </>
            )}
        </pixiContainer>
    )
}