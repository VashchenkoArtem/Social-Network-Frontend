import { ICreateMessage, IMessage } from "@shared/types/message.types";

export interface ClientEvents {
    joinChat: (data: { chatId: number }) => void
    leaveChat: (data: { chatId: number }) => void
    sendMessage: (data: ICreateMessage) => void
    getOnlineUsers: () => void;
    messageSent: (data: {
        chat_id: number;
        tempId: string;
    }) => void;
}

export interface ServerEvents {
    newMessage: (message: IMessage) => void;

    userOnline: (data: { userId: number }) => void;
    userOffline: (data: { userId: number }) => void;
    onlineUsersList: (users: number[]) => void;
}

export interface SocketData {
    userId: number;
}