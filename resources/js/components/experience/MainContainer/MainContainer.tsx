import { Camera } from '@/components/camera/camera';
import { Combat } from '@/components/combat/combat';
import { DEFAULT_HERO_POSITION_X, DEFAULT_HERO_POSITION_Y, TILE_SIZE } from '@/components/constants/game-world';
import Enemy from '@/components/enemy/enemy';
import { Hero } from '@/components/Hero/hero';
import { StageGame } from '@/components/stages/stageGame';
import { IEnemy } from '@/types';
import { extend, useTick } from '@pixi/react';
import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

extend({ Container, Sprite });

interface IMainContainerProps {
    canvasSize: { width: number; height: number };
}

export const MainContainer = ({ canvasSize, children }: PropsWithChildren<IMainContainerProps>) => {
    const bgAsset = '/assets/bg-galaxy.png';
    const heroAsset = '/assets/hero.png';
    const enemyAsset = '/assets/generic-enemy.png';
    const position = useRef({ x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y });
    const [groupEnemies, setGroupEnemies] = useState<IEnemy[][]>([
        [
            {
                id: 1,
                name: 'Goblin',
                avatar: '/assets/generic-enemy.png',
                health: 100,
                basicAttack: 10,
                mapPosition: {
                    x: Math.floor(200),
                    y: Math.floor(200)
                },
                combatPosition: {
                    x: window.innerWidth * 0.75,
                    y: window.innerHeight * 0.3,
                }
            }
        ],
        [
            {
                id: 2,
                name: 'Goblin 2',
                avatar: '/assets/generic-enemy.png',
                health: 80,
                basicAttack: 8,
                mapPosition: {
                    x: Math.floor(300),
                    y: Math.floor(250)
                },
                combatPosition: {
                    x: window.innerWidth * 0.75,
                    y: window.innerHeight * 0.3,
                }
            }
        ],
        [
            {
                id: 3,
                name: 'Goblin 3',
                avatar: '/assets/generic-enemy.png',
                health: 80,
                basicAttack: 12,
                mapPosition: {
                    x: Math.floor(200),
                    y: Math.floor(300)
                },
                combatPosition: {
                    x: window.innerWidth * 0.75,
                    y: window.innerHeight * 0.3,
                }
            }
        ]
    ]);
    const [selectedEnemies, setSelectedEnemies] = useState<IEnemy[]>([]);
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [heroTexture, setHeroTexture] = useState<Texture | null>(null);
    const [enemyTexture, setEnemyTexture] = useState<Texture | null>(null);
    const [heroPosition, setHeroPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [inCombat, setInCombat] = useState(false);

    const updateHeroPosition = useCallback((x: number, y: number) => {
        setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) });
    }, []);

    useEffect(() => {
        let cancelled = false;

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

    const checkCollisionWithArea = useCallback((heroPos: { x: number; y: number }, enemyPos: { x: number; y: number }, threshold: number) => 
        {
            const dx = Math.abs(heroPos.x - (enemyPos.x / TILE_SIZE));
            const dy = Math.abs(heroPos.y - (enemyPos.y / TILE_SIZE));
            return dx <= threshold && dy <= threshold;
        },
        []
    );

    const finish = (value: boolean) => {
        if (value && selectedEnemies) {
            setGroupEnemies(groupEnemies => groupEnemies.filter(enemies => !enemies.some(enemy => selectedEnemies.some(selectedEnemy => selectedEnemy.id === enemy.id))));
            setSelectedEnemies([]);
        }
        setInCombat(!value);
    }

    const loseCombat = () => {
        setInCombat(false);
        setSelectedEnemies([]);
        updateHeroPosition(0, 0);
        position.current = { x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y };
    }

    const onSetSelectedEnemies = (e: IEnemy[]) => {
        setSelectedEnemies(e);
    }

    useEffect(() => {
        console.log(selectedEnemies);
    }, [JSON.stringify(selectedEnemies)]);

    useEffect(() => {
        groupEnemies.forEach(enemies => enemies.forEach(enemy => {
            console.log(enemy);
            if (checkCollisionWithArea(heroPosition, enemy.mapPosition, 1)) {
                setInCombat(true);
                setSelectedEnemies(enemies);
            }
        }));
    }, [heroPosition, groupEnemies]);

    return (
        <pixiContainer>
            {bgTexture && <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height} />}
            {children}
            <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
                <StageGame />
                {groupEnemies.map(enemies => enemies.map((enemy) => (
                    <Enemy key={enemy.id} enemy={enemy} />
                )))}
                {heroTexture && <Hero position={position} texture={heroTexture} onMove={updateHeroPosition} />}
            </Camera>
            {(inCombat && heroTexture && enemyTexture) && (
                <Combat 
                    hero={heroTexture} 
                    enemies={selectedEnemies} 
                    onSetSelectedEnemies={onSetSelectedEnemies} 
                    finish={finish} 
                    lose={loseCombat}
                />
            )}
        </pixiContainer>
    );
};
