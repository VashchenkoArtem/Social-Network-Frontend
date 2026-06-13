import { IMessage } from "@shared/types/message.types";

export interface IMessageQuery {
    chatId: number,
    cursorId: number,
    take: number   
}
export type IUnreadMessageFromChatResponse = any

