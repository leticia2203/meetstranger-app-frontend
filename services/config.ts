export const API_CONFIG = {

    // PRODUÇÃO RENDER
    BASE_URL:
        'https://meetstranger-app-backend-main.onrender.com/api',

    SOCKET_URL:
        'https://meetstranger-app-backend-main.onrender.com',

    TIMEOUT: 60000
};

// =========================
// API RESPONSE
// =========================
export interface ApiResponse<T = any> {

    success: boolean;

    data?: T;

    message?: string;

    error?: string;
}

// =========================
// USER
// =========================
export interface User {

    id: string;

    username: string;

    email: string;

    createdAt?: string;
}

// =========================
// CHAT ROOM
// =========================
export interface ChatRoom {

    id: string;

    category: string;

    participants: string[];

    createdAt: string;
}

// =========================
// MESSAGE
// =========================
export interface Message {

    id: string;

    roomId: string;

    userId: string;

    text: string;

    timestamp: string;
}