import { View, Text, Pressable } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { IRegistrationProps } from "./types";
import { styles } from "./styles";
import { useFonts } from "expo-font";


export function Modal(props: IRegistrationProps) {
    const { ifLogin, children } = props;
    const router = useRouter();
    const segments = useSegments();

    const isLoginActive = segments.includes("login");
    const isRegistrationActive = segments.includes("registration") || (!segments.includes("login") && segments.includes("(auth)"));

    const [fontsLoaded] = useFonts({
        "GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.modalContainer}>
            {ifLogin && (
                <View style={styles.urls}>
                    <Pressable 
                        onPress={() => router.push("/registration")}
                        style={({ pressed }) => [pressed && styles.pressed]}
                    >
                        <Text style={[
                            styles.url, 
                            isRegistrationActive && styles.activeUrl
                        ]}>
                            Реєстрація
                        </Text>
                    </Pressable>

                    <Pressable 
                        onPress={() => router.push("/login")}
                        style={({ pressed }) => [pressed && styles.pressed]}
                    >
                        <Text style={[
                            styles.url, 
                            isLoginActive && styles.activeUrl
                        ]}>
                            Авторизація
                        </Text>
                    </Pressable>
                </View>
            )}
            {children}
        </View>
    );
}