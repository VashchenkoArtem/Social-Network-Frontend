import { useGetMessagesQuery, useGetUnreadMessageFromChatQuery } from "@modules/message/api/messageApi"
import { IMessagesProps } from "./messages.types"
import { useState } from "react"
import { FlatList } from "react-native"
import { Message } from "../message/Message"

export function Messages(props: IMessagesProps) {
    const { chatId } = props
    const [ cursorId, setCursorId ] = useState<number>(0)
    const { data: gotMessages} = useGetMessagesQuery({chatId, cursorId, take: 10})
    // const [ getUnreadMessageFromChat ] = useGetUnreadMessageFromChatQuery(chatId)
    return (
        <FlatList
            contentContainerStyle={{gap:10, marginTop: 25}}
            data={gotMessages} 
            // keyExtractor={(item) => (item.id)}
            renderItem={(item)=>{
                return (
                    <Message
                        data={item.item}
                    />
                )
            }}
            inverted
        />
    )
}