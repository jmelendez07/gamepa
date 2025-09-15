import { Experience } from "@/components/experience/Experience";
import Card from "@/types/card";
import Enemy from "@/types/enemy";
import Hero from "@/types/hero";

interface IGameplayProps {
	enemies: Enemy[];
	cards: Card[];
	hero: Hero;
}

const Gameplay = ({ enemies, cards, hero }: IGameplayProps) => {
	return (
		<>
			<Experience enemies={enemies} cards={cards} hero={hero} />
		</>
	);
};

export default Gameplay;

