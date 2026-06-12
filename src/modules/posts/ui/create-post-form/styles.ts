import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 6,
    },

    formHeader: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },

    formTitle: {
        fontSize: 24, 
        fontWeight: 600,
        color: COLORS.black,
        textAlign: 'left',
        letterSpacing: -0.1
    },

    formContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },

    formFields: {
		width: "100%",
        paddingTop: 24,
		gap: 10
	},

    formActions: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
    },

    btnView: {
        width: 48,
        height: 48,
    },

    postImage: {
        width: '100%', 
        height: 225, 
        borderRadius: 16,
        marginBottom: 20
    },
    deleteBtn: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        zIndex: 20,
        borderRadius: 123,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.plum,
        top: 10,
        right: 10
    },

    errorContainer: {		
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		width: '100%'
	},

	errorMessage: {
		color: COLORS.red,
		textAlign: 'center',
		marginTop: 5,
		fontSize: 16
	}
});
