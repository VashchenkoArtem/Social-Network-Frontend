export interface IMessageResponse {
    data: IMessage[]
    meta: {

    }
}
export interface IMessage{
    id: number;
    created_at: Date;
    text: string;
    chat_id: number;
    sender_id: number;
    user_app_user: {
        id: number;
        username: string;
        profile_app_profile: {
            id: number;
            avatar: string;
            pseudonym: string
        }
    },
    chat_app_messageimage?: {
        id: number,
        image: string
    }[]
}
export interface ICreateMessage{
    id?: number;
    created_at?: Date;
    text: string;
    chat_id: number;
    sender_id: number;
    username: string;
    avatar: string;
    photos?: string[]
}