// export interface IMessageResponse {
//     data: IMessage[]
//     meta: {

//     }
// }

export interface PaginatedMessageResponse {
    messages: IMessage[]
    meta: {
        nextCursor: number | null;
        hasMore: boolean
    }
}

export interface MessagePayload {
    chatId: number;
    cursor?: number | null;
    limit?: number;
}
export interface IMessage{
    id: number;
    created_at: Date;
    text: string;
    chat_id: number;
    sender_id: number;
    user_app_user: {
        id: number;
        profile_app_profile: {
            id: number;
            avatar: string;
            pseudonym: string
        }
    },
    chat_app_messageimage?: {
        id: number,
        image: string
    }[],
    chat_app_message_readers?: {
        user_id: number
    }[]
}
export interface ICreateMessage{
    tempId?: string;
    created_at?: Date;
    text: string;
    chat_id: number;
    sender_id: number;
    pseudonym: string;
    avatar: string;
    photos?: string[];
    status?: string
}