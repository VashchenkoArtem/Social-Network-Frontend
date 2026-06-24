import { IUser } from "@shared/types/user.types";
import { TouchableOpacity, Text } from "react-native";
import { useCreateChatMutation } from "@modules/chats/api/chatsApi";
import { useRouter } from "expo-router";
import { socket } from "@shared/socket/socket";
import { SmallUserCard } from "@shared/ui/smallUserCard/SmallUserCard";

export function ContactCard(props: {friend: IUser, isOnline?: boolean}){
    const [ createChat ] = useCreateChatMutation()
    const { friend, isOnline } = props
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
            <SmallUserCard pseudonym={friend.profile_app_profile.pseudonym} avatar={friend.profile_app_profile.avatar} isOnline={isOnline} />
        </TouchableOpacity>
    )
}