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
import { PersonalChatFrame } from "@modules/chats/ui/PersonalChatFrame/PersonalChatFrame"
import { useState } from "react"

export function ChatsFrame(props: IChatProps) {
    const { Icon, frameTitle, items } = props;

    const { user } = useUserContext()!;

    const [search, setSearch] = useState("");
    console.log(items)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                {Icon}
                <Text style={styles.frameTitle}>{frameTitle}</Text>
            </View>
            <Input iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} placeholder="Пошук" notMarginBottom={true}/>
            
            <FlatList
                contentContainerStyle = {styles.itemList}
                keyExtractor={item => String(item.id)}
                data = {items}
                    renderItem={({ item }) => {
                        return <PersonalChatFrame chat = {item}/>
                    }}
            />

        </View>
    );
}