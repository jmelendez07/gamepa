import Planet from "@/types/planet";

export default interface Exercise {
    id: string;
    operation: string;
    planet: Planet;
    difficulty: Difficulty;
    steps: Step[];
}

export interface Difficulty {
    id: string;
    name: string;
}

export interface Step {
    id: string;
    order: number;
    exercise_id: string;
    options: Option[];
}

export interface Option {
    id: string;
    result: string;
    is_correct: boolean;
    step_id: string;
}