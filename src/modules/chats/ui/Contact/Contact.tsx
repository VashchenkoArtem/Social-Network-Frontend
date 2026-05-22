import { FriendRequest } from "@modules/friends/api/api.types";
import { SERVER } from "@shared/constants/server";
import { IChatProps } from "@shared/ui/chatsFrame/types";
import { View, Image } from "react-native";

export function ContactCard(props: {friend: FriendRequest}){
    const { friend } = props
    return (
        <View>
            <Image
                source = {{uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${friend.from_profile.profile.avatar}`}}
            ></Image>
        </View>
    )
}