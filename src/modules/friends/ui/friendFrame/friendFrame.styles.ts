import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    friendCards: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        gap: 16,
    },
    cardHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width : '100%',
    },
    cardTitle: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 500,
    },
    cardLink: {
        color: COLORS.plum,
        fontSize: 16,
        fontWeight: 500,
    },

    nullMessage: {
		fontFamily: FONTS.regular,        
        width: "100%",
        fontSize: 16,
        color: COLORS.gray,
        textAlign: "center",
        marginTop: 10,
        letterSpacing: 0.3,
        fontWeight: 500,
        opacity: 0.89,
        fontStyle: 'italic'
    }
})