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
    }
})