import { ReactNode } from "react";

export interface IRadioTab {
	title: string;
	content: ReactNode;
}
export interface IProps {
	radioTabsArray: IRadioTab[];
	chosenTab: string;
	setChosenTab: (title: string) => void
}
