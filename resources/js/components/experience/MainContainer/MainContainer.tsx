import { Camera } from '@/components/camera/camera';
import { Combat } from '@/components/combat/combat';
import { DEFAULT_HERO_POSITION_X, DEFAULT_HERO_POSITION_Y, TILE_SIZE } from '@/components/constants/game-world';
import Enemy from '@/components/enemy/enemy';
import { Hero } from '@/components/Hero/hero';
import { StageGame } from '@/components/stages/stageGame';
import Card from '@/types/card';
import IEnemy from '@/types/enemy';
import IHero from '@/types/hero';
import { extend } from '@pixi/react';
import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

extend({ Container, Sprite });

interface IMainContainerProps {
    canvasSize: { width: number; height: number };
    defaultEnemies: IEnemy[];
    cards: Card[];
    hero: IHero;
}

const bgAsset = '/assets/bg-galaxy.png';

export const MainContainer = ({ canvasSize, defaultEnemies, cards, hero, children }: PropsWithChildren<IMainContainerProps>) => {
    const position = useRef({ x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y });
    const [selectedEnemies, setSelectedEnemies] = useState<IEnemy[]>([]);
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [heroTexture, setHeroTexture] = useState<Texture | null>(null);
    const [heroPosition, setHeroPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [inCombat, setInCombat] = useState(false);
    const [enemies, setEnemies] = useState<IEnemy[]>(defaultEnemies);

    const updateHeroPosition = useCallback((x: number, y: number) => {
        setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) });
    }, []);

    const generateRandomPosition = useCallback(() => ({
        x: Math.floor(Math.random() * (750 - 20 + 1)) + 20,
        y: Math.floor(Math.random() * (470 - 30 + 1)) + 30
    }), []);

    const generateRandomMapPosition = useCallback((index: number) => {
        const baseX = window.innerWidth * 0.7;
        const baseY = window.innerHeight * 0.4;
        const maxY = window.innerHeight * 0.5;
        
        const spacing = 190;
        const enemiesPerRow = 3;
        
        const row = Math.floor(index / enemiesPerRow);
        const col = index % enemiesPerRow;

        const randomOffsetX = (Math.random() - 0.5) * 50; // ±25px de variación horizontal
        const randomOffsetY = (Math.random() - 0.5) * 70; // ±35px de variación vertical

        const calculatedY = baseY + (row * spacing) + randomOffsetY;

        return {
            x: baseX + (col * spacing) + randomOffsetX,
            y: Math.min(calculatedY, maxY)
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(bgAsset)
            .then((tex) => {
                if (!cancelled) {
                    setBgTexture(tex);
                }
            });

        Assets.load<Texture>(hero.spritesheet)
            .then((tex) => {
                if (!cancelled) {
                    setHeroTexture(tex);
                }
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
            setEnemies(enemies => enemies.filter(enemy => !selectedEnemies.some(selectedEnemy => selectedEnemy.id === enemy.id)));
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
        enemies.forEach(enemy => {
            if (enemy.map_position && checkCollisionWithArea(heroPosition, enemy.map_position, 1)) {
                setInCombat(true);
                
                const nearbyEnemies = enemies.filter(nearbyEnemy => {
                    if (!nearbyEnemy.map_position || !enemy.map_position || nearbyEnemy.id === enemy.id) return false;
                    
                    const distance = Math.sqrt(
                        Math.pow(enemy.map_position.x - nearbyEnemy.map_position.x, 2) + 
                        Math.pow(enemy.map_position.y - nearbyEnemy.map_position.y, 2)
                    );
                    
                    return distance <= 100;
                });
                
                const enemiesInCombat = [enemy, ...nearbyEnemies];
                setSelectedEnemies(enemiesInCombat);
            }
        });
    }, [heroPosition, enemies.length]);

    useEffect(() => {
        if (enemies.length > 0) {
            setEnemies(enemies => enemies.map((enemy, index) => ({
                ...enemy,
                map_position: enemy.map_position ? enemy.map_position : generateRandomPosition(),
                combat_position: enemy.combat_position ? enemy.combat_position : generateRandomMapPosition(index)
            })));
        }
    }, [enemies.length, generateRandomPosition]);

    return (
        <pixiContainer>
            {bgTexture && <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height} />}
            {children}
            <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
                <StageGame />
                {enemies.map(enemy => (
                    <Enemy key={enemy.id} enemy={enemy} x={enemy.map_position?.x || 0} y={enemy.map_position?.y || 0} />
                ))}
                {heroTexture && <Hero position={position} texture={heroTexture} onMove={updateHeroPosition} />}
            </Camera>
            {(inCombat && heroTexture) && (
                <Combat 
                    hero={hero}
                    heroTexture={heroTexture}
                    cards={cards}
                    enemies={selectedEnemies} 
                    onSetSelectedEnemies={onSetSelectedEnemies} 
                    finish={finish} 
                    lose={loseCombat}
                />
            )}
        </pixiContainer>
    );
};