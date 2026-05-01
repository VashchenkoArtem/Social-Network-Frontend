import { COLORS } from "@shared/constants/colors";
import { StyleSheet, ImageStyle } from "react-native";


export const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10, 
        marginHorizontal: 6,
        marginTop: 8,
        gap: 8, 
    },
    
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        padding: 16
    },

    authorAvatar: {
        width: 46,
        height: 46,
        borderRadius: 123
    },

    postAvatarSignatureInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    
    postAvatarInfo: {
        flexDirection: 'row',
        // width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },

    authorName: {
        fontSize: 16,
        fontWeight: 500, 
        textAlign: 'left',
        color: COLORS.black
    },
    authorSignature: {
        width: 130,
        height: 50
    },

    postTitle: {
        fontSize: 16,
        fontWeight: 500, 
        textAlign: 'left',
        color: COLORS.black
    },
    
    postContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        width: '100%', 
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16, 
    },

    dotIconContainer: {
		width: 20,
        height: 20
		// alignItems: 'flex-end'
	},
    postDescription: {
        fontSize: 14,
        fontWeight: 400, 
        textAlign: 'left',
        color: COLORS.black
    },
    photosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 6,
        marginTop: 10,
    },

    photo: {
        width: 167,
        height: 200,
        borderRadius: 10,
    },
})

export const getPhotoStyle = (
    total: number
): ImageStyle => {
    if (total === 1) {
        return {
            width: "100%",
            height: 200,
            borderRadius: 10,
        };
    }

    if (total === 2) {
        return {
            width: "49%",
            height: 200,
            borderRadius: 10,
        };
    }

    if (total === 4) {
        return {
            width: "49%",
            height: 200,
            borderRadius: 10,
        };
    }

    return {
        width: "32%",
        height: 200,
        borderRadius: 10,
    };
};