import { Camera } from '@/components/camera/camera';
import { Combat } from '@/components/combat/combat';
import { DEFAULT_HERO_POSITION_X, DEFAULT_HERO_POSITION_Y, TILE_SIZE } from '@/components/constants/game-world';
import Enemy from '@/components/enemy/enemy';
import GameplayMenu from '@/components/gameplay/menu';
import { Hero } from '@/components/Hero/hero';
import { StageGame } from '@/components/stages/stageGame';
import { UserProfile, type SharedData } from '@/types';
import Card from '@/types/card';
import IEnemy from '@/types/enemy';
import IHero from '@/types/hero';
import { Stage } from '@/types/planet';
import { router, usePage } from '@inertiajs/react';
import type { Page as InertiaPage } from '@inertiajs/core'; // was Page as InertiaPageProps
import { extend } from '@pixi/react';
import { Assets, Container, Sprite, TextStyle, Texture } from 'pixi.js';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { usePortalInteraction } from '@/components/Hero/usePortalInteraction';
import { PortalUI } from '@/components/stages/portalUI';

extend({ Container, Sprite });

interface IMainContainerProps {
    canvasSize: { width: number; height: number };
    defaultEnemies: IEnemy[];
    heroes: IHero[];
    cards: Card[];
    stage: Stage;
}

const bgAsset = '/assets/bg-galaxy.png';
const portalAsset = '/assets/portal.png';

const levelStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 50,
    fontWeight: '200',
    fill: '#ffffff',
    align: 'center',
});

const xpStyle = new TextStyle({
    fontFamily: 'Jersey 10, Arial, sans-serif',
    fontSize: 50,
    fontWeight: '200',
    fill: '#ffffff',
    align: 'center',
});

export const MainContainer = ({ canvasSize, defaultEnemies, cards, heroes, stage, children }: PropsWithChildren<IMainContainerProps>) => {
    const position = useRef({ x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y });
    const [selectedEnemies, setSelectedEnemies] = useState<IEnemy[]>([]);
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [portalTexture, setPortalTexture] = useState<Texture | null>(null);
    const [heroTextures, setHeroTextures] = useState<Texture[]>([]);
    const [heroPosition, setHeroPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [inCombat, setInCombat] = useState(false);
    const [enemies, setEnemies] = useState<IEnemy[]>(defaultEnemies);
    const [totalXpGained, setTotalXpGained] = useState(0);
    const [teamHeroes, setTeamHeroes] = useState<IHero[]>(heroes.length > 0 ? heroes : []);
    const [heroOnTheField, setHeroOnTheField] = useState<IHero>(teamHeroes[1] ?? null);

    // Agregar estado local para el perfil del usuario
    const { auth } = usePage<SharedData>().props;

    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(auth.user?.profile ?? undefined);
    const [currentUserXp, setCurrentUserXp] = useState<number>(auth.user?.profile?.total_xp ?? 0);

    const portalPosition = { x: 480, y: 192 };

    const { nearPortal, showPortalGraphic, nextStage } = usePortalInteraction({
        heroPosition: {
            x: position.current.x,
            y: position.current.y,
        },
        portalPosition,
        enemiesCount: enemies.length,
        inCombat,
    });

    const updateHeroPosition = useCallback((x: number, y: number) => {
        setHeroPosition({ x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) });
    }, []);

    const generateRandomPosition = useCallback(
        (index: number) => ({
            // x: Math.floor(Math.random() * (750 - 20 + 1)) + 20,
            // y: Math.floor(Math.random() * (470 - 30 + 1)) + 30,
            x: 200 + index * 200,
            y: 200
        }),
        [],
    );

    const generateRandomMapPosition = useCallback((index: number) => {
        // Área horizontal: mitad de la pantalla (centrada)
        const baseX = window.innerWidth * 0.5;

        // Área vertical: segundo cuadrante (1/3 a 2/3 de la altura)
        const minY = window.innerHeight * (1 / 3); // Inicio del segundo cuadrante
        const maxY = window.innerHeight * (2 / 3); // Final del segundo cuadrante
        const baseY = minY + (maxY - minY) * 0.3; // Posición base dentro del cuadrante

        const spacing = 120; // Reducido para ajustarse al área más pequeña
        const enemiesPerRow = 3;

        const row = Math.floor(index / enemiesPerRow);
        const col = index % enemiesPerRow;

        const randomOffsetX = (Math.random() - 0.5) * 30;
        const randomOffsetY = (Math.random() - 0.5) * 40;

        const calculatedY = baseY + row * spacing + randomOffsetY;

        return {
            x: Math.max(150, Math.min(baseX + col * spacing + randomOffsetX, window.innerWidth - 150)),
            y: Math.max(minY, Math.min(calculatedY, maxY - 50)), // Mantener dentro del segundo cuadrante
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(bgAsset).then((tex) => {
            if (!cancelled) {
                setBgTexture(tex);
            }
        });

        // Cargar todas las texturas de héroes
        const heroTexturePromises = heroes.map(hero => Assets.load<Texture>(hero.spritesheet));
        
        Promise.all(heroTexturePromises).then((textures) => {
            if (!cancelled) {
                setHeroTextures(textures);
            }
        });

        Assets.load<Texture>(portalAsset).then((tex) => {
            if (!cancelled) {
                setPortalTexture(tex);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const checkCollisionWithArea = useCallback((heroPos: { x: number; y: number }, enemyPos: { x: number; y: number }, threshold: number) => {
        const dx = Math.abs(heroPos.x - enemyPos.x / TILE_SIZE);
        const dy = Math.abs(heroPos.y - enemyPos.y / TILE_SIZE);
        return dx <= threshold && dy <= threshold;
    }, []);

    const finish = (value: boolean, xpFromCombat: number) => {
        if (value && selectedEnemies) {
            setEnemies((enemies) => enemies.filter((enemy) => !selectedEnemies.some((selectedEnemy) => selectedEnemy.id === enemy.id)));
            setSelectedEnemies([]);
        }
        const newTotalXp = totalXpGained + xpFromCombat;
        setTotalXpGained(newTotalXp);
        updateUserProfileLevel(newTotalXp);
        console.log('Total XP Gained:', newTotalXp);
        setInCombat(!value);
    };

    const loseCombat = () => {
        setInCombat(false);
        setSelectedEnemies([]);
        updateHeroPosition(0, 0);
        position.current = { x: DEFAULT_HERO_POSITION_X, y: DEFAULT_HERO_POSITION_Y };
    };

    const onSetSelectedEnemies = (e: IEnemy[]) => {
        setSelectedEnemies(e);
    };

    const updateUserProfileLevel = async (newTotalXp: number) => {
        try {
            // Actualizar estado local inmediatamente para la UI
            const newTotalUserXp = (currentUserXp ?? 0) + newTotalXp;
            setCurrentUserXp(newTotalUserXp);

            await router.post(
                '/profile/update-xp',
                { total_xp: newTotalXp },
                {
                    onSuccess: (page: InertiaPage) => {
                        const updatedUser = page.props.auth.user;
                        if (updatedUser?.profile) {
                            setUserProfile(updatedUser.profile);
                            setCurrentUserXp(updatedUser.profile.total_xp);
                        }
                    },
                    onError: (errors) => {
                        setCurrentUserXp(currentUserXp);
                    },
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        } catch (error) {
            console.error('Error updating user profile level:', error);
            setCurrentUserXp(currentUserXp);
        }
    };

    // Función para obtener el nivel actual basado en XP
    const getCurrentLevel = useCallback(() => {
        return userProfile?.level || auth.user?.profile?.level || null;
    }, [userProfile, auth.user]);

    const checkCombatArea = useCallback(() => {
        enemies.forEach((enemy) => {
            if (enemy.map_position && checkCollisionWithArea(heroPosition, enemy.map_position, 1)) {
                setInCombat(true);

                const nearbyEnemies = enemies.filter((nearbyEnemy) => {
                    if (!nearbyEnemy.map_position || !enemy.map_position || nearbyEnemy.id === enemy.id) return false;

                    const distance = Math.sqrt(
                        Math.pow(enemy.map_position.x - nearbyEnemy.map_position.x, 2) +
                            Math.pow(enemy.map_position.y - nearbyEnemy.map_position.y, 2),
                    );

                    return distance <= 100;
                });

                const enemiesInCombat = [enemy, ...nearbyEnemies];
                setSelectedEnemies(enemiesInCombat);
            }
        });
    }, [heroPosition, enemies]);

    useEffect(() => {
        if (enemies.length > 0) {
            setEnemies((enemies) =>
                enemies.map((enemy, index) => ({
                    ...enemy,
                    map_position: enemy.map_position ? enemy.map_position : generateRandomPosition(index),
                    combat_position: enemy.combat_position ? enemy.combat_position : generateRandomMapPosition(index),
                })),
            );
        }
    }, [enemies.length, generateRandomPosition]);

    useEffect(() => {
        checkCombatArea();
    }, [checkCombatArea]);

    // Obtener la textura del héroe actual
    const currentHeroTexture = heroOnTheField && heroTextures.length > 0 
        ? heroTextures[teamHeroes.findIndex(hero => hero.id === heroOnTheField.id)] 
        : null;


    const changeHeroOnTheField = useCallback(
        (heroIndex: number) => {
            // Solo cambiar si no está en combate y el índice es válido
            if (!inCombat && teamHeroes[heroIndex]) {
                setHeroOnTheField(teamHeroes[heroIndex]);
            }
        },
        [inCombat, teamHeroes],
    );

    return (
        <pixiContainer>
            <GameplayMenu canvasSize={canvasSize} />
            {bgTexture && <pixiSprite texture={bgTexture} width={canvasSize.width} height={canvasSize.height} />}
            {children}
            <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
                <StageGame stage={stage} />
                {portalTexture && enemies.length <= 0 && (
                    <pixiSprite texture={portalTexture} x={portalPosition.x} y={portalPosition.y} width={45} height={45} />
                )}
                {enemies.map((enemy) => (
                    <Enemy key={enemy.id} enemy={enemy} x={enemy.map_position?.x || 0} y={enemy.map_position?.y || 0} />
                ))}
                {currentHeroTexture && <Hero position={position} texture={currentHeroTexture} onMove={updateHeroPosition} heroAtributes={heroOnTheField} onHeroChange={changeHeroOnTheField} />}
                {nearPortal && !inCombat && enemies.length <= 0 && (
                    <pixiText
                        text="Presiona F para continuar"
                        x={portalPosition.x - 60}
                        y={portalPosition.y - 30}
                        style={{
                            fontSize: 20,
                            fill: 0xffffff,
                            fontFamily: 'Jersey 10, Arial, sans-serif',
                            stroke: 0x000000,
                        }}
                        resolution={3}
                    />
                )}
            </Camera>
            {inCombat && currentHeroTexture && (
                <Combat
                    team={teamHeroes}
                    teamTextures={heroTextures}
                    cards={cards}
                    enemies={selectedEnemies}
                    onSetSelectedEnemies={onSetSelectedEnemies}
                    finish={finish}
                    lose={loseCombat}
                />
            )}
            {!inCombat && (
                <>
                    <pixiText
                        text={'Nivel: ' + (getCurrentLevel()?.order || 1)}
                        x={20}
                        y={10}
                        zIndex={100}
                        style={levelStyle}
                    />
                    <pixiText
                        text={'XP: ' + currentUserXp}
                        x={180}
                        y={10}
                        zIndex={100}
                        style={xpStyle}
                    />
                </>
            )}
            <PortalUI 
                canvasSize={canvasSize} 
                isVisible={showPortalGraphic && enemies.length <= 0}
                title="¡Portal Activado!"
                subtitle="Preparándote para el siguiente nivel..." 
                nextStage={nextStage}
            />
        </pixiContainer>
    );
};
