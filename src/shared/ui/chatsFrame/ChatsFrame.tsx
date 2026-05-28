import { FlatList, View, Image, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { IChatProps } from "./types"
import { SERVER } from "@shared/constants/server"
import { Input } from "../input"
import { SearchIcon } from "../icons/inputs/Search"
import { COLORS } from "@shared/constants/colors"
import { useRouter } from "expo-router"
import { socket } from "@shared/socket/socket"
import { useUserContext } from "@modules/auth/context/user-context"

export function ChatsFrame(props: IChatProps){
    const {Icon, frameTitle, items} = props
    const { user } = useUserContext()!
    const router = useRouter()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                {Icon}
                <Text style={styles.frameTitle}>{frameTitle}</Text>
            </View>
            <Input iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} placeholder="Пошук" notMarginBottom={true}/>
            
            <FlatList
                contentContainerStyle = {styles.itemList}
                data = {items}
                    renderItem={({ item }) => {
                        const currentUserId = user.id;

                        const otherUser = item.chat_app_chat_users.find(
                            (u) => u.user_app_user.id !== currentUserId
                        )?.user_app_user;

                        return (
                            <TouchableOpacity
                                style={{ flexDirection: "row", gap: 12 }}
                                onPress={() => {
                                    socket.emit("joinChat", {
                                        chatId: item.id
                                    });

                                    router.push(`(chats)/${item.id}`);
                                }}
                            >
                                <Image
                                    source={{
                                        uri: otherUser?.profile_app_profile?.avatar
                                            ? `http://${SERVER.host}:${SERVER.port}${otherUser.profile_app_profile.avatar}`
                                            : "https://via.placeholder.com/46"
                                    }}
                                    style={{ width: 46, height: 46, borderRadius: 123 }}
                                />

                                <View>
                                    <Text style={styles.groupName}>
                                        {otherUser?.username || "Unknown user"}
                                    </Text>

                                    <Text style={{ color: "gray", fontSize: 12 }}>
                                        {otherUser?.profile_app_profile.pseudonym}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
            />

        </View>
    );
}