import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_CONFIG } from './config';

class ApiService {

    private baseUrl: string;

    constructor() {

        this.baseUrl = API_CONFIG.BASE_URL;
    }

    // =========================
    // AUTH TOKEN
    // =========================
    private async getAuthToken():
        Promise<string | null> {

        return await AsyncStorage.getItem(
            'authToken'
        );
    }

    // =========================
    // REQUEST
    // =========================
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {

        const token =
            await this.getAuthToken();

        const controller =
            new AbortController();

        const timeout = setTimeout(() => {

            controller.abort();

        }, API_CONFIG.TIMEOUT);

        try {

            const config: RequestInit = {

                ...options,

                signal: controller.signal,

                headers: {

                    'Content-Type':
                        'application/json',

                    ...(token && {
                        Authorization:
                            `Bearer ${token}`
                    }),

                    ...options.headers
                }
            };

            console.log(
                '🌐 API Request:',
                `${this.baseUrl}${endpoint}`
            );

            const response = await fetch(
                `${this.baseUrl}${endpoint}`,
                config
            );

            clearTimeout(timeout);

            // =========================
            // ERROR RESPONSE
            // =========================
            if (!response.ok) {

                let errorMessage =
                    'Request failed';

                try {

                    const error =
                        await response.json();

                    errorMessage =
                        error.message ||
                        error.error ||
                        errorMessage;

                } catch {

                    errorMessage =
                        `HTTP ${response.status}`;
                }

                throw new Error(errorMessage);
            }

            // =========================
            // NO CONTENT
            // =========================
            if (response.status === 204) {

                return undefined as T;
            }

            // =========================
            // JSON
            // =========================
            return await response.json();

        } catch (error: any) {

            if (error.name === 'AbortError') {

                throw new Error(
                    'Request timeout'
                );
            }

            throw error;
        }
    }

    // =========================
    // LOGIN
    // =========================
    async login(
        email: string,
        password: string
    ) {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    token: string;
                    user: any;
                };
            }>('/auth/login', {

                method: 'POST',

                body: JSON.stringify({
                    email,
                    password
                })
            });

        if (response.data?.token) {

            await AsyncStorage.setItem(
                'authToken',
                response.data.token
            );

            console.log(
                '✅ Token saved'
            );
        }

        return response.data;
    }

    // =========================
    // REGISTER
    // =========================
    async register(
        username: string,
        email: string,
        password: string
    ) {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    token: string;
                    user: any;
                };
            }>('/auth/register', {

                method: 'POST',

                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

        if (response.data?.token) {

            await AsyncStorage.setItem(
                'authToken',
                response.data.token
            );

            console.log(
                '✅ Token saved'
            );
        }

        return response.data;
    }

    // =========================
    // LOGOUT
    // =========================
    async logout() {

        try {

            await this.request(
                '/auth/logout',
                {
                    method: 'POST'
                }
            );

        } catch (error) {

            console.log(
                '⚠️ Logout request failed'
            );
        }

        // remove token mesmo se backend falhar
        await AsyncStorage.removeItem(
            'authToken'
        );

        console.log('👋 Token removed');
    }

    // =========================
    // PROFILE
    // =========================
    async getProfile() {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    user: any;
                };
            }>('/auth/profile');

        return response.data;
    }

    // =========================
    // ROOMS
    // =========================
    async getRooms() {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    rooms: any[];
                };
            }>('/chat/rooms');

        return response.data;
    }

    // =========================
    // ROOM MESSAGES
    // =========================
    async getRoomMessages(
        roomId: string
    ) {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    messages: any[];
                };
            }>(
                `/chat/rooms/${roomId}/messages`
            );

        return response.data;
    }

    // =========================
    // SEND MESSAGE
    // =========================
    async sendMessage(
        roomId: string,
        text: string
    ) {

        await this.request(
            `/chat/rooms/${roomId}/message`,
            {

                method: 'POST',

                body: JSON.stringify({
                    text
                })
            }
        );
    }

    // =========================
    // FIND MATCH
    // =========================
    async findMatch(
        category: string
    ) {

        const response =
            await this.request<{
                success: boolean;
                data: {
                    roomId: string;
                };
            }>('/matching/find', {

                method: 'POST',

                body: JSON.stringify({
                    category
                })
            });

        return response.data;
    }
}

export const apiService =
    new ApiService();