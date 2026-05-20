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

    // DelteModal
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    closeModalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },

    closeIcon: {
        fontSize: 17, 
        fontWeight: 700,
        color: COLORS.black,
    },

    container: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignSelf: 'center',
    },

    deleteRequestContainer: {
        width: 345,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingVertical: 44,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 36
    },

    deleteModalText: {
        fontSize: 24,
        fontWeight: 500,
        textAlign: 'center'
    },

    deleteModalTextSecond: {
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center'
    },

    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16
    }
        
    
})