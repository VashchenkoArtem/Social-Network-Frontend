import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	personalInformationContainer: {
		gap: 8,
		paddingTop: 24,
		marginBottom: 61,
	},

	headerBlock: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},

	headerBlockText: {
		color: COLORS.black,
		fontWeight: 600,
		fontSize: 16,
	},

	profileCardBlock: {
		flexDirection: "column",
		backgroundColor: COLORS.white,
		justifyContent: "center",
		width: "100%",
		alignItems: "center",
		padding: 16,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 10,
		gap: 16,
	},

	personalInformationBlock: {
		flexDirection: "column",
		backgroundColor: COLORS.white,
		justifyContent: "center",
		width: "100%",
		alignItems: "center",
		padding: 16,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 10,
		gap: 16,
	},

	profileCardAvatarBlock: {
		flexDirection: "column",
		backgroundColor: COLORS.white,
		justifyContent: "center",
		width: "100%",
		alignItems: "center",
		// padding: 16,
		// borderWidth: 1,
		// borderColor: COLORS.lightGray,
		// borderRadius: 10,
		gap: 19,
	},

	userAddAvatarButtons: {
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
		gap: 24,
	},

	inputButtons: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},

	name: {
		fontWeight: 600,
		fontSize: 24,
	},

	username: {},

	personalInformationFormBlock: {},
	// Buttons
	button: {
		borderBlockColor: COLORS.plum,
		borderWidth: 1,
	},

	white: {
		backgroundColor: COLORS.preWhite,
	},

	editPasswordBlock: {},

	signatureBlock: {
		backgroundColor: "#FFF",
		borderRadius: 28,
		padding: 24,
		marginTop: 16,
		borderColor: COLORS.lightGray,
		borderWidth: 1,
	},

	signatureTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#1A1A1A",
	},
	signatureOptions: {
		marginTop: 20,
		gap: 24,
	},

	signatureOptionRow: {
		width: "100%",
	},

	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 8,
	},

	signatureTextPreview: {
		fontSize: 16,
		color: COLORS.black,
		paddingLeft: 34,
		fontWeight: "400",
	},

	signatureImageWrapper: {
		width: "100%",
		alignItems: "center",
		borderRadius: 6,
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: COLORS.gray,
	},
	signatureImage: {
		width: "100%",
		height: 65,
		zIndex: 100
	},

	signaturePlaceholder: {
		paddingLeft: 34,
		marginTop: 4,
	},

	noSignatureText: {
		color: "#BBB",
		fontSize: 13,
		fontStyle: "italic",
	},
	customCheckbox: {
		width: 20,
		height: 20,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: COLORS.lightestGray,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
	},

	customCheckboxActive: {
		width: 20,
		height: 20,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: COLORS.plum,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
	},

	checkboxInner: {
		width: 10,
		height: 10,
		borderRadius: 2,
		backgroundColor: COLORS.plum,
	},

	checkboxLabel: {
		fontSize: 14,
		color: "#666",
		fontWeight: "500",
	},

	// AVATAR
	userAvatar: {
		width: 96,
		height: 96,
		borderRadius: 50,
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	card: {
		backgroundColor: COLORS.white,
		borderRadius: 24,
		padding: 25,
		width: "100%",
		alignItems: "center",
	},
	signatureNameContainer: {},
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

	backText: {
		color: COLORS.lightGray,
		fontSize: 14,
		textDecorationLine: "underline",
	},
	userAvatarContainer: {
		alignItems: "center"
	},
	modalContainer: {
		paddingTop: 39,
		paddingHorizontal: 16,
		flex: 1,
		justifyContent: "center",
		gap: 6,
	},

	errorContainer: {		
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		width: '100%',
		marginLeft: 34
	},

	errorMessage: {
		color: COLORS.red,
		textAlign: 'center',
		marginTop: 5,
		fontSize: 16
	}

	// userAvatarContainer: {
	//      alignItems: 'center',
	//      justifyContent: 'center',
	//      marginVertical: 16
	// }
});
