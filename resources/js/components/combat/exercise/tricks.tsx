import { extend } from '@pixi/react';
import { Assets, Container, Point, Sprite, Text, Texture } from 'pixi.js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

extend({ Container, Sprite, Text });

interface TricksProps {
    onClose?: () => void;
}

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export const Tricks = ({ onClose }: TricksProps) => {
    const assetBg = '/assets/ui/tricks-ui.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const containerRef = useRef<Container>(null);

    // Geometría del panel
    const panelHeight = window.innerHeight / 3 + 100;

    // Refs de animación
    const isClosingRef = useRef(false);
    const targetLocalPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const offscreenLocalPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    const stopRAF = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
    };

    const computePositions = () => {
        const c = containerRef.current;
        if (!c || !c.parent) return;

        // Posición objetivo en coordenadas globales y luego a locales del parent
        const globalTarget = new Point(0, window.innerHeight / 3);
        const localTarget = c.parent.toLocal(globalTarget);

        // Posición inicial/final: completamente por debajo de la pantalla
        const globalOffscreen = new Point(0, window.innerHeight + panelHeight);
        const localOffscreen = c.parent.toLocal(globalOffscreen);

        targetLocalPos.current = { x: localTarget.x, y: localTarget.y };
        offscreenLocalPos.current = { x: localOffscreen.x, y: localOffscreen.y };
    };

    const setContainerPos = (x: number, y: number) => {
        const c = containerRef.current;
        if (!c) return;
        c.position.set(x, y);
    };

    const animateY = (fromY: number, toY: number, duration = 320, done?: () => void) => {
        stopRAF();
        const c = containerRef.current;
        if (!c) return;
        const start = performance.now();
        const x = c.x;

        const tick = () => {
            const t = Math.min((performance.now() - start) / duration, 1);
            const e = easeOutCubic(t);
            const y = fromY + (toY - fromY) * e;
            setContainerPos(x, y);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                stopRAF();
                done?.();
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        let cancelled = false;
        Assets.load<Texture>(assetBg).then(() => {
            if (!cancelled) setBgTexture(Assets.get(assetBg));
        });
        return () => {
            cancelled = true;
        };
    }, []);

    // Posicionar y animar entrada
    useLayoutEffect(() => {
        computePositions();

        // Colocar fuera de pantalla y deslizar hacia arriba
        const off = offscreenLocalPos.current;
        const tgt = targetLocalPos.current;
        setContainerPos(off.x, off.y);
        animateY(off.y, tgt.y);

        const onResize = () => {
            // Recalcular posiciones; si está cerrando, permanece offscreen; si no, target
            computePositions();
            const pos = isClosingRef.current ? offscreenLocalPos.current : targetLocalPos.current;
            setContainerPos(pos.x, pos.y);
        };

        window.addEventListener('resize', onResize);
        return () => {
            stopRAF();
            window.removeEventListener('resize', onResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        if (isClosingRef.current) return;
        isClosingRef.current = true;

        const c = containerRef.current;
        if (!c) {
            onClose?.();
            return;
        }

        const fromY = c.y;
        const toY = offscreenLocalPos.current.y;

        animateY(fromY, toY, 260, () => {
            onClose?.();
        });
    };

    return (
        <pixiContainer ref={containerRef} zIndex={9999} interactive={true}>
            {bgTexture && (
                <pixiSprite
                    texture={bgTexture}
                    x={0}
                    y={window.innerHeight / 3 - 100}
                    width={window.innerWidth}
                    height={panelHeight}
                />
            )}

            <pixiText
                text="↓"
                cursor="pointer"
                interactive={true}
                onClick={handleClose}
                x={window.innerWidth / 2}
                y={window.innerHeight / 3 - 90}
                zIndex={10000}
                style={{
                    fontSize: 32,
                    fill: 0xffffff,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                }}
            />
        </pixiContainer>
    );
};
