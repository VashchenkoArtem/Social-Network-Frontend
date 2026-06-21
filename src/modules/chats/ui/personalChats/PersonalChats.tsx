import { useUserContext } from "@modules/auth/context/user-context"
import { useGetPersonalChatsQuery } from "@modules/chats/api/chatsApi"
import { COLORS } from "@shared/constants/colors"
import { ICONS } from "@shared/ui"
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame"
import { useState } from "react"
import { View } from "react-native"

export function PersonalChats(props: {count?: number}){
    const { count } = props

    const [cursor, setCursor] = useState<number | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])
    const { 
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetPersonalChatsQuery({
        cursor: undefined,
        limit: 25
    })
    const personalChats = data?.chats ?? []
    const hasMore = data?.meta.hasMore
    const loadMore = () => {
        if (isFetching) return;
        if (!hasMore) return;

        const lastChat = personalChats[personalChats.length - 1];
        if (!lastChat) return;

        setCursor(lastChat.id);
    };
    const onRefresh = async () => {
        setRefreshing(true);
        setCursor(null)
        await refetch();
        setRefreshing(false);
    }

    return (
        <View style = {{flex: 1, gap: 6}}>
            <ChatsFrame 
                unreadMessagesCount = {count} 
                items = {personalChats} 
                frameTitle="Повідомлення" 
                Icon = {<ICONS.ChatsPageIcon 
                color = {COLORS.gray} height={20}/>}
                onEndReached={loadMore}
            />
        </View>
    )
}