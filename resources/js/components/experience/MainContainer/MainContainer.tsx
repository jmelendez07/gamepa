import { Camera } from '@/components/camera/camera';
import { TILE_SIZE } from '@/components/constants/game-world';
import Enemy from '@/components/enemy/enemy';
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
    const enemyAsset = '/assets/generic-enemy.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [heroTexture, setHeroTexture] = useState<Texture | null>(null);
    const [enemyTexture, setEnemyTexture] = useState<Texture | null>(null);
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
                return Assets.load<Texture>(alternativePath);
            })
            .then((tex) => {
                if (!cancelled && tex) {
                    setHeroTexture(tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load hero texture from alternative path:', err);
            });

        Assets.load<Texture>(enemyAsset)
            .then((tex) => {
                if (!cancelled) {
                    setEnemyTexture(tex);
                    console.log('Enemy texture loaded successfully:', tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load enemy texture:', err);
            });

        return () => {
            cancelled = true;
        };
    }, []);

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

                {enemyTexture && <Enemy texture={enemyTexture} position={{ x: 100, y: 100 }} />}

                {/* Renderizar el héroe */}
                {heroTexture && <Hero texture={heroTexture} onMove={updateHeroPosition} />}
            </Camera>
        </pixiContainer>
    );
};
