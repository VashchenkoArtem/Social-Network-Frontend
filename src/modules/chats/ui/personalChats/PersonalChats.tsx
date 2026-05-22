import { useGetPersonalChatsQuery } from "@modules/chats/api/chatsApi"
import { COLORS } from "@shared/constants/colors"
import { ICONS } from "@shared/ui"
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame"
import { View } from "react-native"

export function PersonalChats(){
    const { data: personalChats } = useGetPersonalChatsQuery(undefined, {
        pollingInterval: 3000
    })
    console.log(personalChats, "personal")
    if (!personalChats) return null
    return (
        <View style = {{flex: 1}}>
            <ChatsFrame items = {personalChats} frameTitle="Повідомлення" Icon = {<ICONS.ChatsPageIcon color = {COLORS.gray} height={20}/>}/>
        </View>

    )
}