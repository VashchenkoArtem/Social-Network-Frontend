import { COLORS } from "@shared/constants/colors";
import { IRadioTab } from "../additionalUrl/types";
import { ICONS } from "../icons/icons";
import { View } from "react-native";
import { Contacts } from "@modules/chats/ui/Contacts/Contacts";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";

export const radioTabsArray: IRadioTab[] = [
    {
        title: "Контакти",
        icon: <ICONS.FriendsPageIcon color = {COLORS.black}/>,
        content: (
            <View
                style={{ flex: 1, marginBottom: 48 }}
            >
                <Contacts></Contacts>
            </View>
        ),
    },
    {
        title: "Повідомлення",
        icon: <ICONS.ChatsPageIcon color = {COLORS.black}/>,
        content: (
            <View
                style={{ flex: 1, marginBottom: 48 }}
            >
                <PersonalChats />
            </View>
        ),
    },
    {
        title: "Групові чати",
        icon: <ICONS.ChatsPageIcon color = {COLORS.black}/>,
        content: (
            <View
                style={{ flex: 1, marginBottom: 48 }}
            >
                <GroupChats />
            </View>
        ),
    },
];