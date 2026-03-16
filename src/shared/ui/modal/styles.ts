import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 44,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        gap: 24
    },

    urls: {
        flexDirection: 'row',
        gap: 24,
        // width: '100%'
        
    },

    url: {
        fontSize: 24,
        color: COLORS.gray,
        fontFamily: "GTWalsheimPro-Medium",
        fontWeight: 500
    }
})