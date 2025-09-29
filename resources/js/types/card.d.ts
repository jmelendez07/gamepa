import Exercise from "./exercise";
import Hero from "./hero";

export default interface Card {
    id: string;
    name: string;
    energy_cost: number;
    stats: number;
    type: TypeCard;
    exercise: Exercise;
    spritesheet: string;
    created_at: string;
    hero_id: Hero['id'];
}

export interface TypeCard {
    id: string;
    name: string;
}