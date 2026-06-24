import { IChat } from "@modules/chats/api/api.types";
import { socket } from "@shared/socket/socket";
import { getAvatar } from "@shared/utils/avatar";
import { getOtherUser } from "@shared/utils/friends";
import { useRouter } from "expo-router";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { SmallUserCard } from "@shared/ui/smallUserCard/SmallUserCard";

export function PersonalChatFrame(props: {chat: IChat, chatUnreadCount?: number, isGroupChat?: boolean, onlineUsersIds?: number[]}){
    const { chat, chatUnreadCount, isGroupChat, onlineUsersIds } = props
    const router = useRouter()
    const participantUser = chat.chat_app_chat_users[0]?.user_app_user
    return (
        <TouchableOpacity
            style={[{ flexDirection: "row", gap: 12 }]}
            onPress={() => {
                socket.emit("joinChat", {
                    chatId: chat.id
                });
                const query = chat.is_group ? "?is_group=true" : ""
                router.push(`(chats)/${chat.id}${query}`);
            }}
        >
            <SmallUserCard 
                pseudonym={isGroupChat ? chat.name : participantUser.profile_app_profile.pseudonym} 
                avatar={isGroupChat ? chat.avatar : participantUser.profile_app_profile.avatar} 
                isGroup={isGroupChat}
                groupName={chat.name}
                lastMessage={
                    chat.chat_app_message &&
                    chat.chat_app_message.length !== 0
                        ? chat.chat_app_message[0].text
                        : undefined
                    }
                time={
                    chat.chat_app_message &&
                    chat.chat_app_message.length !== 0
                        ? chat.chat_app_message[0].created_at
                        : undefined
                    }
                unreadCount={chatUnreadCount}
                isOnline={onlineUsersIds?.includes(participantUser.id)}
                />
        </TouchableOpacity>
    )
}