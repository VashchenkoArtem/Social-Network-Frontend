import { UserContext } from "@modules/auth/context/user-context";
import { AlbumsPage } from "@modules/settings/ui/albums/Albums";
import { PersonalInformation } from "@modules/settings/ui/personal-information/Personal-information";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { useContext, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
	const [chosenTab, setChosenTab] = useState<string>("Особиста інформація");
	const radioTabsArray: IRadioTab[] = [
		{
			title: "Особиста інформація",
			content: <PersonalInformation />,
		},
		{
			title: "Альбоми",
			content: <AlbumsPage />,
		},
	];
	return (
		<SafeAreaView style={{ flex: 1, padding: 0 }} edges={["left", "right"]}>
			<AdditionalUrls chosenTab={chosenTab} setChosenTab={setChosenTab} radioTabsArray={radioTabsArray}/>
		</SafeAreaView>
	);
}
