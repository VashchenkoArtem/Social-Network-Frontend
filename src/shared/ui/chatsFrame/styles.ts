import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        gap: 24,
        padding: 16,
    },
    mainContainerHeader: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    frameTitle: {
        fontSize: 20,
        fontWeight: 500,
        fontFamily: FONTS.regular
    },

    itemList: {
        gap: 16,
    }
})