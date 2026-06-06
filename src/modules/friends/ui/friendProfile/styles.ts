import { COLORS } from "@shared/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    friendPostsContainer: {

    },
    close: {
        fontSize: 20,
        color: COLORS.lightGray
    },
    authorAvatar: {
        width: 96,
        height: 96,
        borderRadius: 123
    },

    friendInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },

    friendsFullName: {
        fontSize: 24,
        fontWeight: 700, 
    },

    friendsNickName: {
        fontSize: 16,
        fontWeight: 500, 
        textAlign: 'center'
    },

    card: {
        gap: 16,
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 6
    },
    cardContent: {
        gap: 24,
        justifyContent: 'center',
        alignItems: "center"
    },
    cardButtons: {
        flexDirection: "row",
        gap: 16
    },

    friendFollowersInfo: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    infoRow: {
        width: 125,
        height: 48,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7
    },
    infoBorder: {
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderLeftColor: COLORS.gray,
          borderRightColor: COLORS.gray
    },
    infoCount: {
        fontSize: 20,
        fontWeight: 700
    },
    infoLabel: {
        fontSize: 16,
        color: COLORS.gray,
        fontWeight: 500
    },
    headerCard: {
        width: "100%",
        paddingHorizontal: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardLink: {
        color: COLORS.plum,
        fontSize: 16,
        fontWeight: 500,
    },
    textGray: {
        color: COLORS.gray
    },
    title: {
        fontWeight: 500,
        fontSize: 20
    },
})