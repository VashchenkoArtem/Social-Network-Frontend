import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		paddingTop: 220,
	},
	card: {
		backgroundColor: COLORS.white,
		borderRadius: 24,
		padding: 25,
		width: "100%",
		alignItems: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.black,
		marginBottom: 12,
	},
	subtitle: {
		textAlign: "center",
		color: COLORS.gray,
		fontSize: 14,
		marginBottom: 25,
		lineHeight: 20,
	},
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
	buttonText: {
		color: COLORS.white,
		fontWeight: "600",
		fontSize: 16,
	},
	backText: {
		color: COLORS.lightGray,
		fontSize: 14,
		textDecorationLine: "underline",
	},
});
