import AsyncStorage from '@react-native-async-storage/async-storage';

import { io, Socket } from 'socket.io-client';

import { API_CONFIG } from './config';

class WebSocketService {

    public socket: Socket | null = null;

    private isConnected = false;

    // =========================
    // CONFIG CHECK
    // =========================
    private isConfigured(): boolean {

        return Boolean(API_CONFIG.SOCKET_URL);
    }

    // =========================
    // CONNECT
    // =========================
    async connect(): Promise<void> {

        // evita múltiplas conexões
        if (this.isConnected && this.socket?.connected) {

            return;
        }

        if (!this.isConfigured()) {

            console.log(
                '❌ WebSocket disabled: SOCKET_URL missing'
            );

            return;
        }

        try {

            const token =
                await AsyncStorage.getItem('authToken');

            // fecha conexão antiga
            this.socket?.disconnect();

            console.log(
                '🔌 Connecting websocket:',
                API_CONFIG.SOCKET_URL
            );

            this.socket = io(API_CONFIG.SOCKET_URL, {

                auth: {
                    token
                },

                transports: ['websocket'],

                reconnection: true,

                reconnectionAttempts: 10,

                reconnectionDelay: 1000
            });

            return new Promise((resolve, reject) => {

                // =========================
                // CONNECT
                // =========================
                this.socket!.on('connect', () => {

                    this.isConnected = true;

                    console.log(
                        '✅ WebSocket connected:',
                        this.socket?.id
                    );

                    // autenticação
                    if (token) {

                        this.socket!.emit(
                            'authenticate',
                            { token }
                        );
                    }

                    resolve();
                });

                // =========================
                // AUTH SUCCESS
                // =========================
                this.socket!.on(
                    'authenticated',
                    (data) => {

                        console.log(
                            '🔐 Authenticated:',
                            data.userId
                        );
                    }
                );

                // =========================
                // AUTH ERROR
                // =========================
                this.socket!.on(
                    'auth_error',
                    (error) => {

                        console.error(
                            '❌ Auth error:',
                            error
                        );

                        reject(error);
                    }
                );

                // =========================
                // CONNECT ERROR
                // =========================
                this.socket!.on(
                    'connect_error',
                    (error) => {

                        console.error(
                            '❌ Connection error:',
                            error
                        );

                        this.isConnected = false;

                        reject(error);
                    }
                );

                // =========================
                // DISCONNECT
                // =========================
                this.socket!.on(
                    'disconnect',
                    (reason) => {

                        console.log(
                            '🔌 Disconnected:',
                            reason
                        );

                        this.isConnected = false;
                    }
                );
            });

        } catch (error) {

            console.error(
                '❌ WebSocket connect failed:',
                error
            );

            throw error;
        }
    }

    // =========================
    // DISCONNECT
    // =========================
    disconnect(): void {

        if (this.socket) {

            this.socket.disconnect();

            this.socket = null;

            this.isConnected = false;

            console.log(
                '🔌 WebSocket manually disconnected'
            );
        }
    }

    // =========================
    // ROOM METHODS
    // =========================
    joinRoom(roomId: string): void {

        if (!this.socket) return;

        console.log('🏠 Joining room:', roomId);

        this.socket.emit('join-room', {
            roomId
        });
    }

    leaveRoom(roomId: string): void {

        if (!this.socket) return;

        console.log('🚪 Leaving room:', roomId);

        this.socket.emit('leave-room', {
            roomId
        });
    }

    // =========================
    // MESSAGE
    // =========================
    sendMessage(
        roomId: string,
        message: string
    ): void {

        if (!this.socket) return;

        console.log(
            '📤 Sending message:',
            message
        );

        this.socket.emit('send-message', {
            roomId,
            message
        });
    }

    // =========================
    // MATCHING
    // =========================
    findMatch(category: string): void {

        if (!this.socket) return;

        console.log(
            '🔎 Finding match:',
            category
        );

        this.socket.emit('find-match', {
            category
        });
    }

    cancelMatch(): void {

        if (!this.socket) return;

        console.log('❌ Cancelling match');

        this.socket.emit('cancel-matching');

        // REMOVE APENAS LISTENERS MATCHING
        this.socket.off('match-found');

        this.socket.off('queue-status');
    }

    // =========================
    // EVENTS
    // =========================
    onMessage(
        callback: (data: any) => void
    ): void {

        this.socket?.on(
            'new-message',
            callback
        );
    }

    onUserJoined(
        callback: (data: any) => void
    ): void {

        this.socket?.on(
            'user-joined',
            callback
        );
    }

    onUserLeft(
        callback: (data: any) => void
    ): void {

        this.socket?.on(
            'user-left',
            callback
        );
    }

    onMatchingFound(
        callback: (data: any) => void
    ): void {

        this.socket?.on(
            'match-found',
            callback
        );
    }

    // =========================
    // STATUS
    // =========================
    get connected(): boolean {

        return this.isConnected;
    }
}

export const wsService = new WebSocketService();