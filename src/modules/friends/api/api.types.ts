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
    status: "pending" | "accepted" | "canceled"
    
}

export interface RecommendedResponse{
    data: IUser[],
    meta: {
        nextCursor: number,
        hasMore: boolean
    }
}
export interface RecommendedPayload{
    cursor?: number;
    limit: number
}