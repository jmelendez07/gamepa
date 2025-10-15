import useEnemyAnimation from "@/components/enemy/useEnemyAnimation";
import { StatsUI } from "@/components/experience/MainContainer/stats-ui";
import { KeyMap } from "@/components/types/key";
import ConfigUI from "@/components/ui/pixi/config";
import { HeroSelectionUI } from "@/components/ui/pixi/hero-selection";
import { MissionsUI } from "@/components/ui/pixi/misions";
import { ProfileUI } from "@/components/ui/pixi/profile";
import { StageUI } from "@/components/ui/pixi/stage";
import { Actions } from "@/enums/hero-actions";
import { Directions } from "@/enums/hero-directions";
import { ALLOWED_KEYS, getPolygonCentroid, getRow, HERO_FRAME_SIZE, HERO_MOVING_SPEED, HERO_MOVING_SPEED_RUNNING, isPointInPolygon, MAP_SCALE } from "@/lib/utils";
import { TeamProvider, useTeam } from "@/Providers/TeamProvider";
import { SharedData } from "@/types";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";
import { Stage as IStage } from "@/types/planet";
import { usePage } from "@inertiajs/react";
import { Application, extend, useTick } from "@pixi/react";
import { Assets, Container, Sprite, Texture, Ticker, Graphics, Rectangle } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

extend({ Sprite, Container, Graphics});

function Experience({ stage, initEnemies }: { stage: IStage, initEnemies: Enemy[] }) {
    const [stageTexture, setStageTexture] = useState<Texture | null>(null);
    const [keys, setKeys] = useState<KeyMap>({});
    const spriteRef = useRef<Sprite>(null);
    const cameraRef = useRef<Container>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runTimeLeft, setRunTimeLeft] = useState(5);
    const [cooldownLeft, setCooldownLeft] = useState(0);
    const [direction, setDirection] = useState<Directions>(Directions.DOWN);
    const [enemies, setEnemies] = useState<Enemy[]>([]);

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

    useEffect(() => {
        Assets.load(stage.image_url)
            .then((result) => {
                setStageTexture(result);
            });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === ALLOWED_KEYS[4]) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (ALLOWED_KEYS.includes(event.code)) {
                setKeys((prevKeys) => ({ ...prevKeys, [event.code]: true }));
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
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
                map_position: generateRandomPosition(index)
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
    }, []);

    useTick((ticker: Ticker) => keysLoop(ticker.deltaTime));

    return (
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
    );
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

function EnemyUI({ enemy }: { enemy: Enemy}) {
    const [texture, setTexture] = useState<Texture>(Texture.WHITE);

    const { sprite, updateSprite } = useEnemyAnimation({
        texture,
        frameWidth: 64,
        frameHeight: 64,
        totalFrames: 2,
        animationSpeed: 0.1
    });

    useTick(() => updateSprite('idle', 'down'));

    useEffect(() => {
        Assets.load<Texture>(enemy.spritesheet)
            .then(text => {
                setTexture(text);
            })
    }, []);

    return (sprite && (
        <pixiSprite 
            texture={sprite.texture}
            anchor={0.5}
            scale={2}
            y={enemy.map_position?.y || 0}
            x={enemy.map_position?.x || 0}
            zIndex={enemy.map_position?.y}
        />   
    ));
}

interface TestStageProps {
    stage: IStage;
    heroes: Hero[];
    enemies: Enemy[];
}

export default function TestStage({ stage, heroes, enemies }: TestStageProps) {
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
            <ProfileUI />
            <ConfigUI windowSize={size} />
            <MissionsUI stage={stage} />
            <StageUI stage={stage} />
            <TeamProvider initialHeroes={heroes}>
                <HeroSelectionUI />
                <StatsUI />
                <Experience stage={stage} initEnemies={enemies} />
            </TeamProvider>
        </Application>
    );
}