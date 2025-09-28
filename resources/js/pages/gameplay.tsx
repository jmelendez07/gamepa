import { Experience } from "@/components/experience/Experience";
import Card from "@/types/card";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";
import { Stage } from "@/types/planet";

interface IGameplayProps {
    enemies: Enemy[];
    cards: Card[];
    heroes: Hero[];
    stage: Stage;
}

const Gameplay = ({ enemies, cards, heroes, stage }: IGameplayProps) => {

	console.log('heroes in Gameplay:', heroes);
    return (
        <>
            <Experience enemies={enemies} cards={cards} heroes={heroes} stage={stage} />
        </>
    );
};

export default Gameplay;

