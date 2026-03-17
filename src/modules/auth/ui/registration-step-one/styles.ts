import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 24,
		fontFamily: "GTWalsheimPro-Medium",
		color: COLORS.black,
	},
	button: {
		borderRadius: 1234,
		paddingVertical: 10,
		paddingHorizontal: 93,
		height: 52,
		justifyContent: "center",
	},
	purple: {
		backgroundColor: COLORS.plum,
	},
});
