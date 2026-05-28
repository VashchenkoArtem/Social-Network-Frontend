import { ICreateMessage, IMessage } from "@shared/types/message.types";

export interface ClientEvents {
    joinChat: (data: { chatId: number }) => void
    leaveChat: (data: { chatId: number }) => void
    sendMessage: (data: ICreateMessage) => void
}

export interface ServerEvents {
    newMessage: (message: IMessage) => void
}

export interface SocketData {
    userId: number;
}