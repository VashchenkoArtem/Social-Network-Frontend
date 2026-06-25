import { Contacts } from "@modules/chats/ui/Contacts/Contacts";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { useGetUnreadSummaryQuery } from "@modules/message/api/messageApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { getRadioTabsArray } from "@shared/ui/radiotabs/Radiotabs";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatPage() {
	const [chosenTab, setChosenTab] = useState<string>("Контакти");
	const { data: unreadSummary } = useGetUnreadSummaryQuery();
	const radioTabsArray = getRadioTabsArray(
		unreadSummary?.personal ?? 0,
		unreadSummary?.group ?? 0,
	);
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