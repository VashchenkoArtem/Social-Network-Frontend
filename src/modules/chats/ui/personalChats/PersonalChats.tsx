import { useUserContext } from "@modules/auth/context/user-context"
import { useGetPersonalChatsQuery } from "@modules/chats/api/chatsApi"
import { COLORS } from "@shared/constants/colors"
import { ICONS } from "@shared/ui"
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame"
import { Redirect } from "expo-router"
import { View } from "react-native"

export function PersonalChats(props: {count?: number}){
    const { count } = props
    const { data: personalChats } = useGetPersonalChatsQuery(undefined, {
        pollingInterval: 3000
    })
    const { user } = useUserContext()!
    if (!user) {
        return <Redirect href={"/login"}/>
    }
    return (
        <View style = {{flex: 1, gap: 6}}>
            <ChatsFrame unreadMessagesCount = {count} items = {personalChats} frameTitle="Повідомлення" Icon = {<ICONS.ChatsPageIcon color = {COLORS.gray} height={20}/>}/>
        </View>
    )
}