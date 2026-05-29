import { IUser } from "@shared/types/user.types"

export interface FriendRequest {
    id: number
    status: string | null
    senderId: number
    receiverId: number
    user_app_user_user_app_friendship_to_user_idTouser_app_user: IUser
    user_app_user_user_app_friendship_from_user_idTouser_app_user: IUser
}
export interface CreateFriendRequest {
    status?: string;
    senderId?: number;
    receiverId: number;
}

export interface UpdateFriendRequest {
    requestId: number
    status: "Pending" | "Accepted" | "Canceled"
    
}

export interface UserWithoutPassword {
    id: number;
    firstname: string | null;
    lastname: string | null;
    nickname: string | null;
    alias: string | null;
    email: string;
    signature: string | null;
    birthDate: Date | null;
    avatars: { id: number; filename: string }[];
}