import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	modalCard: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 28,
		padding: 24,
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	closeCross: {
		position: "absolute",
		right: 20,
		top: 20,
		zIndex: 10,
	},
	crossText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 24,
		color: "#1A1A1A",
	},
	inputGap: {
		gap: 16,
		width: "100%",
	},
	hint: {
		fontSize: 12,
		color: "#999",
		marginTop: 16,
		textAlign: "center",
		lineHeight: 18,
	},
	highlight: {
		color: "#2ecc71",
	},
	footer: {
		width: "100%",
		alignItems: "flex-end",
		marginTop: 24,
	},
	button: {
		width: 160,
		height: 52,
		borderRadius: 26,
		backgroundColor: COLORS.plum,
		justifyContent: "center",
		alignItems: "center",
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
