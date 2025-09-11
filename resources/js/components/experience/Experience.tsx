import { Application } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { calculateCanvasSize } from '../helpers/common';
import { MainContainer } from './MainContainer/MainContainer';
import Enemy from '@/types/enemy';
import Card from '@/types/card';

interface IExperienceProps {
	enemies: Enemy[];
	cards: Card[];
}

export const Experience = ({ enemies, cards }: IExperienceProps) => {
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
					<MainContainer defaultEnemies={enemies} cards={cards} canvasSize={canvasSize}>
					</MainContainer>
				</Application>
			)}
		</>
	);
};

