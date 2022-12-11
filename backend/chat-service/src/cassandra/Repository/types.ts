export interface User {
    id: bigint;
    name: string;
}

export interface Message {
    id: string;
    conference_id: string;
    text: string;
    owner: User;
    created_at: string;
    modified_at: string;
}