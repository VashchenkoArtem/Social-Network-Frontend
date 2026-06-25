import { Chat } from "@modules/chats/ui/Chat/Chat"
import { COLORS } from "@shared/constants/colors"
import { AdditionalUrls } from "@shared/ui/additionalUrl"
import { getRadioTabsArray } from "@shared/ui/radiotabs/Radiotabs"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
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