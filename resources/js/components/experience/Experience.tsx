import { Application } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { calculateCanvasSize } from '../helpers/common';
import { MainContainer } from './MainContainer/MainContainer';
import Enemy from '@/types/enemy';
import Card from '@/types/card';
import Hero from '@/types/hero';

interface IExperienceProps {
	enemies: Enemy[];
	cards: Card[];
	hero: Hero;
}

export const Experience = ({ enemies, cards, hero }: IExperienceProps) => {
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

	return (
		<>
			{isClient && (
				<Application width={canvasSize.width} height={canvasSize.height}>
					<MainContainer defaultEnemies={enemies} cards={cards} canvasSize={canvasSize} hero={hero}>
					</MainContainer>
				</Application>
			)}
		</>
	);
};

