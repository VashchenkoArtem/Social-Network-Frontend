import { COLORS } from "@shared/constants/colors";
import { IRadioTab } from "../additionalUrl/types";
import { ICONS } from "../icons/icons";
import { View } from "react-native";
import { Contacts } from "@modules/chats/ui/Contacts/Contacts";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { UnreadMessages } from "../unreadMessages/UndreadMessages";

export const getRadioTabsArray = (
    personalUnreadCount?: number,
    groupUnreadCount?: number,
): IRadioTab[] => [
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
                <UnreadMessages count={personalUnreadCount}/>
            </View>),
        content: (
            <View
                style={{ flex: 1, paddingBottom: 8, backgroundColor: COLORS.preWhite }}
            >
                <PersonalChats count={personalUnreadCount} />
            </View>
        ),
    },
    {
        title: "Групові чати",
        icon: (<View>
                <ICONS.ChatsPageIcon color = {COLORS.black}/>
                <UnreadMessages count={groupUnreadCount}/>
            </View>),
        content: (
            <View
                style={{ flex: 1, paddingBottom: 8, backgroundColor: COLORS.lightestGray }}
            >
                <GroupChats count={groupUnreadCount} />
            </View>
        ),
    },
]