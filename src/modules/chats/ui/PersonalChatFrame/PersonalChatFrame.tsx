import { IChat } from "@modules/chats/api/api.types";
import { socket } from "@shared/socket/socket";
import { getAvatar } from "@shared/utils/avatar";
import { getOtherUser } from "@shared/utils/friends";
import { useRouter } from "expo-router";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";

export function PersonalChatFrame(props: {chat: IChat}){
    const { chat } = props
    const router = useRouter()
    const participantUser = chat.chat_app_chat_users[0].user_app_user
    return (
        <TouchableOpacity
            style={{ flexDirection: "row", gap: 12 }}
            onPress={() => {
                socket.emit("joinChat", {
                    chatId: chat.id
                });

                router.push(`(chats)/${chat.id}`);
            }}
        >
            <Image
                source={{
                    uri: getAvatar(participantUser.profile_app_profile.avatar)
                }}
                style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.gray }}
            />

            <View style = {{ justifyContent: "center", flex: 1}}>
                <View style = {{ flexDirection: "row",flex: 1, justifyContent: "space-between"}}>
                    <Text style={styles.groupName}>
                        {participantUser.username || "Unknown user"}
                    </Text>
                    { chat.chat_app_message.length > 0 && (
                        <Text style = {{ fontWeight: 400, color: COLORS.gray, fontSize: 12}}>{new Date(chat.chat_app_message[0].created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}</Text>
                    )}
                </View>
                { chat.chat_app_message.length > 0 && (
                    <Text style={styles.lastMessage}>
                        {chat.chat_app_message[0].text}
                    </Text>
                )}

            </View>
        </TouchableOpacity>
    )
}