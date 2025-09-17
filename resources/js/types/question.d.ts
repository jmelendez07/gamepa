import Answer from "./answer";

export default interface Question {
    id: string;
    text: string;
    room_id: string;
    answers: Answer[];
}