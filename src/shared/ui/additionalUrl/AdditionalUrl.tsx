import { View, Image, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import { useState } from "react";
import { IProps } from "./types";
import { styles } from "./styles";

export function AdditionalUrls(props: IProps) {
	const { radioTabsArray } = props;
	const [choosedTab, setChoosedTab] = useState<string>(radioTabsArray[0].title);
	return (
		<View style={styles.additionalUrls}>
			<View style={styles.tabs}>
				{radioTabsArray.map((element) => {
					return (
						<Pressable
							key={element.title}
							onPress={() => setChoosedTab(element.title)}
						>
							<Text
								style={[
									choosedTab === element.title
										? styles.selectedAdditionalUrl
										: styles.notSelectedAdditionalUrl,
									styles.tab,
								]}
							>
								{element.title}
							</Text>
						</Pressable>
					);
				})}
			</View>

			{radioTabsArray.map((element) => {
				return (
					<View
						key={element.title}
						style={
							choosedTab === element.title ? styles.visible : styles.hidden
						}
					>
						{element.content}
					</View>
				);
			})}
		</View>
	);
}
