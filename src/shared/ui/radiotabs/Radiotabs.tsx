import { COLORS } from "@shared/constants/colors";
import { IRadioTab } from "../additionalUrl/types";
import { ICONS } from "../icons/icons";
import { View } from "react-native";
import { Contacts } from "@modules/chats/ui/Contacts/Contacts";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { UnreadMessages } from "../unreadMessages/UndreadMessages";

export const getRadioTabsArray = (unreadCount?: number): IRadioTab[] => [
    {
        title: "Контакти",
        icon: <ICONS.FriendsPageIcon color = {COLORS.black}/>,
        content: (
            <View
                style={{ flex: 1, paddingBottom: 8, backgroundColor: COLORS.preWhite }}
            >
                <Contacts/>
            </View>
        ),
    },
    {
        title: "Повідомлення",
        icon: (<View>
                <ICONS.ChatsPageIcon color = {COLORS.black}/>
                <UnreadMessages count={unreadCount}/>
            </View>),
        content: (
            <View
                style={{ flex: 1, paddingBottom: 8, backgroundColor: COLORS.preWhite }}
            >
                <PersonalChats count={unreadCount} />
            </View>
        ),
    },
    {
        title: "Групові чати",
        icon: <ICONS.ChatsPageIcon color = {COLORS.black}/>,
        content: (
            <View
                style={{ flex: 1, paddingBottom: 8, backgroundColor: COLORS.lightestGray }}
            >
                <GroupChats />
            </View>
        ),
    },
]