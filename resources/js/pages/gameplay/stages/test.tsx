import { KeyMap } from "@/components/types/key";
import { Stage as IStage } from "@/types/planet";
import { Application, extend, useTick } from "@pixi/react";
import { Assets, Container, Sprite, Texture, Ticker, Graphics } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

extend({ Sprite, Container, Graphics});

const allowedKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "Space"];
const mapScale = 1;

function Experience({ stage }: { stage: IStage }) {
    const [texture, setTexture] = useState<Texture | null>(null);
    const [stageTexture, setStageTexture] = useState<Texture | null>(null);
    const [keys, setKeys] = useState<KeyMap>({});
    const spriteRef = useRef<Sprite>(null);
    const cameraRef = useRef<Container>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runTimeLeft, setRunTimeLeft] = useState(5);
    const [cooldownLeft, setCooldownLeft] = useState(0);

    const polygonPoints: [number, number][] = stage.points
        .map(p => [p.x, p.y] as [number, number])
        .filter(arr => arr.length === 2 && arr.every(Number.isFinite));
    const centroid = getPolygonCentroid(polygonPoints);
    
    const keysLoop = useCallback((delta: number) => {
        const sprite = spriteRef.current;
        const camera = cameraRef.current;
        if (!sprite || !camera) return;

        const controlPressed = keys[allowedKeys[4]];
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

        // --- NUEVO BLOQUE DE MOVIMIENTO ---
        let newX = sprite.x;
        let newY = sprite.y;

        if (keys[allowedKeys[0]]) newY -= speed; // W
        if (keys[allowedKeys[1]]) newX -= speed; // A
        if (keys[allowedKeys[2]]) newY += speed; // S
        if (keys[allowedKeys[3]]) newX += speed; // D

        const spriteLeftX = (newX - sprite.width / 2) / mapScale;
        const spriteRightX = (newX + sprite.width / 2) / mapScale;
        const spriteTopY = (newY - sprite.height / 2) / mapScale;
        const spriteBottomY = (newY + sprite.height / 2) / mapScale;

        const allInside = (
            isPointInPolygon(spriteLeftX, newY / mapScale, polygonPoints) &&
            isPointInPolygon(spriteRightX, newY / mapScale, polygonPoints) &&
            isPointInPolygon(newX / mapScale, spriteTopY, polygonPoints) &&
            isPointInPolygon(newX / mapScale, spriteBottomY, polygonPoints)
        );

        if (allInside) {
            sprite.x = newX;
            sprite.y = newY;
        }
        // -----------------------------------

        camera.x = (window.innerWidth / 2) - sprite.x;
        camera.y = (window.innerHeight / 2) - sprite.y;

    }, [keys, polygonPoints, isRunning, runTimeLeft, cooldownLeft]);


    useEffect(() => {
        Assets.load('https://pixijs.io/examples/examples/assets/bunny.png')
            .then((result) => {
                setTexture(result);
            });

        Assets.load(stage.image_url)
            .then((result) => {
                setStageTexture(result);
            });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === allowedKeys[4]) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (allowedKeys.includes(event.code)) {
                setKeys((prevKeys) => ({ ...prevKeys, [event.code]: true }));
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (allowedKeys.includes(event.code)) {
                setKeys((prevKeys) => ({ ...prevKeys, [event.code]: false }));
            }
        };

        const handleBlur = () => {
            setKeys({});
        };

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
            { texture && (
                <pixiSprite 
                    ref={spriteRef}
                    anchor={0.5}
                    scale={2}
                    y={centroid.y}
                    x={centroid.x}
                    texture={texture}
                    zIndex={1}
                />
            ) }
            { stageTexture && (
                <pixiSprite 
                    texture={stageTexture}
                    x={0}
                    y={0}
                    zIndex={0}
                    scale={mapScale}
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
                scale={mapScale}
                zIndex={2}
            />
        </pixiContainer>
    );
}

function getPolygonCentroid(points: [number, number][]) {
    const n = points.length;
    let x = 0, y = 0;
    for (let i = 0; i < n; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    return { x: x / n, y: y / n };
}

function isPointInPolygon(x: number, y: number, polygon: [number, number][]) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / ((yj - yi) || 1) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

export default function TestStage({ stage }: { stage: IStage }) {
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
            <Experience stage={stage} />
        </Application>
    );
}