import Galaxy from "./galaxy";

export default interface Planet {
    id: string;
    number: number;
    name: string;
    description?: string;
    galaxy?: Galaxy;
    image_url: string;
    image_public_id: string;
    stages: Stage[];
}

export interface Stage {
    id: string;
    name: string;
    number: number;
    planet_id?: string;
    galaxy_id?: string;
    image_url: string;
    image_public_id: string;
    planet: Planet;
    points: StagePoints[];
}

export interface StagePoints {
    id: string;
    stage_id: string;
    number: number;
    x: number;
    y: number;
}