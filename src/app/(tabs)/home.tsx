import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU/ModalUIU";
import { Home } from "@modules/posts/ui/homePage/Home";

export default function HomePage() {
	const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
	const [isWelcomeVisible, setIsWelcomeVisible] = useState(
		isNewUser === "true",
	);

	return (
		<View>
			<WelcomeDetailsModal
				isVisible={isWelcomeVisible}
				onClose={() => setIsWelcomeVisible(false)}
			/>
			<Home/>
		</View>
	);
}