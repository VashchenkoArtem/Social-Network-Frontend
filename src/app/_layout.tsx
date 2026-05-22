import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { baseApi } from "@shared/api/baseApi";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { UserProvider } from "@modules/auth/context/user-context";
import { Header } from "@shared/ui/header";
import { COLORS } from "@shared/constants/colors";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<ApiProvider api={baseApi}>
				<UserProvider>
					<KeyboardProvider>
						<Stack
						>
							<Stack.Screen
								name="(auth)"
								options={{ header: () => (
									<SafeAreaView edges={['top']} style={{backgroundColor: COLORS.white}}>
										<Header isLogin={true} />
									</SafeAreaView>
										)}}/>
							<Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
							<Stack.Screen name="settings" options = {{ 
								header: () => <Header/>
							}} />
						</Stack>
					</KeyboardProvider>
				</UserProvider>
			</ApiProvider>
		</SafeAreaProvider>
	);
}
