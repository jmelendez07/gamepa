import { TeamProvider } from "@/Providers/TeamProvider";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";
import { Stage as IStage } from "@/types/planet";
import { Application, extend } from "@pixi/react";
import { Container, Sprite, Graphics, Text } from "pixi.js";
import { useEffect, useState } from "react";
import Card from "@/types/card";
import { Experience } from "@/components/gameplay/experience";

extend({ Sprite, Container, Graphics, Text});

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