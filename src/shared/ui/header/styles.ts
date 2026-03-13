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
		paddingTop: 24,
	},
});
