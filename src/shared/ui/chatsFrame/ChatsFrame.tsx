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
import { UnreadMessages } from "../unreadMessages/UndreadMessages"
import { useGetUnreadMessageFromChatQuery } from "@modules/message/api/messageApi"

export function ChatsFrame(props: IChatProps) {
    const { Icon, frameTitle, items, unreadMessagesCount, isGroups, onEndReached } = props;
    const { data } = useGetUnreadMessageFromChatQuery()
    const unreadMap: Record<number, number> = data ?? {};
    const [search, setSearch] = useState("");
    const filteredMessages = items?.filter(item => {
        if (!search.trim()) return true

        const searchLw = search.toLowerCase()

        return item.name?.toLowerCase().includes(searchLw)
    }) ?? []
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                <View>
                    {Icon}  
                    <UnreadMessages count={unreadMessagesCount}/>
                </View>
                <Text style={styles.frameTitle}>{frameTitle}</Text>
            </View>
            <Input 
                value = {search}
                onChangeText = {setSearch}
                iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} 
                placeholder="Пошук" 
                notMarginBottom={true}
            />                    

            <FlatList
                keyExtractor={item => String(item.id)}
                contentContainerStyle={{gap: 10, paddingTop: 10}}
                data = {filteredMessages}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.3}
                renderItem={({ item }) => {
                    return <PersonalChatFrame isGroupChat={isGroups} chat = {item} chatUnreadCount={unreadMap[item.id]}/>
                }}
            />
        </View>
    );
}