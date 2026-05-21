import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@shared/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        backgroundColor: COLORS.foggy,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 30,
        height: SCREEN_HEIGHT * 0.85,
    },
    closeBtn: {
        alignSelf: "flex-end",
        padding: 4,
    },
    closeBtnText: {
        fontSize: 18,
        color: COLORS.black,
        fontWeight: "500",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 16,
    },
    selectedCount: {
        fontSize: 14,
        color: COLORS.gray,
        fontWeight: "500",
        marginTop: 12,
        marginBottom: 8,
    },
    sectionHeader: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.gray,
        backgroundColor: COLORS.foggy,
        paddingVertical: 6,
        marginTop: 6,
    },
    friendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.lightestGray,
    },
    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
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
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxSelected: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
    checkboxCheckmark: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: "auto",
        paddingTop: 12,
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