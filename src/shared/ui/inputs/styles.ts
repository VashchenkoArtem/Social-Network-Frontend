import { StyleSheet } from "react-native";
import { COLORS } from "shared/constants/colors";



export const inputStyles = StyleSheet.create({
    wrapper: {
        width: 340,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#000',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
		width: 340,
        borderRadius: 13,
        borderWidth: 1,
        gap: 10,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
    },
    primary: {
        borderColor: COLORS.gray,
        borderWidth: 1,
    },
    secondary: {
        borderColor: COLORS.red,
        borderWidth: 1,
    },
    eyeIcon: {
        padding: 10,
    },
    errorText: {
        fontSize: 12,
        color: COLORS.red,
        marginTop: 4,
    },
})