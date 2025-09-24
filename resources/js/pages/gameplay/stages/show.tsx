import { Experience } from "@/components/experience/Experience";
import Card from "@/types/card";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";
import { Stage } from "@/types/planet";

interface IStagesShowProps {
    stage: Stage;
    enemies: Enemy[];
    cards: Card[];
    hero: Hero;
}

export default function StagesShow({ stage, enemies, cards, hero }: IStagesShowProps) {
    return (
        <Experience enemies={enemies} cards={cards} hero={hero} stage={stage} />
    );
}