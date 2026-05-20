import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";

export const styles = StyleSheet.create({
	modalContainer: {
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 44,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		gap: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},
	modal: {},

	urls: {
		flexDirection: "row",
		alignItems: "center",
		gap: 24,
		// width: '100%'
	},

	url: {
		fontSize: 24,
		color: COLORS.gray,
		fontFamily: FONTS.medium,
		fontWeight: 500,
	},

	activeUrl: {
		fontSize: 25.5,
		color: COLORS.black,
		fontFamily: FONTS.medium,
		fontWeight: 700,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.black,
		paddingBottom: 3.5,
	},
	overlay: {},

	background: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},

	closeButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 3,
	},

	closeModalBtn: {
		fontSize: 18
	}
});
