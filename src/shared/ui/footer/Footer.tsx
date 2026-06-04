import { View, Text } from "react-native";
import { Url } from "../url";
import { ICONS } from "../icons/icons";
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";
import { useGetAllUnreadMessageQuery } from "@modules/message/api/messageApi";

const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS;

export function Footer() {
	const { data: unreadMessages = [] } = useGetAllUnreadMessageQuery(undefined, {
		pollingInterval: 3000
	});
	const totalUnreadCount = unreadMessages.length;
	return (
		<View style={styles.urlsContainer}>
			<Url
				href={"/"}
				text="Головна"
				icon={<MainPageIcon style={styles.urlIcon} color={COLORS.black} />}
			></Url>
			<Url
				href={"/posts"}
				text="Мої публікації"
				icon={<MyPostsPageIcon style={styles.urlIcon} color={COLORS.black} />}
			></Url>
			<Url
				href={"/friends/main"}
				text="Друзі"
				icon={<FriendsPageIcon style={styles.urlIcon} color={COLORS.black} />}
				isFriends={true}
			></Url>
			<Url
				href={"/contacts"}
				text="Чати"
				icon={<ChatsPageIcon style={styles.urlIcon} color={COLORS.black} />}
				isChat={true}
				unreadCount={totalUnreadCount} 
			></Url>
		</View>
	);
}
