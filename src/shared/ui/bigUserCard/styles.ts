import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contactStatus: {
        borderRadius: 123,  
        width: 20, 
        height: 20, 
        position: "absolute",
        bottom: 5,
        right: 5,
        borderWidth: 2,
        borderColor: "white"
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
    authorAvatar: {
        width: 96,
        height: 96,
        borderRadius: 123
    },
    online: {
        backgroundColor: COLORS.green
    },
    offline: {
        backgroundColor: COLORS.lightestGray,
    }
})