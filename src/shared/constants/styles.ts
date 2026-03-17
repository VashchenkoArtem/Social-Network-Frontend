import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const constStyles = StyleSheet.create({
	urlIcon: {
		width: 20,
		height: 20,
	},
	tab: {
		gap: 6,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 8,
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 4,
	},
	tabText: {
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "GTWalsheimPro-Medium",
		color: COLORS.black,
	},
});
