import { AllFriends } from "@modules/friends/ui/allFriends/AllFriends";
import { Friends } from "@modules/friends/ui/friends/Friends";
import { Recommended } from "@modules/friends/ui/recommended/Recommended";
import { Requests } from "@modules/friends/ui/requests/Requests";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 

export default function FriendsPage() {	
	const [chosenTab, setChosenTab] = useState<string>("Головна");
	const radioTabsArray: IRadioTab[] = [
		{ title: "Головна", content: <Friends setChosenTab={setChosenTab}/> },
		{ title: "Запити", content: 
			<View style = {{marginTop: 24, gap: 8}}>
				<Requests setChosenTab={setChosenTab}/>
			</View> },
		{ title: "Рекомендації", content: 
			<View style = {{marginTop: 24, gap: 8}}>
				<Recommended setChosenTab={setChosenTab}/>
			</View>  },
		{ title: "Всі друзі", content: 
			<View style = {{marginTop: 24, gap: 8}}>
				<AllFriends setChosenTab={setChosenTab}/>
			</View> },
	];
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
			<AdditionalUrls chosenTab={chosenTab} setChosenTab={setChosenTab} radioTabsArray={radioTabsArray}/>
		</SafeAreaView>
	);
}
