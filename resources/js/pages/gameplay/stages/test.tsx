import { Combat } from "@/components/combat/combat";
import useEnemyAnimation from "@/components/enemy/useEnemyAnimation";
import { KeyMap } from "@/components/types/key";
import { Actions } from "@/enums/hero-actions";
import { Directions } from "@/enums/hero-directions";
import { ALLOWED_KEYS, getPolygonCentroid, getRow, HERO_FRAME_SIZE, HERO_MOVING_SPEED, HERO_MOVING_SPEED_RUNNING, isPointInPolygon, MAP_SCALE } from "@/lib/utils";
import { TeamProvider, useTeam } from "@/Providers/TeamProvider";
import { SharedData, UserProfile } from "@/types";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";
import { Stage as IStage } from "@/types/planet";
import { router, usePage } from "@inertiajs/react";
import { Application, extend, useTick } from "@pixi/react";
import type { Page as InertiaPage } from '@inertiajs/core';
import { Assets, Container, Sprite, Texture, Ticker, Graphics, Rectangle, Text } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "@/types/card";

extend({ Sprite, Container, Graphics, Text});

function Experience({ stage, initEnemies, cards }: { stage: IStage, initEnemies: Enemy[], cards: Card[] }) {
    const { currentHero, teamHeroes, updateHeroHealth, textures } = useTeam();
    const { auth } = usePage<SharedData>().props;
    const [stageTexture, setStageTexture] = useState<Texture | null>(null);
    const [keys, setKeys] = useState<KeyMap>({});
    const spriteRef = useRef<Sprite>(null);
    const cameraRef = useRef<Container>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runTimeLeft, setRunTimeLeft] = useState(5);
    const [cooldownLeft, setCooldownLeft] = useState(0);
    const [direction, setDirection] = useState<Directions>(Directions.DOWN);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [nearbyEnemy, setNearbyEnemy] = useState<Enemy | null>(null);
    const [combatEnemy, setCombatEnemy] = useState<Enemy | null>(null);
    const [inCombat, setInCombat] = useState<boolean>(false);
    const [totalXpGained, setTotalXpGained] = useState(0);
    const [currentUserXp, setCurrentUserXp] = useState<number>(auth.user?.profile?.total_xp ?? 0);
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(auth.user?.profile ?? undefined);

    const polygonPoints: [number, number][] = stage.points
        .map(p => [p.x, p.y] as [number, number])
        .filter(arr => arr.length === 2 && arr.every(Number.isFinite));

    const centroid = getPolygonCentroid(polygonPoints);

    const generateRandomPosition = useCallback(
        (index: number) => ({
            x: 2500 + (index * 200),
            y: 1000 + (index * 1000),
        }),
        [],
    );

    const generateRandomCombatPosition = useCallback((index: number) => {
        const baseX = window.innerWidth * 0.5;
        const minY = window.innerHeight * (1 / 3);
        const maxY = window.innerHeight * (2 / 3);
        const baseY = minY + (maxY - minY) * 0.3;

        const spacing = 120;
        const enemiesPerRow = 3;

        const row = Math.floor(index / enemiesPerRow);
        const col = index % enemiesPerRow;

        const randomOffsetX = (Math.random() - 0.5) * 30;
        const randomOffsetY = (Math.random() - 0.5) * 40;

        const calculatedY = baseY + row * spacing + randomOffsetY;

        return {
            x: Math.max(150, Math.min(baseX + col * spacing + randomOffsetX, window.innerWidth - 150)),
            y: Math.max(minY, Math.min(calculatedY, maxY - 50)),
        };
    }, []);
    
    const keysLoop = useCallback((delta: number) => {
        const sprite = spriteRef.current;
        const camera = cameraRef.current;
        if (!sprite || !camera) return;

        const controlPressed = keys[ALLOWED_KEYS[4]];
        const canRun = runTimeLeft > 0 && cooldownLeft <= 0;
        const isTryingToRun = controlPressed && canRun;

        const speed = isTryingToRun ? 10 : 5;

        if (isTryingToRun) {
            setIsRunning(true);
            setRunTimeLeft((prev) => Math.max(0, prev - delta / 60));
        } else {
            if (isRunning) {
                setIsRunning(false);
                if (runTimeLeft <= 0) {
                    setCooldownLeft(5);
                }
            }
        }

        if (cooldownLeft > 0 && !isTryingToRun) {
            setCooldownLeft((prev) => {
                if (prev > 0) {
                    const next = Math.max(0, prev - delta / 60);
                    if (next === 0) {
                        setRunTimeLeft(5);
                    }
                    return next;
                }
                return prev;
            });
        }

        let newX = sprite.x;
        let newY = sprite.y;
        let newDirection : Directions | null = null;

        if (keys[ALLOWED_KEYS[0]]) { // W
            newY -= speed;
            newDirection = Directions.UP;
        }

        if (keys[ALLOWED_KEYS[1]]) { // A
            newX -= speed;
            newDirection = Directions.LEFT;
        }

        if (keys[ALLOWED_KEYS[2]]) { // S
            newY += speed;
            newDirection = Directions.DOWN;
        }

        if (keys[ALLOWED_KEYS[3]]) { // D
            newX += speed;
            newDirection = Directions.RIGHT;
        }

        if (newDirection) {
            setDirection(newDirection);
        }

        const spriteLeftX = (newX - sprite.width / 2) / MAP_SCALE;
        const spriteRightX = (newX + sprite.width / 2) / MAP_SCALE;
        const spriteTopY = (newY - sprite.height / 2) / MAP_SCALE;
        const spriteBottomY = (newY + sprite.height / 2) / MAP_SCALE;

        const allInside = (
            isPointInPolygon(spriteLeftX, newY / MAP_SCALE, polygonPoints) &&
            isPointInPolygon(spriteRightX, newY / MAP_SCALE, polygonPoints) &&
            isPointInPolygon(newX / MAP_SCALE, spriteTopY, polygonPoints) &&
            isPointInPolygon(newX / MAP_SCALE, spriteBottomY, polygonPoints)
        );

        const heroSize = HERO_FRAME_SIZE * 2;
        const enemySize = 64 * 2;
        const collisionRadius = (heroSize + enemySize) / 4;
        const interactionRadius = collisionRadius * 1.5;

        let closestEnemy: Enemy | null = null;
        let minDistance = interactionRadius;

        enemies.forEach(enemy => {
            if (!enemy.map_position) return;

            const dx = newX - enemy.map_position.x;
            const dy = newY - enemy.map_position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                closestEnemy = enemy;
            }
        });

        setNearbyEnemy(closestEnemy);

        const collidesWithEnemy = enemies.some(enemy => {
            if (!enemy.map_position) return false;

            const dx = newX - enemy.map_position.x;
            const dy = newY - enemy.map_position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance < collisionRadius;
        });

        if (allInside && !collidesWithEnemy) {
            sprite.x = newX;
            sprite.y = newY;
        }

        camera.x = (window.innerWidth / 2) - sprite.x;
        camera.y = (window.innerHeight / 2) - sprite.y;

    }, [keys, polygonPoints, isRunning, runTimeLeft, cooldownLeft, enemies]);

    const updateUserProfileLevel = async (newTotalXp: number) => {
        try {
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

    const finish = (value: boolean, xpFromCombat: number) => {
        if (value && combatEnemy) {
            setEnemies((enemies) => enemies.filter((enemy) => combatEnemy.id === enemy.id));
            setCombatEnemy(null);
        }

        const newTotalXp = totalXpGained + xpFromCombat;
        setTotalXpGained(newTotalXp);
        updateUserProfileLevel(newTotalXp);
        setInCombat(false);
    };

    const lose = () => {
        teamHeroes.forEach(hero => {
            const newHealth = Math.floor(hero.health * 0.5);
            updateHeroHealth(hero.id, newHealth);
        });

        setCombatEnemy(null);
        setInCombat(false);
    };

    const onSetSelectedEnemies = (e: Enemy[]) => {
        if (e.length === 0) return;

        setCombatEnemy(e[0]);
    };

    useEffect(() => {
        Assets.load(stage.image_url)
            .then((result) => {
                setStageTexture(result);
            });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (inCombat) {
                handleBlur();
                return;
            }

            if (event.code === ALLOWED_KEYS[4]) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (event.code === 'KeyF' && nearbyEnemy) {
                setInCombat(true);
                setCombatEnemy(nearbyEnemy);
                setNearbyEnemy(null);
            }

            if (ALLOWED_KEYS.includes(event.code)) {
                setKeys((prevKeys) => ({ ...prevKeys, [event.code]: true }));
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (inCombat) {
                handleBlur();
                return;
            }

            if (ALLOWED_KEYS.includes(event.code)) {
                setKeys((prevKeys) => ({ ...prevKeys, [event.code]: false }));
            }
        };

        const handleBlur = () => {
            setKeys({});
        };

        if (initEnemies.length > 0) {
            setEnemies(initEnemies.map((enemy, index) => ({
                ...enemy,
                map_position: generateRandomPosition(index),
                combat_position: generateRandomCombatPosition(index)
            })));
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, [nearbyEnemy, inCombat]);

    useTick((ticker: Ticker) => keysLoop(ticker.deltaTime));

    return ((inCombat && combatEnemy) 
    ? (
        <Combat
            
            team={teamHeroes}
            teamTextures={textures}
            cards={cards}
            enemies={[combatEnemy]}
            currentStage={stage}
            currentHero={currentHero}
            onSetSelectedEnemies={onSetSelectedEnemies}
            finish={finish}
            lose={lose}
        />
    ) : (
        <pixiContainer ref={cameraRef} sortableChildren={true}>
            <HeroUI 
                spriteRef={spriteRef} 
                isMoving={Object.values(keys).some(v => v)}
                isRunning={isRunning}
                direction={direction}
                x={centroid.x} y={centroid.y} 
            />
            { enemies.map(enemy => (
                <EnemyUI 
                    key={enemy.id}
                    enemy={enemy}
                    showInteraction={nearbyEnemy?.id === enemy.id}
                />
            )) }
            { stageTexture && (
                <pixiSprite 
                    texture={stageTexture}
                    x={0}
                    y={0}
                    zIndex={0}
                    scale={MAP_SCALE}
                />
            ) }
            <pixiGraphics
                draw={g => {
                    g.clear();
                    g.setStrokeStyle({
                        width: 2,
                        color: 0xa855f7,
                        alpha: 1
                    });
                    g.poly(polygonPoints.flat(), true);
                    g.fill({ color: 0xa855f7, alpha: 0.15 });
                }}
                scale={MAP_SCALE}
                zIndex={2}
            />
        </pixiContainer>
    ));
}

interface HeroUIProps {
    x: number;
    y: number;
    isMoving: boolean;
    isRunning: boolean;
    direction: Directions;
    spriteRef: React.RefObject<Sprite | null>;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    alpha: number;
    offsetX: number;
    offsetY: number;
}

function HeroUI({ x, y, direction, isMoving, isRunning, spriteRef }: HeroUIProps) {
    const { currentHero } = useTeam();
    const [sprite, setSprite] = useState<Sprite | null>(null);
    const elapsedTimeRef = useRef(0);
    const frameRef = useRef(1);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);

    const updateSprite = useCallback(() => {
        if (!currentHero.texture) return;

        const row = getRow(direction);
        const tiles = currentHero.hero_animations.find(anim => anim.action === Actions.WALK)?.totalTilesFrames || 2;
        let column = 0;

        if (isMoving) {
            elapsedTimeRef.current += isRunning ? HERO_MOVING_SPEED_RUNNING : HERO_MOVING_SPEED;
            if (elapsedTimeRef.current >= 1) {
                elapsedTimeRef.current = 0;
                frameRef.current = (frameRef.current + 1) % tiles;
                
                const currentSprite = spriteRef.current;
                const currentX = currentSprite ? currentSprite.x : x;
                const currentY = currentSprite ? currentSprite.y : y;
                
                const newParticles: Particle[] = [];
                for (let i = 0; i < 5; i++) {
                    newParticles.push({
                        id: particleIdRef.current++,
                        x: currentX,
                        y: currentY + 30,
                        alpha: 1,
                        offsetX: (Math.random() - 0.5) * 40,
                        offsetY: (Math.random() - 0.5) * 20
                    });
                }
                setParticles(prev => [...prev, ...newParticles]);
            }

            column = frameRef.current;
        }

        setParticles(prev => 
            prev
                .map(p => ({
                    ...p,
                    y: p.y - 2,
                    alpha: p.alpha - 0.03
                }))
                .filter(p => p.alpha > 0)
        );

        const frame = new Rectangle(column * HERO_FRAME_SIZE, row * HERO_FRAME_SIZE, HERO_FRAME_SIZE, HERO_FRAME_SIZE);
        const texture = new Texture({
            source: currentHero.texture.source,
            frame: frame,
        });
        const newSprite = new Sprite(texture);
        newSprite.width = HERO_FRAME_SIZE;
        newSprite.height = HERO_FRAME_SIZE;

        setSprite(newSprite);
    }, [currentHero, direction, isMoving, isRunning, spriteRef, x, y]);

    useTick(updateSprite);

    return (sprite && (
        <>
            {particles.map(particle => (
                <pixiGraphics
                    key={particle.id}
                    x={particle.x + particle.offsetX}
                    y={particle.y + particle.offsetY}
                    alpha={particle.alpha}
                    zIndex={0}
                    draw={g => {
                        g.clear();
                        g.circle(0, 0, 3);
                        g.fill({ color: 0x8B4513 });
                    }}
                />
            ))}
            <pixiSprite 
                ref={spriteRef}
                anchor={0.5}
                scale={2}
                y={y}
                x={x}
                texture={sprite.texture}
                zIndex={spriteRef.current?.y}
            />
        </>
    ));
}

function EnemyUI({ enemy, showInteraction }: { enemy: Enemy, showInteraction?: boolean }) {
    const [texture, setTexture] = useState<Texture>(Texture.WHITE);
    const pulseRef = useRef(0);
    const [pulseScale, setPulseScale] = useState(1);

    const { sprite, updateSprite } = useEnemyAnimation({
        texture,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: 0.1
    });

    useTick((ticker) => {
        updateSprite('idle', 'down');
        
        if (showInteraction) {
            pulseRef.current += ticker.deltaTime * 0.1;
            setPulseScale(1 + Math.sin(pulseRef.current) * 0.1);
        }
    });

    useEffect(() => {
        Assets.load<Texture>(enemy.spritesheet)
            .then(text => {
                setTexture(text);
            })
    }, []);

    return (sprite && (
        <>
            <pixiSprite 
                texture={sprite.texture}
                anchor={0.5}
                scale={2}
                y={enemy.map_position?.y || 0}
                x={enemy.map_position?.x || 0}
                zIndex={enemy.map_position?.y}
            />
            {showInteraction && (
                <>
                    <pixiGraphics
                        x={(enemy.map_position?.x || 0)}
                        y={(enemy.map_position?.y || 0) - 100}
                        scale={pulseScale}
                        zIndex={9999}
                        draw={g => {
                            g.clear();
                            g.circle(0, 0, 25);
                            g.fill({ color: 0x2d1b69, alpha: 0.7 });
                            g.circle(0, 0, 25);
                            g.stroke({ width: 2, color: 0x8b5cf6, alpha: 1 });
                        }}
                    />
                    <pixiText
                        text="F"
                        anchor={0.5}
                        x={(enemy.map_position?.x || 0)}
                        y={(enemy.map_position?.y || 0) - 100}
                        scale={pulseScale}
                        zIndex={10000}
                        style={{
                            fontFamily: 'Arial',
                            fontSize: 32,
                            fontWeight: 'bold',
                            fill: 0xFFFFFF,
                            align: 'center'
                        }}
                    />
                </>
            )}
        </>
    ));
}

interface TestStageProps {
    stage: IStage;
    heroes: Hero[];
    enemies: Enemy[];
    cards: Card[];
}

export default function TestStage({ stage, heroes, enemies, cards }: TestStageProps) {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [size, setSize] = useState<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        setIsClient(true);
        setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', () => setSize({ width: window.innerWidth, height: window.innerHeight }));
        return () => {
            window.removeEventListener('resize', () => setSize({ width: window.innerWidth, height: window.innerHeight }));
        };
    }, []);

    return (isClient &&
        <Application width={size.width} height={size.height} background={0x1099bb}>
            <TeamProvider initialHeroes={heroes}>
                <Experience stage={stage} initEnemies={enemies} cards={cards} />
            </TeamProvider>
        </Application>
    );
}