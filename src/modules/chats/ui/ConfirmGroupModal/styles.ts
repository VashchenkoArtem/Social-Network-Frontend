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
    
    groupNameInputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 6,
        width: '100%'
    },

    pickGroupImageContainer: {
        width: '100%',
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        gap: 12,
    },

    groupImageBtnsContainer: {
        flexDirection: "row", 
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12
    },

    title: {
        fontSize: 29,
        fontWeight: 500,
        color: COLORS.black,
        textAlign: "center",
        // marginBottom: 24,
    },

    groupPartisipantsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: 12,
        textAlign: 'left'
    },

    footerRow: {
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        // marginTop: 'auto'
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
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 16,
        marginBottom: 8,
    },
    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 12
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 123,
        backgroundColor: COLORS.preWhite
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