import Planet from "@/types/planet";

export default interface Enemy {
    id: string;
    name: string;
    health: number;
    basic_attack: number;
    spritesheet: string;
    is_hostile: boolean;
    planet_id: string;
    enemy_type_id: string;
    type?: EnemyType;
    planet?: Planet;
    map_position?: {
        x: number;
        y: number;
    },
    combat_position?: {
        x: number;
        y: number;
    }
}

export interface EnemyType {
    id: string;
    name: string;
}