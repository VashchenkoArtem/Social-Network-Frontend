import { View } from "react-native";
import { Url } from "../url";
import { ICONS } from "../icons/icons";
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";

const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS

export function Urls() {
    return (
        <View style={styles.urlsContainer}>
            <Url href = {"/"} text="Головна" icon={<MainPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url href = {"/posts"} text="Мої публікації" icon={<MyPostsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url href = {"/friends"} text="Друзі" icon={<FriendsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url href = {"/chats"} text="Чати" icon={<ChatsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
        </View>
    )
}