import { Application } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { calculateCanvasSize } from '../helpers/common';
import { MainContainer } from './MainContainer/MainContainer';
import Enemy from '@/types/enemy';
import Card from '@/types/card';
import Hero from '@/types/hero';
import { Stage } from '@/types/planet';

interface IExperienceProps {
	enemies: Enemy[];
	cards: Card[];
	heroes: Hero[];
	stage: Stage;
}

export const Experience = ({ enemies, cards, heroes, stage }: IExperienceProps) => {
	const [isClient, setIsClient] = useState(false);
	const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());

	const updateCanvasSize = useCallback(() => {
		setCanvasSize(calculateCanvasSize());
	}, []);

	useEffect(() => {
		setIsClient(true);
		window.addEventListener('resize', updateCanvasSize);
		return () => {
			window.removeEventListener('resize', updateCanvasSize);
		};
	}, [updateCanvasSize]);

	console.log('heroes in Experience:', heroes);

	return (
		<>
			{isClient && (
				<Application width={canvasSize.width} height={canvasSize.height}>
					<MainContainer defaultEnemies={enemies} cards={cards} canvasSize={canvasSize} heroes={heroes} stage={stage}>
					</MainContainer>
				</Application>
			)}
		</>
	);
};

