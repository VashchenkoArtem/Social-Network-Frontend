import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 500,
        fontFamily: FONTS.medium
    },
    contactStatus: {
        borderRadius: 123,  
        width: 15, 
        height: 15, 
        position: "absolute",
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: "white"
    },
    authorSignature: {
        width: 130,
        height: 50
    },
    lastMessage: {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.black
    },
    online: {
        backgroundColor: COLORS.green
    },
    offline: {
        backgroundColor: COLORS.lightestGray,
    }
})