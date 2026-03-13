import { Stack } from "expo-router";

export default function SocialActionsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="contacts" />
			<Stack.Screen name="notifications" />
			<Stack.Screen name="groupChats" />
		</Stack>
	);
}
