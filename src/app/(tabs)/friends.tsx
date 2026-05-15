import { AllFriends } from "@modules/friends/ui/allFriends/AllFriends";
import { Friends } from "@modules/friends/ui/friends/Friends";
import { Recommended } from "@modules/friends/ui/recommended/Recommended";
import { Requests } from "@modules/friends/ui/requests/Requests";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 

export default function FriendsPage() {	
	const radioTabsArray: IRadioTab[] = [
		{ title: "Головна", content: <Friends/> },
		{ title: "Запити", content: 
			<ScrollView style = {{marginTop: 24, marginBottom: 48}} contentContainerStyle={{gap: 8}}>
				<Requests/>
			</ScrollView> },
		{ title: "Рекомендації", content: 
			<ScrollView style = {{marginTop: 24, marginBottom: 48}} contentContainerStyle={{gap: 8}}>
				<Recommended/>
			</ScrollView>  },
		{ title: "Всі друзі", content: 
			<ScrollView style = {{marginTop: 24, marginBottom: 48}} contentContainerStyle={{gap: 8}}>
				<AllFriends/>
			</ScrollView> },
	];
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
			<AdditionalUrls radioTabsArray={radioTabsArray}/>
		</SafeAreaView>
	);
}
