import { Header } from "@shared/ui/header";
import { Stack } from "expo-router";

export default function FriendsLayout() {
	return (
		<Stack>
			<Stack.Screen name="main" />
			<Stack.Screen name="requests" />
			<Stack.Screen name="reccomended" />
			<Stack.Screen name="all" />
			<Stack.Screen name="[friendId]" options={{header: () => <Header />}} />
		</Stack>
	);
}
