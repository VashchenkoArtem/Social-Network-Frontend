import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: COLORS.white,
	},
	label: {
		fontSize: 18,
		fontWeight: "600",
		color: COLORS.black,
		marginTop: 20,
		marginBottom: 15,
	},
	canvasWrapper: {
		height: 65,
		width: "100%",
		borderWidth: 1,
		borderColor: COLORS.lightestGray,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: COLORS.white,
		marginBottom: 25,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
		width: "100%",
	},
	miniBtn: {
		flex: 1,
		height: 52,
		borderRadius: 26,
		justifyContent: "center",
		alignItems: "center",
	},

	btnClear: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.lightestGray,
	},

	btnConfirm: {
		backgroundColor: COLORS.plum,
	},

	textClear: {
		color: COLORS.gray,
		fontWeight: "600",
	},
	textConfirm: {
		color: COLORS.white,
		fontWeight: "600",
	},
});
