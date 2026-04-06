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

    signatureBlock: {

    },

    // Buttons
    button: {

    },

    white: {

    },
    editPasswordBlock: {
        
    }

})
