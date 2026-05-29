import { FriendRequest } from "@modules/friends/api/api.types"
import { IUser } from "@shared/types/user.types"

export function getOtherUser(friendRequest: FriendRequest, userFromContext: IUser){
    if (userFromContext.id === friendRequest.user_app_user_user_app_friendship_from_user_idTouser_app_user.id) {
        return friendRequest.user_app_user_user_app_friendship_from_user_idTouser_app_user
    }else{
        return friendRequest.user_app_user_user_app_friendship_to_user_idTouser_app_user
    }
}