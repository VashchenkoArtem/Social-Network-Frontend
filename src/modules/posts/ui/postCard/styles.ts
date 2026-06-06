import { COLORS } from "@shared/constants/colors";
import { StyleSheet, ImageStyle } from "react-native";


export const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
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
        padding: 16,
        zIndex: 10
    },

    authorAvatar: {
        width: 46,
        height: 46,
        borderRadius: 123,
        backgroundColor: COLORS.preWhite
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
        overflow: 'visible',
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
        gap: 5,
        marginTop: 5,
    },
    
    photo: {
        width: 170,
        height: 200,
        borderRadius: 10,
    },
    tag: {
        color: COLORS.plum,
        fontSize: 14,
        fontWeight: 400
    },

    postFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
        maxWidth: 250,
        flexWrap: "wrap"
    },

    postFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        
    },
    postFooterBtn: {
        flexDirection: "row",
        gap: 8
    },

    // Modal
    isModalOpenContainer: {
        position: 'relative',
        zIndex: 1
    },


    dotIconContainerSecond: {
        width: '100%',      
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    postModalMenu: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 16,
        position: 'absolute',
        top: 30,
        right: 0,
        width: 250,
        backgroundColor: COLORS.preWhite,
        borderRadius: 10,
        elevation: 1, 
        zIndex: 1, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },

    postModalMenuBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },

    postModalBtnTxt: {
        fontSize: 16,
        fontWeight: 500, 
        color: COLORS.black
    },

    devider: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10
    },


    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    menuContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    menuText: {
        fontSize: 16,
        color: COLORS.black,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    fullModal: {
        margin: 0,
        justifyContent: 'center',
    },
    formModalContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },



    closeModalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    
    closeIcon: {
        fontSize: 17, 
        fontWeight: 700,
        color: COLORS.black,
    },

    popoverMenu: {
        position: 'absolute',
        top: 60, 
        right: 20,
        
        backgroundColor: COLORS.white,
        borderRadius: 12,
        width: 180,
        
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        
        borderWidth: 1,
        borderColor: COLORS.lightGray,
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