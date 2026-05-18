import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
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
		backgroundColor: COLORS.white,
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
		letterSpacing: -0.66,
		borderTopWidth: 2,
		fontSize: 18,
		borderTopColor: COLORS.black,
	},
	tab: {
		fontWeight: 500,
		letterSpacing: -0.66,
		fontSize: 18,
		fontFamily: FONTS.medium,
		color: COLORS.black,
		alignItems: "center",
		paddingVertical: 4,
		borderTopWidth: 2,
		borderTopColor: "transparent",
	},
	tabs: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 17,
		height: 64,
	},
	headerLogin: {
		justifyContent: "center",
	},

	// Modal styles
	modal: {
		margin: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},

	closeModalContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '100%'
	},

	closeIcon: {
		fontSize: 17, 
		fontWeight: 700,
		color: COLORS.black,
	},

	container: {
		width: '100%',
		backgroundColor: COLORS.white,
		borderRadius: 20,
		paddingVertical: 24,
		paddingHorizontal: 16,
		alignSelf: 'center',
	}
})
