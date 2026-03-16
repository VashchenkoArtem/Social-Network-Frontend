import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
        gap: 23,
        height: 64
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 6,
        borderTopWidth: 2,
        borderTopColor: "transparent",
        minWidth: 47
    },
    activeTab: {
        borderTopColor: COLORS.plum,
        borderTopWidth: 2
    }
})