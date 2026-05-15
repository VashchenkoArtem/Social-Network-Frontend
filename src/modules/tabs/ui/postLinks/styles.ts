import { COLORS } from "@shared/constants/colors";
import { StyleSheet, ImageStyle } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.foggy,
        borderBottomWidth: 1.5,
        borderColor: COLORS.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        color: COLORS.black,
        fontSize: 14,
    },
    plusBtn: {
        marginLeft: 12,
        backgroundColor: COLORS.white,
        width: 20,
        height: 20,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.plum,
    },
    plusBtnActive: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
});