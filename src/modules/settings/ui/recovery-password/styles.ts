import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	confirmButton: {
		backgroundColor: COLORS.plum,
		width: "100%",
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
		marginBottom: 15,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	inputsFrame: {
		gap: 24,
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: "600",
		fontSize: 16,
	},
	modalContainer: {
		position: "absolute",
		flex: 1,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	modal: {
		width: 375,
		backgroundColor: COLORS.white,
		borderRadius: 20,
	},

	modalTitle: {
		fontSize: 34,
		fontFamily: FONTS.medium,
		color: COLORS.black,
		textAlign: "center",
		marginVertical: 25,
	},
	subtitle: {
		textAlign: "center",
		fontFamily: FONTS.medium,
		fontWeight: 500,
		color: COLORS.black,
		fontSize: 14,
	},
	codeTitle: {
		fontSize: 16,
		fontFamily: FONTS.regular,
		color: COLORS.black,
	},
});
