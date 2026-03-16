import { View, Text, Pressable } from "react-native";
import { LogoIcon, PlusIcon, ManageIcon } from "../icons/buttons";
import { ExitIcon } from "../icons/buttons/ExitIcon";
import { styles } from "./styles";
import { Button } from "../button";
import { COLORS } from "@shared/constants/colors";
import { HeaderProps } from "./types";
import { push } from "expo-router/build/global-state/routing";
import { Link, usePathname } from "expo-router";
import { Url } from "../url";
import { FriendsPageIcon } from "../icons/urls/FriendsPageIcon";
import { constStyles } from "@shared/constants/styles";
import { ChatsPageIcon } from "../icons/urls/ChatsPageIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export function Header(props: HeaderProps) {
	const { cantCreatePost, cantEditSelf } = props;
	const pathname = usePathname();

	const [choosedTab, setChoosedTab] = useState("Контакти");

	const chatsTabs = [
		{ title: "Контакти", route: "/chats" },
		{ title: "Повідомлення", route: "/notifications" },
		{ title: "Групові чати", route: "/groupChats" },
	];

	return (
		<View style={{ backgroundColor: COLORS.white }}>
			<View style={styles.header}>
				<Link href="/home">
					<LogoIcon color={COLORS.plum} width={145} height={18} />
				</Link>

				<View style={styles.buttons}>
					{!cantCreatePost && (
						<Button
							variant="white"
							iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
						/>
					)}

					{!cantEditSelf && (
						<Button
							variant="white"
							iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
							onPress={() => push("/settings")}
							href="/settings"
							isSettings={true}
						/>
					)}

					<Button
						variant="white"
						iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
						onPress={() => push("/login")}
						href="/login"
					/>
				</View>
			</View>

			{pathname.includes("chats") && (
				<View style={styles.tabs}>
					{chatsTabs.map((tab) => (
						<Pressable
							key={tab.title}
							onPress={() => {
								setChoosedTab(tab.title);
							}}
						>
							<Text
								style={[
									styles.tab,
									choosedTab === tab.title
										? styles.selectedAdditionalUrl
										: styles.notSelectedAdditionalUrl,
								]}
							>
								{tab.title}
							</Text>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
}
