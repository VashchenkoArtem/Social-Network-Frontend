import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface IRegistrationProps {
	ifLogin?: boolean;
	children: ReactNode;
	selectedTab?: "login" | "registration";
	visible?: boolean;
	onClose?: () => void;
	style?: StyleProp<ViewStyle>;
}
