import { Tabs, usePathname } from "expo-router";
import { ICONS } from "@shared/ui";
import { constStyles } from "@shared/constants/styles";
import { Header } from "@shared/ui/header";
import { Pressable, View } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { StyleSheet, Text } from "react-native";
import { useGetAllUnreadMessageQuery } from "@modules/message/api/messageApi";
import { UnreadMessages } from "@shared/ui/unreadMessages/UndreadMessages";
import { ReactNode } from "react";

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

});

const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS;
const TabButton = ({ route, children, unreadCount, ...props }: {route: string; children: ReactNode; unreadCount?: number}) => {
	const pathname = usePathname();
	const isActive = pathname.includes(route);

	return (
		<Pressable
			{...props}
			style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
		>
			<View style={[styles.tab, isActive ? styles.activeTab : null]}>
				{children}

				
			</View>
		</Pressable>
	);
};
export default function TabLayout() {
	const { data: unreadMessages } = useGetAllUnreadMessageQuery(undefined, {
		pollingInterval: 3000,
	});
	const totalUnreadCount = unreadMessages;
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
					tabBarIcon: () => (
						<View>
							<ICONS.ChatsPageIcon color={COLORS.black} />
							<UnreadMessages count = {unreadMessages}/>
						</View>
					),
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