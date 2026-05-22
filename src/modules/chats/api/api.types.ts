export interface IChatWithUsers {
    users: {
        user: {
            id: number
            username: string | null
            profile: {
                avatar: string | null
            } | null
        }
    }

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
