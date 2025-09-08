export default interface Card {
    id: string;
    name: string;
    energy_cost: number;
    stats: number;
    type: TypeCard;
}

export interface TypeCard {
    id: string;
    name: string;
}