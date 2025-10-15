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
    const [xPosition, setXPosition] = useState(0);

    const { sprite, updateSprite, handleHoverStart, handleHoverEnd, hovered } = useIconMissionAnimation({
        texture: missionsTexture,
        frameWidth: 254,
        frameHeight: 183,
        totalFrames: 7,
        animationSpeed: 1
    });

    useEffect(() => {
        Assets.load<Texture>(missionsAsset).then((texture) => {
            setMissionsTexture(texture);
        });

        return () => {
            if (missionsTexture) {
                missionsTexture.destroy(true);
            }
        };
    }, []);

    useTick((ticker) => {
        updateSprite();

        if (hovered && xPosition > -35) {
            setXPosition(prev => Math.max(prev - ticker.deltaTime * 8, -35));
        } else if (!hovered && xPosition < 0) {
            setXPosition(prev => Math.min(prev + ticker.deltaTime * 8, 0));
        }
    });

    return (
        <pixiContainer zIndex={1}>
            {sprite && (
                <pixiSprite 
                    texture={sprite.texture} 
                    x={45 + xPosition} 
                    y={160} 
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
                        y={230}
                        style={{ fontSize: 50, fill: 'white', fontFamily: 'Jersey 10', stroke: '#000000' }}
                        resolution={2}
                    />

                    {stage.missions.map((mission, index) => (
                        <pixiText
                            key={index}
                            text={`${mission.description} (0/${mission.number_actions})`}
                            x={20}
                            y={280 + (index * 40)}
                            style={{ fontSize: 25, fill: 'white', fontFamily: 'Jersey 10', stroke: '#000000' }}
                            resolution={2}
                        />
                    ))}
                </>
            )}
        </pixiContainer>
    )
}