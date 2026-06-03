import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    groupName: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 500,
        fontFamily: FONTS.medium
    },
    lastMessage: {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.black
    },
    contactStatus: {
        borderRadius: 123, 
        backgroundColor: COLORS.lightestGray, 
        width: 15, 
        height: 15, 
        position: "absolute",
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: "white"
    }
})