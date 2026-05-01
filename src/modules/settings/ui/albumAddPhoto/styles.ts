import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	ContainerAvatar: {},
	AvatarView: {},
	SelectedAvatar: {},
	DefaultAvatar: {},
	btnView: {
		width: 162,
		height: 162,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		// position: "relative",
		borderWidth: 1,
		borderColor: COLORS.gray,
		borderStyle: "dashed",

		// backgroundColor: 'green'
	},

});
