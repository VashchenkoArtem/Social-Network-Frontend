import { View, Text, Pressable } from "react-native";
import { Link, useRouter, useSegments } from "expo-router";
import { IRegistrationProps } from "./types";
import { styles } from "./styles";
import { useFonts } from "expo-font";


export function Modal(props: IRegistrationProps) {
	const { ifLogin, children, selectedTab } = props;
	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<View style={styles.modalContainer}>
			{ifLogin && (
				<View style={styles.urls}>
					{selectedTab === 'registration' ? <Link style={styles.activeUrl} href="/register">Реєстрація</Link> : <Link style={styles.url} href="/registration">Реєстрація</Link>}

					{ selectedTab === 'login' ? <Link style={styles.activeUrl} href="/login">Авторизація</Link> : <Link style={styles.url} href="/login">Авторизація</Link>}
				</View>
			)}
			{children}
		</View>
	);
}
