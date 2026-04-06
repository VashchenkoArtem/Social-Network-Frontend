import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { UserProvider } from "@shared/context/user-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<KeyboardProvider>
				<UserProvider>
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
				</UserProvider>
			</KeyboardProvider>
		</SafeAreaProvider>
	);
}
