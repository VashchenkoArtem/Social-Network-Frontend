import { COLORS } from "@shared/constants/colors";
import { Header } from "@shared/ui/header";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={["top"]}>
			<Stack
				screenOptions={{
					header: () => (
						<Header />
					)
				}}
			/>
		</SafeAreaView>
	);
}
