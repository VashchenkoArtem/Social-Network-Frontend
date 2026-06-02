import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	url: {
		gap: 6,
		height: 54,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 8,
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 4,
	},
	urlText: {
		fontSize: 14,
		fontWeight: 600,
		fontFamily: FONTS.medium,
	},
	urlSelected: {
		borderTopColor: COLORS.plum,
		borderTopWidth: 2,
	},
	badge: {
		position: 'absolute',
		right: -6, 
        top: -4, 
		borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
		backgroundColor: COLORS.red,
	},
	badeText: {
		color: COLORS.white,
		fontSize: 9,
        fontWeight: '700',
        textAlign: 'center' 
	}
});
