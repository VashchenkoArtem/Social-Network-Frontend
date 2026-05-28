import { FriendRequest } from "@modules/friends/api/api.types";
import { SERVER } from "@shared/constants/server";
import { IChatProps } from "@shared/ui/chatsFrame/types";
import { View, Image } from "react-native";

export function ContactCard(props: {friend: FriendRequest}){
    const { friend } = props
    return (
        <View>
            <Image
                source = {{uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${friend.user_app_user_user_app_friendship_from_user_idTouser_app_user.profile_app_profile.avatar}`}}
            ></Image>
        </View>
    )
}