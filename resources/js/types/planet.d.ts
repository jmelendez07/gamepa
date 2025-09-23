import Galaxy from "./galaxy";

export default interface Planet {
    id: string;
    name: string;
    description?: string;
    galaxy: Galaxy;
    image_url: string;
    image_public_id: string;
}