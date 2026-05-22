import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
	wrapper: {
		width: "100%",
	},
	label: {
		fontSize: 16,
		marginBottom: 6,
		color: COLORS.black,
		fontFamily: FONTS.medium,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 42,
		width: "100%",
		borderRadius: 13,
		borderWidth: 1,
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		fontFamily: FONTS.medium,
	},
	primary: {
		borderColor: COLORS.gray,
		borderWidth: 1,
	},
	secondary: {
		borderColor: COLORS.red,
		borderWidth: 1,
	},
	eyeIcon: {
		padding: 10,
	},
	errorText: {
		fontSize: 12,
		color: COLORS.red,
		marginTop: 4,
	},
});
