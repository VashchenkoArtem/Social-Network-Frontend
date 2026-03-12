import { Stack } from "expo-router";

export default function FriendsLayout(){
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = "main"/>
            <Stack.Screen name = "requests"/>
            <Stack.Screen name = "reccomended"/>
            <Stack.Screen name = "all"/>
        </Stack>
    )
}