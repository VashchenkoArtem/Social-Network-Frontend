import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: 10,
    },
    headerCard: {
        width: "100%",
        paddingHorizontal: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentCard: {
        gap: 10,
        width: "100%",
        paddingHorizontal: 32
    },    
    textGray: {
        color: COLORS.gray
    },

    year: {
        fontWeight: 400,
        fontSize: 16
    },
    theme: {
        fontWeight: 400,
        fontSize: 16
    },
    name: {
        fontSize: 16,
        fontWeight: 500
    }

})