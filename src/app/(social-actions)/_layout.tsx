import { Stack } from "expo-router";

export default function SocialActionsLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = "chats"/>
            <Stack.Screen name = "friends"/>
        </Stack>
    )
}