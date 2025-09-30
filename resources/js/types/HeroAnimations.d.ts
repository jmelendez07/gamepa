import Hero from "./hero";

export interface HeroAnimation { 
    id: string;
    hero: Hero;
    action: string;
    spritesheet_url: string;
    row: number;
    totalFrames: number;
}