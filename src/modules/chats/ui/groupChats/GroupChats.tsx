import { useGetGroupChatsQuery } from "@modules/chats/api/chatsApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame";
import { View } from "react-native";

export function GroupChats(){
    const { data: groupChats } = useGetGroupChatsQuery(undefined, {
        pollingInterval: 3000
    })
    if (!groupChats) return null
    return (
        <View style = {{flex: 1}}>
            <ChatsFrame items = {groupChats} frameTitle="Групові чати" Icon = {<ICONS.ChatsPageIcon color = {COLORS.gray} height={20}/>}/>
        </View>

    )
    
}