import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        alignItems: "flex-end",
        gap: 10
    },
    message: {
        justifyContent:"flex-end",
        flexWrap: "wrap",
        flexDirection: 'row',
        gap: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 10,
        maxWidth: 220
    },
    text: {
        // width: "100%",
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'left',
        color: COLORS.black
    },

    messageInfoContainer: {
        flexDirection: 'row',
        // textAlign: 'center',
        alignItems: "center",
        gap: 6,
    },

    sendTime: {
        fontSize: 10,
        // fontWeight: 400,/
        color: COLORS.gray,
    },

    sendStatus: {
        // 
    },
    notMyMessageContainer: {
        borderWidth: 1,
        borderColor: COLORS.preWhite,
        padding: 10,
        borderRadius: 6,
        gap: 4
    },
    username: {
        fontSize: 11,
        color: COLORS.plum
    }
})