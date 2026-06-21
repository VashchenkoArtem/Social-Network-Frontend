import { useUserContext } from "@modules/auth/context/user-context";
import { useGetGroupChatsQuery } from "@modules/chats/api/chatsApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame";
import { Redirect } from "expo-router";
import { useState } from "react";

export function GroupChats(){
    const [cursor, setCursor] = useState<number | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    
    const { 
        data, 
        isFetching,
        refetch
    } = useGetGroupChatsQuery({
        cursor: undefined,
        limit: 25
    }, {
        pollingInterval: 3000
    })
    const groupChats = data?.chats ?? []
    const hasMore = data?.meta.hasMore
    const loadMore = () => {
        if (isFetching) return;
        if (!hasMore) return;

        const lastChat = groupChats[groupChats.length - 1];
        if (!lastChat) return;

        setCursor(lastChat.id);
    };
    const onRefresh = async () => {
        setRefreshing(true);
        setCursor(null)
        await refetch();
        setRefreshing(false);
    }
    if (!groupChats) return null
    return (
        <ChatsFrame 
            isGroups={true} 
            items = {groupChats} 
            frameTitle="Групові чати" 
            Icon = {<ICONS.ChatsPageIcon color = {COLORS.gray} height={20}/>}
            onEndReached={loadMore}
        />
    )
}