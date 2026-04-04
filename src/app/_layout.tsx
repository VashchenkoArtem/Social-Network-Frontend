import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<KeyboardProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" />
					<Stack.Screen name="(friends)" />
					<Stack.Screen name="settings" />
				</Stack>
			</KeyboardProvider>
		</SafeAreaProvider>
	);
}
