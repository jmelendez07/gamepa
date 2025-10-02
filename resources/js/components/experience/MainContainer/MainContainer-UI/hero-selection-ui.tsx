import Hero from '@/types/hero';
import { Assets, Container, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

interface HeroSelectionUIProps {
    teamHeroes: Hero[];
    currentHeroIndex?: number;
}

export const HeroSelectionUI = ({ teamHeroes, currentHeroIndex }: HeroSelectionUIProps) => {
    const [heroAvatars, setHeroAvatars] = useState<Texture[]>([]);
    const [roleIcons, setRoleIcons] = useState<Texture[]>([]);
    const containerRef = useRef<Container>(null);

    useEffect(() => {
        const loadAvatars = async () => {
            const avatars = await Promise.all(teamHeroes.map((hero) => Assets.load(hero.avatar_url)));
            setHeroAvatars(avatars);
        };

        const loadRolesIcons = async () => {
            const roleIcons = await Promise.all(teamHeroes.map((hero) => Assets.load(hero.hero_role.icon_url)));
            setRoleIcons(roleIcons);
        };

        loadAvatars();
        loadRolesIcons();
    }, [teamHeroes]);

    const itemHeight = 100;
    const gap = 10;
    const totalItemHeight = itemHeight + gap;
    const borderRadius = 50;
    const borderWidth = 3;

    // Dimensiones de la barra de vida
    const healthBarWidth = 80;
    const healthBarHeight = 8;
    const healthBarRadius = 4;

    const getHealthColor = (percentage: number) => {
        if (percentage > 0.6) return 0x4caf50;
        if (percentage > 0.35) return 0xffc107;
        return 0xf44336;
    };

    const getHealthHighlight = (percentage: number) => {
        if (percentage > 0.6) return 0x66bb6a;
        if (percentage > 0.35) return 0xffd54f;
        return 0xff7043;
    };

    return (
        <pixiContainer x={(window.innerWidth / 7) * 6} y={window.innerHeight / 6}>
            {heroAvatars.map((avatar, index) => {
                const yPosition = index * totalItemHeight;
                const isCurrentHero = currentHeroIndex === index;
                const hero = teamHeroes[index];
                const healthPercentage = hero.health / hero.health; // Ajusta con maxHealth si lo tienes

                return (
                    <pixiContainer ref={containerRef} key={index} y={yPosition}>
                        {/* Fondo del gráfico con bordes redondeados */}
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.roundRect(0, 0, window.innerWidth / 7 + 50, itemHeight, borderRadius);
                                g.fill({ color: 0x000000, alpha: isCurrentHero ? 0.6 : 0.3 });
                            }}
                        />

                        <pixiText text={index + 1} x={20} y={itemHeight / 2 - 12} style={{ fill: 0xffffff, fontSize: 24, fontFamily: 'Jersey 10' }} />

                        <pixiText text={hero.name} x={50} y={itemHeight / 2 - 12} style={{ fill: 0xffffff, fontSize: 24, fontFamily: 'Jersey 10' }} />

                        {/* Borde púrpura si es el héroe actual */}
                        {isCurrentHero && (
                            <pixiGraphics
                                draw={(g) => {
                                    g.clear();
                                    g.roundRect(0, 0, window.innerWidth / 7 + 50, itemHeight, borderRadius);
                                    g.stroke({ color: 0x9333ea, width: borderWidth });
                                }}
                            />
                        )}

                        {/* Avatar del héroe */}
                        <pixiSprite texture={avatar} x={150} y={15} width={64} height={64} />

                        {/* Icono del rol del héroe */}
                        <pixiSprite texture={roleIcons[index]} x={135} y={20} width={16} height={16} />

                        {/* Barra de vida - Fondo (a los pies del avatar) */}
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.roundRect(150 + 32 - healthBarWidth / 2, 79 + 8, healthBarWidth, healthBarHeight, healthBarRadius);
                                g.fill({ color: 0x1a1a1a });
                            }}
                        />

                        {/* Barra de vida - Progreso */}
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                const barWidth = (healthBarWidth - 4) * healthPercentage;
                                if (barWidth > 0) {
                                    g.roundRect(150 + 32 - healthBarWidth / 2 + 2, 79 + 8 + 2, barWidth, healthBarHeight - 4, healthBarRadius - 1);
                                    g.fill({ color: getHealthColor(healthPercentage) });
                                }
                            }}
                        />

                        {/* Brillo superior de la barra */}
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                const barWidth = (healthBarWidth - 4) * healthPercentage;
                                if (barWidth > 0) {
                                    g.roundRect(150 + 32 - healthBarWidth / 2 + 2, 79 + 8 + 2, barWidth, 2, healthBarRadius - 1);
                                    g.fill({ color: getHealthHighlight(healthPercentage), alpha: 0.6 });
                                }
                            }}
                        />
                    </pixiContainer>
                );
            })}
        </pixiContainer>
    );
};
