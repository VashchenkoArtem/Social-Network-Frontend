import { Contacts } from "@modules/chats/ui/Contacts/Contacts";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { useGetAllUnreadMessageQuery } from "@modules/message/api/messageApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { getRadioTabsArray } from "@shared/ui/radiotabs/Radiotabs";
import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatPage() {
	const [chosenTab, setChosenTab] = useState<string>("Контакти");
	const { data: unreadMessages } = useGetAllUnreadMessageQuery(undefined, {
		pollingInterval: 3000,
	});
	const radioTabsArray = getRadioTabsArray(unreadMessages ?? 0);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={["left", "right"]}>
			<AdditionalUrls
				chosenTab={chosenTab}
				setChosenTab={setChosenTab}
				radioTabsArray={radioTabsArray}
				isChats={true}
			/>
		</SafeAreaView>
	);
}