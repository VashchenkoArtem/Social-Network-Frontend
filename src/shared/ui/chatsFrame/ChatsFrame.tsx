import { FlatList, View, Image, Text } from "react-native";
import { styles } from "./styles";
import { IChatProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { Input } from "../input";
import { SearchIcon } from "../icons/inputs/Search";
import { COLORS } from "@shared/constants/colors";
import { FriendRequest } from "@modules/friends/api/api.types";

export function ChatsFrame(props: IChatProps) {
    const { Icon, frameTitle, items } = props;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                {Icon}
                <Text style={styles.frameTitle}>{frameTitle}</Text>
            </View>
            <Input iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} placeholder="Пошук" />
            
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    let chatName = item.name;
                    let chatAvatar = item.avatar;

                    if (!item.is_group) {
                        const companion = item.users?.[0]?.user;
                        chatName = companion?.username || "Користувач";
                        chatAvatar = companion?.profile?.avatar || "default-avatar.png";
                    }

                    const avatarUri = `http://${SERVER.host}:${SERVER.port}/media/thumb/${chatAvatar}`;

                    return (
                        <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 12 }}>
                            <Image 
                                source={{ uri: avatarUri }} 
                                style={{ width: 46, height: 46, borderRadius: 23 }}
                            />
                            <Text style={styles.groupName}>{chatName}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}