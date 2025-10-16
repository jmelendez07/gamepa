import { Experience } from '@/components/gameplay/experience';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { TeamProvider } from '@/Providers/TeamProvider';
import Card from '@/types/card';
import Enemy from '@/types/enemy';
import Hero from '@/types/hero';
import { Stage as IStage } from '@/types/planet';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

extend({ Sprite, Container, Graphics, Text });

interface TestStageProps {
    stage: IStage;
    heroes: Hero[];
    enemies: Enemy[];
    cards: Card[];
}

export default function TestStage({ stage, heroes, enemies, cards }: TestStageProps) {
    const [isClient, setIsClient] = useState<boolean>(false);
    const { isFullscreen, canvasSize } = useFullscreen();
    const [size, setSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const appRef = useRef<any>(null);

    useEffect(() => {
        setIsClient(true);

        const handleResize = () => {
            const newSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            setSize(newSize);

            // Redimensionar el renderer sin remount
            if (appRef.current?.app?.renderer) {
                appRef.current.app.renderer.resize(newSize.width, newSize.height);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Actualizar el tamaño cuando cambie el estado de fullscreen
    useEffect(() => {
        const newSize = {
            width: canvasSize.width,
            height: canvasSize.height,
        };
        setSize(newSize);

        // Redimensionar el renderer sin remount
        if (appRef.current?.app?.renderer) {
            appRef.current.app.renderer.resize(newSize.width, newSize.height);
        }
    }, [canvasSize, isFullscreen]);

    return (
        isClient && (
            <Application
                ref={appRef}
                width={size.width}
                height={size.height}
                background={0x1099bb}
                autoDensity={true}
                resolution={window.devicePixelRatio || 1}
            >
                <TeamProvider initialHeroes={heroes}>
                    <Experience stage={stage} initEnemies={enemies} cards={cards} canvasSize={size} />
                </TeamProvider>
            </Application>
        )
    );
}
