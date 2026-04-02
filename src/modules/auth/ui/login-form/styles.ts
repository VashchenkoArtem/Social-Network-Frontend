import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 39,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: "center",
        gap: 6
    },

    modalTitle: {
        fontSize: 24,
        fontFamily: "GTWalsheimPro-Medium",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 25,
    },

    formContainer: {
        width: "100%",
        // marginBottom: 24,
    },

    formFields: {
        // width: "100%",
        // marginBottom: 24,
    },

    button: {
        borderRadius: 50,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    purple: {
        backgroundColor: COLORS.plum,
    },

    modalQRtextContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 24,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray,
    },

    text: {
        marginHorizontal: 10,
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Medium",
        color: COLORS.black,
        textAlign: "center",
    },
})