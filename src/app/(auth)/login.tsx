import { Redirect } from "expo-router";
import { Text } from "react-native";


export default function LoginScreen() {
	return <Redirect href="/(auth)/registration" />;
}
