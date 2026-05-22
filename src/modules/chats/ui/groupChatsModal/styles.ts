import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-start"
    },

    groupChatContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBlockColor: COLORS.lightGray,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 16
    },

    groupChatHeader: {
        height: 58,
        borderBottomWidth: 1,
        borderColor: COLORS.lightGray,
        paddingBottom: 10,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    close: {
        fontSize: 20,
        color: COLORS.lightGray
    },

    infoHeaderContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 5
    },

    chatName: {
        fontSize: 24,
        fontWeight: 500,
        color: COLORS.black
    },

    chatOnlineStatus: {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.lightGray
    },


    inputMessageContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24
    },


    menuContainer: {
        position: "absolute",
        top: 40,
        right: 0,
        width: 310,
        backgroundColor: COLORS.preWhite,        
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 16,
        zIndex: 1
    },

    menuBtn: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.lightGray
    },

    menuBtnText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 500
    }
});