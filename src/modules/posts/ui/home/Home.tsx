import { View } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function HomePage(){
    const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
	const [isWelcomeVisible, setIsWelcomeVisible] = useState(
		isNewUser === "true",
	);
    return (
        <View>
            <PostCard></PostCard>
            <WelcomeDetailsModal
				isVisible={isWelcomeVisible}
				onClose={() => setIsWelcomeVisible(false)}
			/>
        </View>
    )
}