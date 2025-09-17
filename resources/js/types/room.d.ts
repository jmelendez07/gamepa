import Question from "./question";

export default interface Room {
    id: string;
    pin: string;
    name: string;
    status: RoomStatus;
    created_at: string;
    updated_at?: string;
    started_at: string;
    ended_at: string;
    questions: Question[];
}

export interface RoomStatus {
    id: string;
    name: string;
}