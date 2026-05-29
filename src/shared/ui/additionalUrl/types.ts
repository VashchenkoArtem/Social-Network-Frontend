import { ReactNode } from "react";

export interface IRadioTab {
	title: string;
	content: ReactNode;
	icon?: ReactNode
}
export interface IProps {
	radioTabsArray: IRadioTab[];
	chosenTab: string;
	setChosenTab: (title: string) => void;
	chatContent?: ReactNode;
	isChats?: boolean
}
