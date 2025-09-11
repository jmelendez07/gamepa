import { Experience } from "@/components/experience/Experience";
import Card from "@/types/card";
import Enemy from "@/types/enemy";

interface IGameplayProps {
	enemies: Enemy[];
	cards: Card[];
}

const Gameplay = ({ enemies, cards }: IGameplayProps) => {
	return (
		<>
			<Experience enemies={enemies} cards={cards} />
		</>
	);
};

export default Gameplay;

