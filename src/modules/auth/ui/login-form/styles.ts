import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		paddingHorizontal: 16,
		gap: 6,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "red",
	},
	modalTitle: {
		fontSize: 24,
		fontFamily: FONTS.medium,
		color: COLORS.black,
		textAlign: "center",
		marginVertical: 25,
	},

	formContainer: {
		width: "100%",
		// marginBottom: 24,
	},

	formFields: {
		// width: "100%",
		// marginBottom: 24,
	},

	button: {
		borderRadius: 50,
		height: 52,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},

	purple: {
		backgroundColor: COLORS.plum,
	},

	modalQRtextContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginTop: 24,
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: COLORS.gray,
	},

	text: {
		marginHorizontal: 10,
		fontSize: 16,
		fontFamily: FONTS.medium,
		color: COLORS.black,
		textAlign: "center",
	},

	errorContainer: {		
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		width: '100%'
	},

	errorMessage: {
		color: COLORS.red,
		textAlign: 'center',
		marginTop: 5,
		fontSize: 13
	}
});
