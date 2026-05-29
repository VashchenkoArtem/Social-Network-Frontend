import { useUserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";
import { SERVER } from "@shared/constants/server";
import { IUser } from "@shared/types/user.types";
import { IChatProps } from "@shared/ui/chatsFrame/types";
import { getAvatar } from "@shared/utils/avatar";
import { getOtherUser } from "@shared/utils/friends";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useCreateChatMutation } from "@modules/chats/api/chatsApi";
import { useRouter } from "expo-router";
import { socket } from "@shared/socket/socket";
import { COLORS } from "@shared/constants/colors";

export function ContactCard(props: {friend: IUser}){
    const [ createChat ] = useCreateChatMutation()
    const { friend } = props
    const router = useRouter()
    return (
        <TouchableOpacity onPress={async () => {
            const chat = await createChat({
                name: "",
                userIds: [friend.id]
            }).unwrap()
            socket.emit("joinChat", {
                chatId: chat.id
            })
            router.push(`/(chats)/${chat.id}`)
        }}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <Image
                    source={{ uri: getAvatar(friend.profile_app_profile.avatar) }}
                    style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.gray }}
                />
                <Text style = {styles.groupName}>{friend.username}</Text>
            </View>
        </TouchableOpacity>
    )
}