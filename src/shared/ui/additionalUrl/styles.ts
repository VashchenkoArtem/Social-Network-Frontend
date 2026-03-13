import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
		borderBottomColor: COLORS.plum,
		borderBottomWidth: 2,
	},
});
