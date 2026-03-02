import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const buttonStyles = StyleSheet.create({
    white: {
        borderBlockColor: COLORS.plum,
        borderWidth: 1,
    },
    purple: {
        backgroundColor: COLORS.plum
    },
    buttonText: {
       fontSize: 14
    },
    buttonImage: {
        
    },
    button: {
        borderRadius: 1234, 
        paddingHorizontal: 16,
        paddingVertical: 10,
        height:40
    },
    purpleButtonText: {
        color: COLORS.white
    },
    whiteButtonText: {
        color: COLORS.plum
    }
})