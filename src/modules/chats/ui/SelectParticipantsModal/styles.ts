import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@shared/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: 12,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        maxHeight: '80%',
        maxWidth: '90%',
        padding: 20,
    },

    closeBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    title: {
        fontSize: 29,
        fontWeight: 500,
        color: COLORS.black,
        textAlign: "center",
    },

    sectionHeaderContainer: {
        paddingTop: 12,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderColor: COLORS.lightestGray,
    },

    selectedCount: {
        fontSize: 14,
        color: COLORS.gray,
        fontWeight: "500",
        // marginTop: 12,
        // marginBottom: 8,
    },

    sectionHeader: {
        fontSize: 12,
        fontWeight: 500,
        color: COLORS.black,
        // paddingVertical: 6,
        marginBottom: 6,
    },

    friendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: COLORS.lightestGray,
    },

    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 123,
        backgroundColor: COLORS.preWhite
        // marginRight: 12,
    },

    placeholderAvatar: {
        backgroundColor: COLORS.lightestGray,
        justifyContent: "center",
        alignItems: "center",
    },

    placeholderText: {
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: "600",
    },

    friendName: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.black,
    },

    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,        
        borderWidth: 2,
        borderColor: COLORS.plum,
        justifyContent: "center",
        alignItems: "center",
    },

    checkboxSelected: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },

    checkboxCheckmark: {
        color: COLORS.plum,
        fontSize: 13,
        fontWeight: 600,
    },

    footerRow: {
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 16,
        // marginTop: 'auto'
    },

    btn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    btnCancel: {
        backgroundColor: COLORS.lightestGray,
    },
    btnCancelText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: "600",
    },
    btnNext: {
        backgroundColor: COLORS.plum,
    },
    btnNextText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
    btnDisabled: {
        backgroundColor: COLORS.lightGray,
        opacity: 0.7,
    },
});