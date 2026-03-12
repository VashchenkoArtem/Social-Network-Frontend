import { COLORS } from "@shared/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	input: {
		flex: 1,
		fontSize: 20,
		textAlign: "center",
		padding: 0
	},

	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 6
	},

	inputContainer: {
		width: 56,
		height: 56,

		borderWidth: 2,
		borderColor: COLORS.plum,
		borderRadius: 12,

		alignItems: "center",
		justifyContent: "center",

		position: "relative"
	},

	underline: {
		position: "absolute",
		bottom: 10,
		width: 16,
		height: 2,
		backgroundColor: COLORS.plum,
		borderRadius: 2
	}
})