import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        borderRadius: 10
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
})