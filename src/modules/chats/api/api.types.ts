export interface IChatWithUsers {
    chat_app_chat_users: {
            id: number
            user_app_user: {
                id: number
                username: string
                profile_app_profile: {
                    avatar: string | null;
                    pseudonym: string | null
                }
            }
    }[]

    id: number
    name: string
    is_group: boolean
    avatar: string
    adminId: number
}
export interface IChat {
    id: number;
    name: string;
    is_group: boolean;
    avatar: string;
    adminId: number;
}
