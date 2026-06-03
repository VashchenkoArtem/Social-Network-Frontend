import { IChat } from "@modules/chats/api/api.types";
import { socket } from "@shared/socket/socket";
import { getAvatar } from "@shared/utils/avatar";
import { getOtherUser } from "@shared/utils/friends";
import { useRouter } from "expo-router";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";
import { SmallUserCard } from "@shared/ui/smallUserCard/SmallUserCard";

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
            <SmallUserCard 
                username={participantUser.username} 
                avatar={participantUser.profile_app_profile.avatar} 
                lastMessage={
                    chat.chat_app_message.length !== 0
                        ? chat.chat_app_message[0].text
                        : undefined
                    }
                time={chat.chat_app_message.length !== 0
                        ? chat.chat_app_message[0].created_at
                        : undefined
                    }
                />
        </TouchableOpacity>
    )
}