import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { UserProvider } from "@shared/context/user-context";
import { baseApi } from "@shared/api/baseApi";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
            <ApiProvider api={baseApi}>
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
            </ApiProvider>
		</SafeAreaProvider>
	);
}
