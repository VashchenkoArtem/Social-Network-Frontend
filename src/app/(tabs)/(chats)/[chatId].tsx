import { useDeleteGroupChatMutation, useGetChatByIdQuery } from "@modules/chats/api/chatsApi"
import { Chat } from "@modules/chats/ui/Chat/Chat"

import { COLORS } from "@shared/constants/colors"
import { SERVER } from "@shared/constants/server"
import { ICONS } from "@shared/ui"
import { AdditionalUrls } from "@shared/ui/additionalUrl"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { getRadioTabsArray } from "@shared/ui/radiotabs/Radiotabs"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ChatScreen(){
    const params = useLocalSearchParams()
	const [chosenTab, setChosenTab] = useState<string>(params.is_group ? "Групові чати" : "Повідомлення");
    const chatId = 
        typeof params.chatId === 'string'
        ? Number(params.chatId)
        : undefined
    const radioTabsArray = getRadioTabsArray(Number(params.count))
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={["left", "right"]}>
            <AdditionalUrls
                chosenTab={chosenTab}
                setChosenTab={setChosenTab}
                radioTabsArray={radioTabsArray}
                chatContent={<Chat chatId={chatId}/>}
                isChats={true}
            />
        </SafeAreaView>
    )
}