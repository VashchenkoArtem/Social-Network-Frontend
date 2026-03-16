import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 16,
		height: 56,
		backgroundColor: "white",
	},
	headerWithLogo: {
		alignItems: "center",
		justifyContent: "center",
		height: 56,
		backgroundColor: COLORS.white
	},
	buttons: {
		flexDirection: "row",
		gap: 10,
	},

	icon: {
		width: 20,
		height: 20,
		zIndex: 2,
	},
	headerForAdditionalUrls: {
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	selectedAdditionalUrl: {
		fontWeight: 700,
		letterSpacing: -0.66,
		borderBottomColor: COLORS.plum,
		borderBottomWidth: 2,
		fontSize: 18
	},
	notSelectedAdditionalUrl: {
		color: COLORS.gray,
	},
	tab: {
		fontWeight: 500,
		letterSpacing: -0.66,
		fontSize: 18,
		fontFamily: "GTWalsheimPro-Medium"
	},
	tabs: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
		paddingHorizontal: 17,
	},
});
