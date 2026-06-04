import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    badgeContainer: {
        position: "absolute",
        backgroundColor: COLORS.red,
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
        zIndex: 10,
        borderColor: "white",
        borderWidth: 2
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 12,
    },
})