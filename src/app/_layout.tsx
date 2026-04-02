import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            // строчка ниже для удаления токена
            // await AsyncStorage.removeItem("userToken");
            const token = await AsyncStorage.getItem("userToken");
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, [segments]);

    useEffect(() => {
        if (isAuthenticated === null) return;

        const inAuthGroup = segments[0] === "(auth)";
        console.log("Поточний сегмент:", segments[0]);
        console.log("Статус авторизації:", isAuthenticated);

        if (!isAuthenticated && !inAuthGroup) {
            console.log("Редирект на реєстрацію...");
            router.replace("/registration");
        } else if (isAuthenticated && inAuthGroup) {
            console.log("Редирект на Home...");
            router.replace("/(tabs)/home");
        }
    }, [isAuthenticated, segments]);

    return (
        <SafeAreaProvider>
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
        </SafeAreaProvider>
    );
}