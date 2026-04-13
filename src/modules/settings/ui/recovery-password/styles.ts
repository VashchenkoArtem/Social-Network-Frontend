import { COLORS } from "@shared/constants/colors";
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
		...StyleSheet.absoluteFillObject, // 💥 растягиваем на весь экран
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)", // затемнение
		zIndex: 999,
	},

	modal: {
		width: 375,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		padding: 20,
	},

	modalTitle: {
		fontSize: 34,
		fontFamily: "GTWalsheimPro-Medium",
		color: COLORS.black,
		textAlign: "center",
		marginVertical: 25,
	},
	subtitle: {
		textAlign: "center",
		fontFamily: "GTWalsheimPro-Medium",
		fontWeight: 500,
		color: COLORS.black,
		fontSize: 14,
	},
	codeTitle: {
		fontSize: 16,
		fontFamily: "GTWalsheimPro-Regular",
		color: COLORS.black,
	},
});
