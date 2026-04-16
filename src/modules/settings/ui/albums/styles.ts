import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    albumContainer: {
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        gap: 16,
        marginTop: 34
    },

    albumEditContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        padding: 16,
        borderWidth: 1,
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        gap: 16,
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

    albumAddPhotoContainer: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: 200,
        height: 200,
        borderRadius: 12
    },

    albumBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        gap: 10
    },
});