import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";

export const styles = StyleSheet.create({
    groupChatContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 16
    
    },

    groupChatHeader: {
        borderBottomWidth: 1,
        borderColor: COLORS.lightGray,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10
    },

    close: {
        fontSize: 20,
        color: COLORS.lightGray
    },

    infoHeaderContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10
    },

    chatName: {
        fontSize: 24,
        fontWeight: 500,
        color: COLORS.black,
        fontFamily: FONTS.medium
    },

    chatOnlineStatus: {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.lightGray,
        fontFamily: FONTS.regular
    },


    inputMessageContainer: {
        padding: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 24
    },


    menuContainer: {
        alignItems: "flex-end",
        position: "absolute",
        top: -16,
        right: -16,
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
    },
    chatInfo: {

    },
    messageBtnContainer: {
        flexDirection: "row",
        gap: 16
    }
});