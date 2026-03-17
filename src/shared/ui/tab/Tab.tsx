import { Tabs } from "expo-router";
import { constStyles } from "@shared/constants/styles";
import { TabProps } from "./types";

export function Tab(props: TabProps) {
	const { name, label, Icon } = props;
	return (
		<Tabs.Screen
			name={name}
			options={{
				tabBarLabel: label,
				tabBarLabelStyle: constStyles.tabText,
				tabBarIcon: ({ color, size }) => (
					<Icon color={color} width={size} height={size} />
				),
			}}
		/>
	);
}
