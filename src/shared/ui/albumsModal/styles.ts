import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(7, 10, 28, 0.4)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	modalContainer: {
		width: "100%",
		backgroundColor: COLORS.white,
		borderRadius: 24,
		padding: 24,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: COLORS.black,
	},
	closeIcon: {
		fontSize: 18,
		color: COLORS.black,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.black,
		marginTop: 16,
		marginBottom: 8,
	},
	modalFooter: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 24,
		gap: 12,
	},
	dropdown: {
		position: "absolute",
		zIndex: 1000,
		backgroundColor: COLORS.white,
		width: "100%",
		top: 55,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.lightestGray,
		elevation: 5,
	},
	dropdownItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightestGray,
	},
	dropdownText: {
		fontSize: 16,
		color: COLORS.black,
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 1234,
	},
	purple: {
		backgroundColor: COLORS.plum,
		borderColor: COLORS.white,
		borderWidth: 1,
	},
	white: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.plum,
		borderWidth: 1,
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
