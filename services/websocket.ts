import asyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from './config';
import {io, Socket} from 'socket.io-client';
class webSocketService {
    public socket: Socket | null = null;
    private isConnected = false;

    private isConfigured(): boolean {
        return Boolean(API_CONFIG.SOCKET_URL && !API_CONFIG.SOCKET_URL.includes('MEU SERVIDOR'));
    }
 
    async connect(): Promise<void> {
        if (this.isConnected && this.socket?.connected) {
            return;
        }

        if (!this.isConfigured()) {
            console.log('WebSocket disabled: configure API_CONFIG.SOCKET_URL to connect.');
            return;
        }

        const token = await asyncStorage.getItem('authToken')
 
        this.socket?.disconnect();
        this.socket = io(API_CONFIG.SOCKET_URL, {
            auth: {token},
            transports: ['websocket']
        });
        return new Promise ((resolve, reject) => {
            this.socket!.on('connect',() => {
                this.isConnected = true;
                console.log('webSocket connected') //remover quando estiver testado e funcionado
 
            if(token) {
                this.socket!.emit('authenticate',{token});
            }
            resolve();
        });
        this.socket!.on('authenticated',(data) => {
            console.log(data.userId)
        });
        this.socket!.on('auth_error', (error) => {
            reject(error);
        });
        this.socket!.on('connect_error', (error) => {
            this.isConnected = false;
            reject(error);
        });
            this.socket!.on('disconnect',() => {
            this.isConnected = false;
        });
    });
    }
    disconnected(): void{
        if (this.socket){
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }
    //proximas funções seram implementadas com a construção da tela de chatroom
    joinRoom(roomId : string): void{this.socket?.emit('join-room', {roomId})}
    leaveRoom(roomId : string): void{this.socket?.emit('leave-room', {roomId})}
    sendMessage(roomId : string, message: string): void{this.socket?.emit('send-message', {roomId,message})}
    onMessage(callback:(data: any)=> void):void{this.socket?.on('new-message',callback)}
    onUserJoined(callback: (data:any) => void):void{this.socket?.on('user-joined',callback)}
    onUserLeft(callback: (data:any) => void):void{this.socket?.on('user-left',callback)}
    onMatchingFound(callback: (data:any) => void):void{this.socket?.on('match-found',callback)} 
    findMatch(category:string):void{this.socket?.emit('find-match',{category})}
    cancelMatch():void{
        this.socket?.removeAllListeners();
    }
    get connected(): boolean{
        return this.isConnected;
    }
}
export const wsService = new webSocketService();
