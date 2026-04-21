import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { styles } from "./styles";
import { IRegistrationProps } from "./types";

export function Modal(props: IRegistrationProps) {
	const { ifLogin, children, selectedTab, visible, onClose, style } = props;

	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
	});

	if (!fontsLoaded || (!visible && !ifLogin)) {
		return null
	}

	return (
		<View style={[styles.overlay, style]}>
			<Pressable style={styles.background} onPress={onClose} />

			<View style={[styles.modalContainer, !ifLogin && styles.modal]}>
				{!ifLogin && (
					<Pressable style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeModalBtn}>✕</Text>
					</Pressable>
				)}

				{ifLogin && (
					<View style={styles.urls}>
						<Link
							style={
								selectedTab === "registration" ? styles.activeUrl : styles.url
							}
							href="/registration"
						>
							Реєстрація
						</Link>

						<Link
							style={selectedTab === "login" ? styles.activeUrl : styles.url}
							href="/login"
						>
							Авторизація
						</Link>
					</View>
				)}

				{children}
			</View>
		</View>
	);
}
