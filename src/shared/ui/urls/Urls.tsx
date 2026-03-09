import { View } from "react-native";
import { Url } from "../url";
import { ICONS } from "../icons/icons";
import { COLORS } from "shared/constants/colors";
import { styles } from "./styles";

const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS

export function Urls() {
    return (
        <View style={styles.urlsContainer}>
            <Url text="Головна" icon={<MainPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url text="Мої публікації" icon={<MyPostsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url text="Друзі" icon={<FriendsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
            <Url text="Чати" icon={<ChatsPageIcon style={styles.urlIcon} color={COLORS.urlBlue}/>}></Url>
        </View>
    )
}