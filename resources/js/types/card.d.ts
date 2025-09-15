import Exercise from "./exercise";

export default interface Card {
    id: string;
    name: string;
    energy_cost: number;
    stats: number;
    type: TypeCard;
    exercises?: Exercise[];
    created_at: string;
}

export interface TypeCard {
    id: string;
    name: string;
}