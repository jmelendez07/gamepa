import { HeroAnimation } from "./HeroAnimations";

export default interface Hero {
    id: string;
    name: string;
    spritesheet: string;
    health: number;
    hero_animations: HeroAnimation[];
    created_at: string;
    updated_at: string;
}