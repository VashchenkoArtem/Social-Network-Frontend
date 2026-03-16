import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
	const radioTabsArray: IRadioTab[] = [
		{
			title: "Особиста інформація",
			content: (
				<View>
					<Text>Особиста інформація</Text>
				</View>
			),
		},
		{
			title: "Альбоми",
			content: (
				<View>
					<Text>Альбоми</Text>
				</View>
			),
		},
	];
	return (
		<SafeAreaView style={{ flex: 1, padding: 0 }} edges={["left", "right"]}>
			<AdditionalUrls radioTabsArray={radioTabsArray} />
		</SafeAreaView>
	);
}