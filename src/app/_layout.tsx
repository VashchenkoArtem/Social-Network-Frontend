import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { baseApi } from "@shared/api/baseApi";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { UserProvider } from "@modules/auth/context/user-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
            <ApiProvider api = {baseApi}>
                <UserProvider>
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
                </UserProvider>
            </ApiProvider>
		</SafeAreaProvider>
	);
}
