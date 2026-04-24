import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    albumAvatarsContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderColor: COLORS.lightGray,
        borderWidth: 1
    },
    albumTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontFamily: "",
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 600
    },
    avatars: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap"
    },
    photoBtn: {
		justifyContent: "center",
		alignItems: "center",
		width: 36,
		height: 36,
		backgroundColor: COLORS.white,
		borderRadius: 11231,
		borderBlockColor: COLORS.black,
		borderWidth: 1,
	},
    btnContainer: {
		flexDirection: "row",
		gap: 10,
		position: "absolute",
		right: 10,
		bottom: 10,
	},
})