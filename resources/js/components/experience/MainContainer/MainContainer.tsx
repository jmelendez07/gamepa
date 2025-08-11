import { Camera } from '@/components/camera/camera';
import { TILE_SIZE } from '@/components/constants/game-world';
import { Hero } from '@/components/Hero/hero';
import { StageGame } from '@/components/stages/stageGame';
import { extend } from '@pixi/react';
import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

extend({ Container, Sprite });

interface IMainContainerProps {
    canvasSize: { width: number; height: number };
}

export const MainContainer = ({ canvasSize, children }: PropsWithChildren<IMainContainerProps>) => {
    const bgAsset = '/assets/bg-galaxy.png';
    const heroAsset = '/assets/hero.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [heroTexture, setHeroTexture] = useState<Texture | null>(null);
    const [heroPosition, setHeroPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const updateHeroPosition = useCallback((x: number, y: number) => {
        setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) });
    }, []);

    useEffect(() => {
        let cancelled = false;

        // Cargar background
        Assets.load<Texture>(bgAsset)
            .then((tex) => {
                if (!cancelled) {
                    setBgTexture(tex);
                    console.log('Background texture loaded successfully');
                }
            })
            .catch((err) => {
                console.error('Failed to load background texture', err);
            });

        // Cargar héroe con más debugging
        console.log('Attempting to load hero from:', heroAsset);
        Assets.load<Texture>(heroAsset)
            .then((tex) => {
                if (!cancelled) {
                    setHeroTexture(tex);
                    console.log('Hero texture loaded successfully:', tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load hero texture from:', heroAsset, err);

                // Intentar con un path alternativo
                const alternativePath = './assets/hero.png';
                console.log('Trying alternative path:', alternativePath);
                return Assets.load<Texture>(alternativePath);
            })
            .then((tex) => {
                if (!cancelled && tex) {
                    setHeroTexture(tex);
                    console.log('Hero texture loaded from alternative path:', tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load hero texture from alternative path:', err);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    console.log('Current hero texture state:', heroTexture);

    return (
        <pixiContainer>
            {bgTexture && <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height} />}
            {children}
            <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
                <StageGame />
                {/* Debug: Mostrar un sprite de prueba si no hay textura */}
                {!heroTexture && (
                    <pixiSprite
                        texture={Texture.WHITE}
                        x={320}
                        y={480}
                        width={32}
                        height={32}
                        tint={0xff0000} // Rojo para debug
                    />
                )}

                {/* Renderizar el héroe */}
                {heroTexture && <Hero texture={heroTexture} onMove={updateHeroPosition} />}
            </Camera>
        </pixiContainer>
    );
};
