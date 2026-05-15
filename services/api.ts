import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { API_CONFIG } from './config';
 
class ApiService {
    private baseUrl: string;
 
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }
    private isDevFallback() {
        // If BASE_URL is a placeholder or empty, enable a local dev fallback
        return !this.baseUrl || this.baseUrl.includes('MEU SERVIDOR');
    }
    private async getAuthToken(): Promise<string | null> {
        return await AsyncStorage.getItem('authToken');
    }
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = await this.getAuthToken()
        const config : RequestInit = {
            ...options,
            headers: {
                'Content-Type' : 'application/json',
                ...(token && {Authorization : `Bearer ${token}`}),
                ...options.headers,
            },
        };
        const response = await fetch(`${this.baseUrl}${endpoint}`,config);
        if(!response.ok){
            const error = await response.json().catch(() => ({message: 'Network error'}));
            throw new Error(error.message || 'Request Failed')
        }
        if (response.status === 204) {
            return undefined as T;
        }
        return response.json();
    }

    async Login(email: string, password:string){
        if (this.isDevFallback()) {
            // Dev fallback: create fake token and user
            const fake = { token: 'dev-token', user: { id: 'dev-user', name: email.split('@')[0], email } };
            await AsyncStorage.setItem('authToken', fake.token);
            return { token: fake.token, user: fake.user };
        }
        const response = await this.request<{ success: boolean; data: {token: string, user: any}}>('/auth/login',{
            method: 'POST',
            body: JSON.stringify({email,password})
        });
        if(response.data?.token){
            await AsyncStorage.setItem('authToken', response.data.token)
        }
        return response.data;
    }
    async Register(username: string, email: string, password: string){
        if (this.isDevFallback()) {
            // Dev fallback: pretend registration succeeded and return a fake token/user
            const fake = { token: 'dev-token', user: { id: 'dev-user', name: username || email.split('@')[0], email } };
            await AsyncStorage.setItem('authToken', fake.token);
            return { token: fake.token, user: fake.user };
        }
        const response = await this.request<{ success: boolean; data: {token:string; user: any}}>('/auth/register',{
            method: 'POST',
            body: JSON.stringify({username, email, password})
        });
        if(response.data?.token){
            await AsyncStorage.setItem('authToken', response.data.token); 
        }
        return response.data;
        }
        async logout() {
            if (this.isDevFallback()) {
                await AsyncStorage.removeItem('authToken');
                return;
            }
            await this.request('/auth/logout', {method: 'POST'});
            await AsyncStorage.removeItem('authToken');
        }
        async getProfile(){
                            if (this.isDevFallback()) {
                                    const token = await this.getAuthToken();
                                    if (!token) throw new Error('Not authenticated');
                                    // return a fake profile based on token
                                    return { user: { id: 'dev-user', name: 'dev', email: 'dev@local' } };
                            }
                            const response = await this.request<{success: boolean; data: {user: any}}>
                            ('/auth/profile')
                        return response.data;
        }
        async getRooms(){
            const response = await this.request<{success: boolean; data: {rooms: any[]}}>
        ('/chat/rooms')
        return response.data;
        }
        async getRoomMessages(roomId : string){
            const response = await this.request<{success:boolean; data: {messages:any []}}>
            (`/chat/rooms/${roomId}/messages`)
            return response.data
        }
        async sendMessage(roomId: string, text:string){

            await this.request(`/chat/rooms/${roomId}/message`, {
                method: 'POST',
                body: JSON.stringify({text})
            });
        }
            async findMatch(category: string){
                const response = await this.request<{success: boolean; data: {roomId:string}}>('/matching/find',{
                    method: 'POST',
                    body: JSON.stringify({category})
                })
                return response.data;
            }
        }

export const apiService = new ApiService();
 



