import { COLORS } from "@shared/constants/colors";
import { Header } from "@shared/ui/header";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
	return (
		<Stack screenOptions={{ headerShown: false}}/>
	);
}
