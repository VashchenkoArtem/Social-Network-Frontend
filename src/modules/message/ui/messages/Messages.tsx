import { useGetMessagesQuery } from "@modules/message/api/messageApi"
import { IMessagesProps } from "./messages.types"
import { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { Message } from "../message/Message"
import { COLORS } from "@shared/constants/colors"

export function Messages(props: IMessagesProps) {
    const { chatId } = props
    // const [ cursorId, setCursorId ] = useState<number>(0)

    const [cursor, setCursor] = useState<number | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const { 
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetMessagesQuery({
        chatId, 
        cursor, 
        limit: 25
    })
    
    const loadMore = () => {
        if (isLoadingMore) return

        const lastMessage = data?.messages?.[data.messages.length - 1]
        if (!lastMessage) return

        setIsLoadingMore(true)
        setCursor(lastMessage.id)
    }

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false)
        }
    }, [isFetching])

    const messages = data?.messages ?? []
    const hasMore = data?.meta.hasMore

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    // const [ getUnreadMessageFromChat ] = useGetUnreadMessageFromChatQuery(chatId)
    return (
        <FlatList
            inverted
            contentContainerStyle={{gap:10, paddingTop: 5, paddingBottom: 5}}
            data={messages}
            onEndReached={hasMore ? loadMore : undefined}
            keyExtractor={(item) => String(item.id)}
            renderItem={(item)=>{
                return (
                    <Message
                        data={item.item}
                    />
                )
            }}
        />
    )
}