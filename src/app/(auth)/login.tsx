import { LoginForm } from "@modules/auth/ui/login-form";
import { View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { UserContext } from "@modules/auth/context/user-context";

const mockUser = {
    id: 1,
    email: "test@gmail.com",
    firstname: "Lina",
    lastname: "Li",
    nickname: "thelili",
    alias: null,
    avatars: [],
    signature: null,
    birthDate: null,
};

export default function LoginScreen() {
    return (
        <UserContext.Provider value={{
            user: mockUser,
            token: "fake-token",
            setUpdatedToken: async () => {},
            logout: async () => {},
        }}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => router.push("/settings/personalInformation")}>
                    <Text>Профіль (тест)</Text>
                </TouchableOpacity>
            </View>
        </UserContext.Provider>
    );
}