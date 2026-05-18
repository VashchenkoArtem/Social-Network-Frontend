import { COLORS } from "@shared/constants/colors";
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
        width: "100%",
        textAlign: "center",
        fontSize: 16,
        color: COLORS.gray,
		fontFamily: "GTWalsheimPro-Regular",
    }
})