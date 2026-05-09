import { AllFriends } from "@modules/friends/ui/all/All";
import { Friends } from "@modules/friends/ui/friends/Friends";
import { Recommended } from "@modules/friends/ui/recommended/Recommended";
import { Requests } from "@modules/friends/ui/requests/Requests";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { SafeAreaView } from "react-native-safe-area-context";
 

export default function FriendsPage() {	
	const radioTabsArray: IRadioTab[] = [
		{ title: "Головна", content: <Friends/> },
		{ title: "Запити", content: <Requests/> },
		{ title: "Рекомендації", content: <Recommended/> },
		{ title: "Всі друзі", content: <AllFriends/> },
	];
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
			<AdditionalUrls radioTabsArray={radioTabsArray}/>
		</SafeAreaView>
	);
}
