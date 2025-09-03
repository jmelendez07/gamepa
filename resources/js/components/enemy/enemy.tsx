import { extend, useTick } from '@pixi/react'
import { Container, Sprite, Texture, Assets } from 'pixi.js'
import React, { use, useEffect, useRef, useState } from 'react'
import useEnemyAnimation from './useEnemyAnimation';
import { IEnemy } from '@/types';

extend({ Container, Sprite })

interface IEnemyProps {
	enemy: IEnemy;
}

export default function Enemy({ enemy }: IEnemyProps) {
	const [texture, setTexture] = useState<Texture>(Texture.WHITE);

	const { sprite, updateSprite } = useEnemyAnimation({
		texture,
		frameWidth: 64,
		frameHeight: 64,
		totalFrames: 2,
		animationSpeed: 0.1
	});

	useTick((ticker) => {
		updateSprite('idle', 'down');
	});

	useEffect(() => {
		Assets.load<Texture>(enemy.avatar)
			.then((text) => {
				setTexture(text);
			});
	}, []);

	return (
		<pixiContainer x={enemy.mapPosition.x} y={enemy.mapPosition.y}>
			{sprite && (
				<pixiSprite 
					texture={sprite.texture}
					scale={0.6}
					anchor={0.5} 
				/>
			)}
		</pixiContainer>
	)
}
