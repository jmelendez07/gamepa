import Hero from '@/types/hero';
import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

interface HeroSelectionUIProps {
    teamHeroes: Hero[];
    currentHeroIndex?: number;
}

export const HeroSelectionUI = ({ teamHeroes, currentHeroIndex }: HeroSelectionUIProps) => {
    const [heroAvatars, setHeroAvatars] = useState<Texture[]>([]);

    useEffect(() => {
        const loadAvatars = async () => {
            const avatars = await Promise.all(teamHeroes.map((hero) => Assets.load(hero.avatar_url)));
            setHeroAvatars(avatars);
        };

        loadAvatars();
    }, [teamHeroes]);

    const itemHeight = 100; // Altura de cada sprite
    const gap = 10; // Espacio entre items
    const totalItemHeight = itemHeight + gap; // Altura total incluyendo gap
    const borderRadius = 50; // Radio de los bordes redondeados
    const borderWidth = 3; // Ancho del borde púrpura

    return (
        <pixiContainer x={(window.innerWidth / 7) * 6} y={window.innerHeight / 6}>
            {heroAvatars.map((avatar, index) => {
                const yPosition = index * totalItemHeight;
                const isCurrentHero = currentHeroIndex === index;

                return (
                    <pixiContainer key={index} y={yPosition}>
                        {/* Fondo del gráfico con bordes redondeados */}
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.roundRect(0, 0, window.innerWidth / 7 + 50, itemHeight, borderRadius);
                                g.fill({ color: 0x000000, alpha: 0.5 });
                            }}
                        />

                        <pixiText text={index + 1} x={10} y={10} />

                        {/* Borde púrpura si es el héroe actual */}
                        {isCurrentHero && (
                            <pixiGraphics
                                draw={(g) => {
                                    g.clear();
                                    g.roundRect(0, 0, window.innerWidth / 7 + 50, itemHeight, borderRadius);
                                    g.stroke({ color: 0x9333ea, width: borderWidth }); // Color púrpura
                                }}
                            />
                        )}

                        {/* Avatar del héroe */}
                        <pixiSprite texture={avatar} x={150} y={15} width={64} height={64} />
                    </pixiContainer>
                );
            })}
        </pixiContainer>
    );
};
