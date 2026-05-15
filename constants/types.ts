export interface User {
    id: string;
    name: string;
    userName?: string;
    email: string;
}
export interface ChatMessage {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    UserName: string;
}

export interface ChatCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}
