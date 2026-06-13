import { useGetMessagesQuery } from "@modules/message/api/messageApi"
import { IMessagesProps } from "./messages.types"
import { useState } from "react"
import { FlatList, ActivityIndicator } from "react-native"
import { Message } from "../message/Message"
import { COLORS } from "@shared/constants/colors"

export function Messages(props: IMessagesProps) {
    const { chatId } = props
    const [cursorId, setCursorId] = useState<number>(0)
    
    const { data: gotMessages, isFetching } = useGetMessagesQuery(
        { chatId: Number(chatId), cursorId, take: 10 },
        { skip: !chatId }
    )

    const handleLoadMore = () => {
        if (isFetching || !gotMessages || gotMessages.length < 10) return;
        
        const lastMessage = gotMessages[gotMessages.length - 1];
        if (lastMessage) {
            setCursorId(lastMessage.id);
        }
    }

    return (
        <FlatList
            contentContainerStyle={{ gap: 10, paddingTop: 5, paddingBottom: 5 }}
            data={gotMessages} 
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Message data={item} />}
            inverted
            
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            
            ListFooterComponent={
                isFetching ? <ActivityIndicator size="small" color={COLORS.plum} /> : null
            }
        />
    )
}