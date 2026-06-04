import { Tabs, usePathname } from "expo-router";
import { ICONS } from "@shared/ui";
import { constStyles } from "@shared/constants/styles";
import { Header } from "@shared/ui/header";
import { Pressable, View } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { StyleSheet, Text } from "react-native";
import { useGetAllUnreadMessageQuery } from "@modules/message/api/messageApi";

const styles = StyleSheet.create({
	tabs: {
		flexDirection: "row",
		gap: 23,
		height: 55,
	},
	tab: {
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 6,
		borderTopWidth: 2,
		borderTopColor: "transparent",
		minWidth: 47,
		height: 54,
		position: "relative",
	},
	activeTab: {
		borderTopColor: COLORS.plum,
		borderTopWidth: 2,
	},
	container: {
		flex: 1,
	},
	badgeContainer: {
		position: "absolute",
		top: 2,
		right: -6,
		backgroundColor: COLORS.red,
		borderRadius: 10,
		minWidth: 16,
		height: 16,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 3,
		zIndex: 10,
	},
	badgeText: {
		color: COLORS.white,
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 12,
	},
});

const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS;
const TabButton = ({ route, children, unreadCount, ...props }: any) => {
	const pathname = usePathname();
	const isActive = pathname.includes(route);

	return (
		<Pressable
			{...props}
			style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
		>
			<View style={[styles.tab, isActive ? styles.activeTab : null]}>
				{children}

				{route === "chats" && unreadCount > 0 && (
					<View style={styles.badgeContainer}>
						<Text style={styles.badgeText}>
							{unreadCount > 99 ? "99+" : unreadCount}
						</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
};
export default function TabLayout() {
	const { data: unreadMessages = [] } = useGetAllUnreadMessageQuery(undefined, {
		pollingInterval: 3000,
	});
	
	const totalUnreadCount = unreadMessages.length;
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: styles.tabs,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					tabBarLabel: "Головна",
					tabBarLabelStyle: constStyles.tabText,
					tabBarIcon: () => <ICONS.MainPageIcon color={COLORS.black} />,
					tabBarButton: (props) => <TabButton {...props} route="home" />,
					header: () => <Header/>
				}}
			/>

			<Tabs.Screen
				name="posts"
				options={{
					tabBarLabel: "Мої публікації",
					tabBarLabelStyle: constStyles.tabText,
					tabBarIcon: () => <ICONS.MyPostsPageIcon color={COLORS.black} />,
					tabBarButton: (props) => <TabButton {...props} route="posts" />,
					header: () => <Header/>
				}}
			/>

			<Tabs.Screen
				name="friends"
				options={{
					header: () => <Header cantCreatePost={true} />,
					tabBarLabel: "Друзі",
					tabBarLabelStyle: constStyles.tabText,
					tabBarIcon: () => <ICONS.FriendsPageIcon color={COLORS.black} />,
					tabBarButton: (props) => <TabButton {...props} route="friends" />,
				}}
			/>

			<Tabs.Screen
				name="chats"
				options={{
					header: () => <Header canCreateChat = {true} cantEditSelf={true} />,
					tabBarLabel: "Чати",
					tabBarLabelStyle: constStyles.tabText,
					tabBarIcon: () => <ICONS.ChatsPageIcon color={COLORS.black} />,
					tabBarButton: (props) => <TabButton {...props} route="chats" unreadCount={totalUnreadCount} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarItemStyle: { display: "none" },
					header: () => <Header canCreateAlbum={true}/>,
				}}
			/>
			<Tabs.Screen
				name="(friends)"
				options={{
					href: null,
					header: () => <Header cantCreatePost={true} />,
				}}
			/>
			<Tabs.Screen
				name="(chats)"
				options={{
					href: null,
					header: () => <Header canCreateChat = {true} cantEditSelf={true} />,
				}}
			/>
		</Tabs>
	);
}