import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { PersonalChats } from "@modules/chats/ui/personalChats/PersonalChats";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { AdditionalUrls } from "@shared/ui/additionalUrl";
import { IRadioTab } from "@shared/ui/additionalUrl/types";
import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatPage() {
	const [chosenTab, setChosenTab] = useState<string>("Контакти");

	const radioTabsArray: IRadioTab[] = [
		{
			title: "Контакти",
			icon: <ICONS.FriendsPageIcon color = {COLORS.black}/>,
			content: (
				<View
					style={{ flex: 1, marginTop: 7, marginBottom: 48 }}
				>
				</View>
			),
		},
		{
			title: "Повідомлення",
			icon: <ICONS.ChatsPageIcon color = {COLORS.black}/>,
			content: (
				<View
					style={{ flex: 1, marginTop: 7, marginBottom: 48 }}
				>
					<PersonalChats />
				</View>
			),
		},
		{
			title: "Групові чати",
			icon: <ICONS.ChatsPageIcon color = {COLORS.black}/>,
			content: (
				<View
					style={{ flex: 1, marginTop: 7, marginBottom: 48 }}
				>
					<GroupChats />
				</View>
			),
		},
	];

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={["left", "right"]}>
			<AdditionalUrls
				chosenTab={chosenTab}
				setChosenTab={setChosenTab}
				radioTabsArray={radioTabsArray}
			/>
		</SafeAreaView>
	);
}