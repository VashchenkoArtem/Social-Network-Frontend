import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 44,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        gap: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    urls: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
        marginBottom: 8,
    },

    url: {
        fontSize: 24,
        color: COLORS.gray,
        fontFamily: "GTWalsheimPro-Medium",
        fontWeight: "500",
    },

    activeUrl: {
        color: COLORS.black,
    },

    pressed: {
        opacity: 0.7,
    }
});