import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Header } from "@shared/ui/header";

export default function RootLayout(){
    return(
        <SafeAreaProvider>
            <Stack
            screenOptions={{
                header: () => (
                <SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
                    <Header />
                </SafeAreaView>
                )
            }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="posts"/>
                <Stack.Screen name="(social-actions)" options={{
                        header: () =>     (<SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
                                                <Header cantCreatePost={true}/>
                                            </SafeAreaView>)
                }}/>
                <Stack.Screen name="(auth)"/>
                <Stack.Screen name="friends" options={{
                        header: () =>     (<SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
                                                <Header cantCreatePost={true}/>
                                            </SafeAreaView>)
                }}/>
                <Stack.Screen name="settings"/>
            </Stack>
        </SafeAreaProvider>
    )
}