import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    url: {
        gap: 6,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 4,
    },
    urlText: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'GTWalsheimPro-Medium',
    },
    urlSelected: {
        borderTopColor: COLORS.plum,
        borderTopWidth: 2,
    }
})