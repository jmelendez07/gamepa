import Planet from "@/types/planet";

export default interface Exercise {
    id: string;
    operation: string;
    planet: Planet;
    difficulty: Difficulty;
}

export interface Difficulty {
    id: string;
    name: string;
}