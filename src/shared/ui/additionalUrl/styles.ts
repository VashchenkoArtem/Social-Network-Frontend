import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	additionalUrls: {
		paddingTop: 25,
		flex: 1
	},
	additionalUrlText: {
		fontSize: 17,
		color: COLORS.gray,
		fontFamily: FONTS.medium,
	},
	selectedAdditionalUrlText: {
		fontWeight: 700,
		color: COLORS.black,
	},
	tabWithIcon: {
		alignItems: "center",
		borderTopWidth: 2,
		padding: 8
	},
	notSelectedTabWithIcon: {
		borderTopColor: "transparent"
	},
	selectedWithoutIcon: {
		fontWeight: 700,
		letterSpacing: -0.66,
		fontSize: 18,
	},
	selectedTabWithIcon: {
		borderTopColor: COLORS.black,
		borderTopWidth: 2
	},

	notSelectedWithoutIcon: {
		color: COLORS.gray,
	},
	tab: {
		fontWeight: 500,
		letterSpacing: -0.66,
		fontSize: 18,
		fontFamily: FONTS.medium,
	},
	tabs: {
		flexDirection: "row",
		gap: 1,
		width: "100%"
	},
	visible: {
		display: "flex",
	},
	hidden: {
		display: "none",
	},
});
