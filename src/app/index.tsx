import { useUserContext } from "@modules/auth/context/user-context";
import { Redirect } from "expo-router";

export default function Index() {
    const { token } = useUserContext()!;
    return (
        <Redirect href={!token ? "/(auth)/login" : "/(tabs)/home"} />
    );
}