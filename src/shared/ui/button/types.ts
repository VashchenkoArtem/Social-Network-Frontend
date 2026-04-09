import { ReactNode } from "react";
import { PressableProps } from "react-native";

export interface IPressableProps extends PressableProps {
	variant: "white" | "purple";
	isBackgroundColor: "preWhite" | "prePurple";
	text?: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	href?: string;
	isSettings?: boolean;
	paddingHorizontal?: number;
}
