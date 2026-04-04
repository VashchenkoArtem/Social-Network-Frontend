import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function HomePage() {
	const { name } = useLocalSearchParams<{ name: string }>();
	return (
		<View>
			<Text>Головна сторінка</Text>
			<Text>Привіт, {name}!</Text>
		</View>
	);
}
