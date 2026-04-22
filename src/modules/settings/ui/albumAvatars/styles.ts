import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    albumAvatarsContainer: {
        gap: 16,
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
    }
})