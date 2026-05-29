export interface IChat {
    id: number;
    name: string;
    is_group: boolean;
    avatar: string;
    adminId: number;
    chat_app_chat_users: {
        id: number;
        chat_id: number;
        user_id: number;
        user_app_user: {
            id: number;
            username: string;
            profile_app_profile: {
                id: number;
                avatar: string;
                pseudonym: string
            }
        }
    }[]
    chat_app_message: {
        id: number;
        text: string;
        created_at: Date;
        sender_id: number
    }[]
}
