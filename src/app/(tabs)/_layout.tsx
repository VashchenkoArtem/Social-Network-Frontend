import { Tabs, usePathname } from 'expo-router';
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { constStyles } from '@shared/constants/styles';
import { Header } from '@shared/ui/header';
import { useState } from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, View } from 'react-native';


const { MainPageIcon, MyPostsPageIcon, FriendsPageIcon, ChatsPageIcon } = ICONS;
const TabButton = ({ route, children, ...props }: any) => {
  const pathname = usePathname();
  const isActive = pathname.includes(route);

  return (
    <Pressable
      {...props}
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <View style={[styles.tab ,isActive ? styles.activeTab : null]}>
        {children}
      </View>
    </Pressable>
  );
};
export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={["top"]}>
      <Tabs

        screenOptions={{
          tabBarStyle: styles.tabs,
          header: () => (
              <Header />
          )
        }}
      >


        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Головна',
            tabBarLabelStyle: constStyles.tabText,
            tabBarIcon: () => <ICONS.MainPageIcon color = {COLORS.plum}/>,
            tabBarButton: (props) => <TabButton {...props} route="home" />,
          }}
        />

        <Tabs.Screen
          name="posts"
          options={{
            tabBarLabel: 'Мої публікації',
            tabBarLabelStyle: constStyles.tabText,
            tabBarIcon: () => <ICONS.MyPostsPageIcon color = {COLORS.plum}/>,
            tabBarButton: (props) => <TabButton {...props} route="posts" />,
          }}
        />

        <Tabs.Screen
          name="friends"
          options={{
            tabBarLabel: "Друзі",
            tabBarLabelStyle: constStyles.tabText,
            tabBarIcon: () => <ICONS.FriendsPageIcon color = {COLORS.plum}/>,
            tabBarButton: (props) => <TabButton {...props} route="friends" />,
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            tabBarLabel: "Чати",
            tabBarLabelStyle: constStyles.tabText,
            tabBarIcon: () => <ICONS.ChatsPageIcon color = {COLORS.plum}/>,
            tabBarButton: (props) => <TabButton {...props} route="chats" />,
          }}
        />
				<Tabs.Screen
					name="settings"
					options={{
						header: () => (
							<Header
								cantCreatePost = {true}
							/>
						),
						tabBarItemStyle: { display: "none" },
					}}
				/>
      </Tabs>
    </SafeAreaView>
  );
}