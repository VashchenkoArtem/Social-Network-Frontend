import { AllFriends } from "@modules/friends/ui/allFriends/AllFriends";
import { Friends } from "@modules/friends/ui/friends/Friends";
import { Recommended } from "@modules/friends/ui/recommended/Recommended";
import { Requests } from "@modules/friends/ui/requests/Requests";
import { UserContext } from "@modules/auth/context/user-context";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { useContext, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function FriendsPage() {
	const { user } = useContext(UserContext)!;

	if (!user) return <Redirect href="/(auth)/login" />;

	const [chosenTab, setChosenTab] = useState<string>("Головна");
	const radioTabsArray: IRadioTab[] = [
		{ title: "Головна", content: <Friends setChosenTab={setChosenTab}/> },
		{ title: "Запити", content: 
			<View style={{ marginTop: 24, gap: 8 }}>
				<Requests setChosenTab={setChosenTab}/>
			</View> },
		{ title: "Рекомендації", content: 
			<View style={{ marginTop: 24, gap: 8 }}>
				<Recommended setChosenTab={setChosenTab} isPaginate={true}/>
			</View> },
		{ title: "Всі друзі", content: 
			<View style={{ marginTop: 24, gap: 8 }}>
				<AllFriends setChosenTab={setChosenTab}/>
			</View> },
	];

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
			<AdditionalUrls chosenTab={chosenTab} setChosenTab={setChosenTab} radioTabsArray={radioTabsArray}/>
		</SafeAreaView>
	);
}