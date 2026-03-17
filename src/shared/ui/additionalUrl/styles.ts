import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	additionalUrls: {
		paddingTop: 25,
	},
	additionalUrlText: {
		fontSize: 17,
		color: COLORS.gray,
		fontFamily: "GTWalsheimPro-Medium",
	},
	selectedAdditionalUrlText: {
		fontWeight: 700,
		color: COLORS.black,
	},
	selectedAdditionalUrl: {
		fontWeight: 700,
		letterSpacing: -0.66,
		borderBottomColor: COLORS.plum,
		borderBottomWidth: 2,
		fontSize: 18,
	},
	notSelectedAdditionalUrl: {
		color: COLORS.gray,
	},
	tab: {
		fontWeight: 500,
		letterSpacing: -0.66,
		fontSize: 18,
		fontFamily: "GTWalsheimPro-Medium",
	},
	tabs: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
		paddingHorizontal: 17,
	},
	visible: {
		display: "flex",
	},
	hidden: {
		display: "none",
	},
});
