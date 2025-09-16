export default interface Room {
    id: string;
    pin: string;
    name: string;
    status: RoomStatus;
    created_at: string;
    updated_at?: string;
}

export interface RoomStatus {
    id: string;
    name: string;
}