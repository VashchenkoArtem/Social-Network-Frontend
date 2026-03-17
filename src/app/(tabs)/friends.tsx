import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsPage() {
	const radioTabsArray: IRadioTab[] = [
		{ title: "Головна", content: <View></View> },
		{ title: "Запити", content: <View></View> },
		{ title: "Рекомендації", content: <View></View> },
		{ title: "Всі друзі", content: <View></View> },
	];
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
			<View style={{ flex: 1 }}>
				<AdditionalUrls radioTabsArray={radioTabsArray}></AdditionalUrls>
			</View>
		</SafeAreaView>
	);
}
