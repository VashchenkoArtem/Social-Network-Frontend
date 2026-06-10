import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 24,
		fontFamily: FONTS.medium,
		color: COLORS.black,
	},
	button: {
		borderRadius: 1234,
		paddingVertical: 10,
		paddingHorizontal: 93,
		height: 52,
		justifyContent: "center",
	},
	purple: {
		backgroundColor: COLORS.plum,
	},
	container: {
		paddingTop: 115,
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
		width: '100%'
	},

	errorMessage: {
		color: COLORS.red,
		textAlign: 'center',
		marginTop: 5,
		fontSize: 16
	}
});
