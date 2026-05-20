import { useCallback, useEffect, useState } from 'react';

import { ChatMessage } from '../constants/types';

import { wsService } from '../services/websocket';

export function useChat(category: string) {

    const [messages, setMessages] =
        useState<ChatMessage[]>([]);

    // MATCH REAL
    const [hasMatch, setHasMatch] =
        useState(false);

    const [isMatching, setIsMatching] =
        useState(false);

    const [currentRoomId, setCurrentRoomId] =
        useState<string | null>(null);

    const [partnerName, setPartnerName] =
        useState<string>('Procurando...');

    // =========================
    // NOVA MENSAGEM
    // =========================
    const handleNewMessage = useCallback((data: any) => {

        console.log(
            '📩 New message received:',
            data
        );

        const newMessage: ChatMessage = {

            id: data.id,

            text: data.message,

            isUser: false,

            timestamp: new Date(data.timestamp),

            username:
                data.username || 'Desconhecido'
        };

        setMessages(prev => [
            ...prev,
            newMessage
        ]);

    }, []);

    // =========================
    // MATCH ENCONTRADO
    // =========================
    const handleMatchFound = useCallback((data: any) => {

        console.log(
            '🎯 Match found:',
            data
        );

        setCurrentRoomId(data.roomId);

        // entra na sala
        wsService.joinRoom(data.roomId);

        // AGORA TEM MATCH
        setHasMatch(true);

        // NÃO está mais procurando
        setIsMatching(false);

        // limpa mensagens antigas
        setMessages([]);

        // nome parceiro
        setPartnerName(
            data.partner?.username || 'Stranger'
        );

    }, []);

    // =========================
    // PARCEIRO SAIU
    // =========================
    const handleUserLeft = useCallback(() => {

        console.log(
            '🚪 Partner left'
        );

        // perdeu match
        setHasMatch(false);

        // volta busca
        setIsMatching(true);

        // limpa sala
        setCurrentRoomId(null);

        // limpa mensagens
        setMessages([]);

        // reset parceiro
        setPartnerName('Procurando...');

        // busca automática
        setTimeout(() => {

            wsService.findMatch(category);

        }, 1000);

    }, [category]);

    // =========================
    // STATUS FILA
    // =========================
    const handleQueueStatus = useCallback((data: any) => {

        console.log(
            '📊 Queue status:',
            data
        );

        // está procurando
        setIsMatching(true);

        // ainda sem parceiro
        setHasMatch(false);

    }, []);

    // =========================
    // SOCKET INIT
    // =========================
    useEffect(() => {

        const initializeWebSocket = async () => {

            try {

                // conecta websocket
                if (!wsService.connected) {

                    await wsService.connect();
                }

                const socket =
                    wsService.socket;

                // =========================
                // LISTENERS
                // =========================
                wsService.onMessage(
                    handleNewMessage
                );

                wsService.onMatchingFound(
                    handleMatchFound
                );

                socket?.on(
                    'queue-status',
                    handleQueueStatus
                );

                socket?.on(
                    'partner_left',
                    handleUserLeft
                );

                socket?.on(
                    'partner_disconnected',
                    handleUserLeft
                );

                console.log(
                    '🔎 Starting automatic match search:',
                    category
                );

                // inicia busca
                wsService.findMatch(category);

                setIsMatching(true);

            } catch (error) {

                console.error(
                    '❌ WebSocket connection failed:',
                    error
                );
            }
        };

        initializeWebSocket();

        // =========================
        // CLEANUP
        // =========================
        return () => {

            const socket =
                wsService.socket;

            socket?.off(
                'new-message',
                handleNewMessage
            );

            socket?.off(
                'match-found',
                handleMatchFound
            );

            socket?.off(
                'queue-status',
                handleQueueStatus
            );

            socket?.off(
                'partner_left',
                handleUserLeft
            );

            socket?.off(
                'partner_disconnected',
                handleUserLeft
            );
        };

    }, [
        category,
        handleNewMessage,
        handleMatchFound,
        handleUserLeft,
        handleQueueStatus
    ]);

    // =========================
    // ENVIAR MENSAGEM
    // =========================
    const sendMessage = async (
        text: string
    ) => {

        if (
            !text.trim() ||
            !currentRoomId
        ) return;

        const newMessage: ChatMessage = {

            id: Date.now().toString(),

            text: text.trim(),

            isUser: true,

            timestamp: new Date(),

            username: 'Você'
        };

        setMessages(prev => [
            ...prev,
            newMessage
        ]);

        try {

            wsService.sendMessage(
                currentRoomId,
                text.trim()
            );

        } catch (error) {

            console.error(
                '❌ Error sending message:',
                error
            );
        }
    };

    // =========================
    // NOVO PARCEIRO
    // =========================
    const findNewPartner = async () => {

        if (currentRoomId) {

            wsService.leaveRoom(
                currentRoomId
            );
        }

        // reset estados
        setHasMatch(false);

        setIsMatching(true);

        setMessages([]);

        setCurrentRoomId(null);

        setPartnerName(
            'Procurando...'
        );

        try {

            wsService.findMatch(
                category
            );

        } catch (error) {

            console.error(
                '❌ Error finding match:',
                error
            );

            setIsMatching(false);
        }
    };

    // =========================
    // UNMOUNT CLEANUP
    // =========================
    useEffect(() => {

        return () => {

            if (currentRoomId) {

                wsService.leaveRoom(
                    currentRoomId
                );
            }
        };

    }, [currentRoomId]);

    return {

        messages,

        // AGORA REFLETE MATCH REAL
        isConnected: hasMatch,

        isMatching,

        partnerName,

        sendMessage,

        findNewPartner
    };
}