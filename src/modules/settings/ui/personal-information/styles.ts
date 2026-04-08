import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    personalInformationContainer: {
        gap: 8,
        paddingTop: 24
    },

    headerBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'

    },

	profileCardBlock: {
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        gap: 16
    }, 

    personalInformationBlock: {
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        gap: 16
    },

    profileCardAvatarBlock: {
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        gap: 16
    },

    name: {

    },

    username: {

    },

    personalInformationFormBlock: {

    },
    // Buttons
    button: {

    },

    white: {

    },
    editPasswordBlock: {
        
    },


    signatureBlock: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        padding: 24,
        marginTop: 16,
    },

    signatureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
    },

    signatureOptions: {
        marginTop: 20,
        gap: 24,
    },

    signatureOptionRow: {
        width: '100%',
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },

    customCheckbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    customCheckboxActive: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.plum,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: COLORS.plum,
    },

    checkboxLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    signatureTextPreview: {
        fontSize: 18,
        color: '#1A1A1A',
        paddingLeft: 34,
        fontWeight: '400',
    },

    signatureImageWrapper: {
        paddingLeft: 34,
        marginTop: 4,
    },

    signatureImage: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
    },

    signaturePlaceholder: {
        paddingLeft: 34,
        marginTop: 4,
    },

    noSignatureText: {
        color: '#BBB',
        fontSize: 13,
        fontStyle: 'italic',
    },
})
