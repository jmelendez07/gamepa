import Hero from '@/types/hero';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface TeamContextType {
    teamHeroes: Hero[];
    setTeamHeroes: (heroes: Hero[]) => void;
    updateHeroHealth: (heroId: string, newHealth: number) => void;
    resetTeamHealth: () => void;
    isTeamFull: boolean;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const MAX_TEAM_SIZE = 4;
const STORAGE_KEY = 'gamepa_team_state';

// ✅ Función helper para asegurar que el héroe tenga current_health
const ensureCurrentHealth = (hero: Hero): Hero => {
    return {
        ...hero,
        current_health: hero.current_health !== undefined ? hero.current_health : hero.health
    };
};

export const TeamProvider = ({ children, initialHeroes }: { children: ReactNode; initialHeroes: Hero[] }) => {
    const [teamHeroes, setTeamHeroesState] = useState<Hero[]>(() => {
        // Intentar cargar del localStorage
        const savedTeam = localStorage.getItem(STORAGE_KEY);
        
        if (savedTeam) {
            try {
                const parsedTeam = JSON.parse(savedTeam);
                if (parsedTeam.length > 0) {
                    // ✅ Asegurar que los héroes guardados tengan current_health
                    return parsedTeam.map(ensureCurrentHealth);
                }
            } catch (error) {
                console.error('Error parsing saved team:', error);
            }
        }
        
        // Si no hay savedTeam o está vacío, inicializar con current_health = health
        console.log('Initializing heroes with current_health:', initialHeroes.map(h => h.health));
        return initialHeroes.map(ensureCurrentHealth);
    });

    // Persistir en localStorage cada vez que cambie el equipo
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teamHeroes));
    }, [teamHeroes]);

    // ✅ Sincronizar con initialHeroes cuando cambian (por ejemplo, al cargar nuevos héroes)
    useEffect(() => {
        setTeamHeroesState(prev => {
            // Si el localStorage estaba vacío y ahora tenemos initialHeroes
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
                setTeamHeroes,
                updateHeroHealth,
                resetTeamHealth,
                isTeamFull,
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