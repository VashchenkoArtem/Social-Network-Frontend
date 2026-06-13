import { useUserContext } from "@modules/auth/context/user-context";
import { useGetGroupChatsQuery } from "@modules/chats/api/chatsApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { ChatsFrame } from "@shared/ui/chatsFrame/ChatsFrame";
import { Redirect } from "expo-router";

export function GroupChats(){
    const { data: groupChats } = useGetGroupChatsQuery(undefined, {
        pollingInterval: 3000
    })
    const { user } = useUserContext()!
    if (!user) {
        return <Redirect href={"/login"}/>
    }
    if (!groupChats) return null
    return (
        <ChatsFrame isGroups={true} items = {groupChats} frameTitle="Групові чати" Icon = {<ICONS.ChatsPageIcon color = {COLORS.gray} height={20}/>}/>
    )
}