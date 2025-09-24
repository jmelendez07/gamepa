import Planet from "./planet";

export default interface Galaxy {
    id: string;
    name: string;
    number: number;
    image_url: string;
    image_public_id: string;
    planets: Planet[];
}