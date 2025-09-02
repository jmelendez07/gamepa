import { Camera } from '@/components/camera/camera';
import { Combat } from '@/components/combat/combat';
import { TILE_SIZE } from '@/components/constants/game-world';
import Enemy from '@/components/enemy/enemy';
import { Hero } from '@/components/Hero/hero';
import { StageGame } from '@/components/stages/stageGame';
import { extend, useTick } from '@pixi/react';
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
    const [enemyPosition, setEnemyPosition] = useState<{ x: number; y: number }>({
        x: Math.floor(200 / TILE_SIZE),
        y: Math.floor(200 / TILE_SIZE),
    });

    const [inCombat, setInCombat] = useState(false);

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

    const checkCollisionWithArea = useCallback(
        (heroPos: { x: number; y: number }, enemyPos: { x: number; y: number }, threshold: number) => {
            const dx = Math.abs(heroPos.x - enemyPos.x);
            const dy = Math.abs(heroPos.y - enemyPos.y);
            return dx <= threshold && dy <= threshold;
        },
        []
    );

    useTick((ticker) => {
        const delta = ticker.deltaTime;

        // Ahora ambas posiciones están en el mismo sistema (tiles)
        if (checkCollisionWithArea(heroPosition, enemyPosition, 1)) {
            setInCombat(true);
        } else {
            setInCombat(false);
        }
    });

    return (
        <pixiContainer>
            {bgTexture && <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height} />}
            {children}
            <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
                <StageGame />
                {enemyTexture && (
                    <Enemy
                        texture={enemyTexture}
                        position={{
                            x: enemyPosition.x * TILE_SIZE,
                            y: enemyPosition.y * TILE_SIZE
                        }}
                    />
                )}
                {heroTexture && <Hero texture={heroTexture} onMove={updateHeroPosition} />}
            </Camera>
            {inCombat && heroTexture && enemyTexture && (
                <Combat hero={heroTexture} />
            )}
        </pixiContainer>
    );
};
