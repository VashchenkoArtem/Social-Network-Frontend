import { COLORS } from "@shared/constants/colors";
import { StyleSheet, ImageStyle } from "react-native";


export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },

    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    
    tagWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
    },
    
    scrollContent: {
        alignItems: 'center',
        paddingRight: 20,
    },
    
    tag: {
        backgroundColor: COLORS.preWhite,
        padding: 5,
        borderRadius: 7,
        color: COLORS.plum,
        fontWeight: 500
        // borderWidth: 1,
    },
    
    tagSelected: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
    
    tagText: {
        color: COLORS.black,
        fontSize: 14,
    },
    
    tagTextSelected: {
        color: COLORS.white,
        fontWeight: '600',
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start"
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.foggy,
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 32,
        borderWidth: 1,
        borderColor: COLORS.plum,
        marginRight: 8,
    },

    hashSymbol: {
        color: COLORS.plum,
        fontWeight: 'bold',
        marginRight: 2,
    },

    input: {
        fontSize: 14,
        padding: 0,
        minWidth: 60,
        color: COLORS.black,
    },

    actionBtn: {
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

    actionBtnActive: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },

    actionBtnText: {
        fontSize: 20,
        color: COLORS.plum,
        fontWeight: 'bold',
        lineHeight: 24,
    },

    whiteText: {
        color: COLORS.white,
    }
})