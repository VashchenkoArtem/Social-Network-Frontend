import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	urlsContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: COLORS.white,
		gap: 15,
		// position: 'absolute',
		// top: 0,
		// left: 0,
		// right: 0,

		padding: 16,
	},
	urlIcon: {
		width: 20,
		height: 20,
	},
});
