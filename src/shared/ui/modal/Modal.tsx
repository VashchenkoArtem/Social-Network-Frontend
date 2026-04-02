import { View, Text } from "react-native";
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
					{selectedTab === 'registration' ? <Text style={styles.activeUrl}>Реєстрація</Text> : <Text style={styles.url}>Реєстрація</Text>}

					{ selectedTab === 'login' ? <Text style={styles.activeUrl}>Авторизація</Text> : <Text style={styles.url}>Авторизація</Text>}
				</View>
			)}
			{children}
		</View>
	);
}
