import { COLORS } from "@shared/constants/colors";
import { Header } from "@shared/ui/header";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsLayout() {
	return (
		<Stack>
			<Stack.Screen name="[friendId]" options={{header: () => (
						<SafeAreaView edges={["top"]} style={{backgroundColor: COLORS.white}}>
							<Header />
						</SafeAreaView>
					),}} />
		</Stack>
	);
}
