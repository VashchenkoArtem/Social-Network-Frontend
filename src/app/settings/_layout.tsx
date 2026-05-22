import { Stack } from "expo-router";

export default function SettingsLayout() {
	return (
		<Stack>
			<Stack.Screen name="personalInformation" />
			<Stack.Screen name="albums" />
		</Stack>
	);
}
