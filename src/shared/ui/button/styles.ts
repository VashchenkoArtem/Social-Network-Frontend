import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "@shared/constants/fonts";

export const buttonStyles = StyleSheet.create({
	white: {
		borderBlockColor: COLORS.plum,
		borderWidth: 1,
	},
	purple: {
		backgroundColor: COLORS.plum,
	},
	buttonText: {
		fontSize: 16,
		fontFamily: FONTS.medium,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 1234,
		padding: 10,
		minHeight: 40,
		minWidth: 40,
	},
	purpleButtonText: {
		color: COLORS.white,
	},
	whiteButtonText: {
		color: COLORS.plum,
	},
	prePurple: {
		backgroundColor: COLORS.plum,
	},
	buttonContent: {
		flexDirection: "row",
		gap: 8,
	},
	buttonWithBigPadding: {
		paddingHorizontal: 16,
	},

	selectedButton: {
		backgroundColor: COLORS.preWhite,
	}
});
