import { UserContext } from "@modules/auth/context/user-context";
import { PersonalInformation } from "@modules/settings/ui/personal-information/Personal-information";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
	const { user } = useContext(UserContext)!;
	const radioTabsArray: IRadioTab[] = [
		{
			title: "Особиста інформація",
			content: (
				<PersonalInformation/>
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
