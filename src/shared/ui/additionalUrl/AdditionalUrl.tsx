import { View, Text, Pressable } from "react-native";
import { IProps } from "./types";
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";

export function AdditionalUrls(props: IProps) {
	const { radioTabsArray, chosenTab, setChosenTab } = props;
	return (
		<View style={styles.additionalUrls}>
			<View style={styles.tabs}>
				{radioTabsArray.map((element) => {
					return (
						<Pressable
							key={element.title}
							onPress={() => setChosenTab(element.title)}
							style = {[
								styles.tabWithIcon,
								element.icon 
								? chosenTab === element.title 
									? styles.selectedTabWithIcon
									: styles.notSelectedTabWithIcon
								: styles.notSelectedTabWithIcon
							]}
						>
							{element.icon}
							<Text
								style={[
									element.icon
										? styles.selectedWithoutIcon
										: chosenTab === element.title
											? [styles.selectedWithoutIcon, {borderBottomColor: COLORS.plum, borderBottomWidth: 2,}]
											: styles.notSelectedWithoutIcon,

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
						style={[
							chosenTab === element.title ? styles.visible : styles.hidden,
							{ flex: 1}
						]}
					>
						{element.content}
					</View>
				);
			})}
		</View>
	);
}
