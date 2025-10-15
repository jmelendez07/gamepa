import Hero from '@/types/hero';
import { Assets, Texture } from 'pixi.js';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TeamContextType {
    teamHeroes: Hero[];
    currentHero: Hero;
    setTeamHeroes: (heroes: Hero[]) => void;
    updateHeroHealth: (heroId: string, newHealth: number) => void;
    resetTeamHealth: () => void;
    isTeamFull: boolean;
    textures: Texture[];
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);
const MAX_TEAM_SIZE = 4;
const STORAGE_KEY = 'gamepa_team_state';

const ensureCurrentHealth = (hero: Hero): Hero => {
    return {
        ...hero,
        current_health: hero.current_health !== undefined ? hero.current_health : hero.health
    };
};

export const TeamProvider = ({ children, initialHeroes }: { children: ReactNode; initialHeroes: Hero[] }) => {
    const [teamHeroes, setTeamHeroesState] = useState<Hero[]>(() => {
        const savedTeam = localStorage.getItem(STORAGE_KEY);
        
        if (savedTeam) {
            const parsedTeam = JSON.parse(savedTeam);
            if (parsedTeam.length > 0) {
                return parsedTeam.map(ensureCurrentHealth);
            }
        }
        
        return initialHeroes.map(ensureCurrentHealth);
    });
    const [textures, setTextures] = useState<Texture[]>([]);
    const [currentHero, setCurrentHero] = useState<Hero>(teamHeroes[0]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teamHeroes));
        
        const textureMap = teamHeroes.map(hero => Assets.load<Texture>(hero.spritesheet));
        Promise.all(textureMap).then(textures => {
            setTextures(textures);

            if (currentHero) {
                setCurrentHero({
                    ...currentHero,
                    texture: textures[teamHeroes.findIndex(h => h.id === currentHero.id)]
                });
            }
        });
    }, [teamHeroes]);

    useEffect(() => {
        setTeamHeroesState(prev => {
            if (prev.length === 0 && initialHeroes.length > 0) {
                return initialHeroes.map(ensureCurrentHealth);
            }
            return prev;
        });
    }, [initialHeroes]);

    const setTeamHeroes = (heroes: Hero[]) => {
        const heroesWithHealth = heroes.map(ensureCurrentHealth);
        setTeamHeroesState(heroesWithHealth.slice(0, MAX_TEAM_SIZE));
    };

    const updateHeroHealth = (heroId: string, newHealth: number) => {
        setTeamHeroesState((prev) =>
            prev.map((hero) =>
                hero.id === heroId
                    ? { ...hero, current_health: Math.max(0, Math.min(newHealth, hero.health)) }
                    : hero
            )
        );
    };

    const resetTeamHealth = () => {
        setTeamHeroesState((prev) =>
            prev.map((hero) => ({
                ...hero,
                current_health: hero.health,
            }))
        );
    };

    const isTeamFull = teamHeroes.length >= MAX_TEAM_SIZE;

    return (
        <TeamContext.Provider
            value={{
                teamHeroes,
                currentHero,
                setTeamHeroes,
                updateHeroHealth,
                resetTeamHealth,
                isTeamFull,
                textures,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam debe ser usado dentro de TeamProvider');
    }
    return context;
};