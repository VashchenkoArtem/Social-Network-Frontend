import { View, Text } from "react-native";
import { UrlProps } from "./types";

import { styles } from "./styles";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Link, usePathname } from "expo-router";
import { TabTrigger } from "expo-router/ui";

export function Url(props: UrlProps) {
	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
	});
	const pathName = usePathname();
	if (!fontsLoaded) {
		return null;
	}
	const { text, icon, href, isChat, isFriends } = props;
	return (
		<View
			style={[
				styles.url,
				pathName === href ? styles.urlSelected : null,
				isChat &&
				(pathName === "/contacts" ||
					pathName === "/notifications" ||
					pathName === "/groupChats")
					? styles.urlSelected
					: null,
				isFriends &&
					(pathName === "/friends/main" ||
					pathName === "/friends/requests" ||
					pathName === "/friends/reccomended" ||
					pathName === "/friends/all"
						? styles.urlSelected
						: null),
			]}
		>
			{icon}
			<Text style={[styles.urlText]}>{text}</Text>
		</View>
	);
}

function Tab(props: UrlProps) {
	const { tabName, href } = props;
	if (!tabName) return null;
	return (
		<TabTrigger name={tabName} href={href}>
			<Url {...props} />
		</TabTrigger>
	);
}
Url.Tab = Tab;
