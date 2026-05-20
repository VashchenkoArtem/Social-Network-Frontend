import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from "@shared/constants/colors";

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 60) / 3;

export const styles = StyleSheet.create({
    albumCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    albumHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    albumContainer: {
        flex: 1,
    },
    albumTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    albumInfoContainer: {
        flexDirection: 'column',
    },
    albumInfo: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    albumPhotoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    albumPhoto: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray,
    },
    photoBtns: {
        position: 'absolute',
        top: 5,
        right: 5,
        flexDirection: 'row',
        gap: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        padding: 2,
    },
    photoBtn: {
        padding: 4,
    },
    contentContainer: {
        padding: 15,
    },
    createCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.lightGray,
        borderRadius: 20,
        marginBottom: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    createCardText: {
        fontSize: 16,
        color: COLORS.black,
    },
    plusBtn: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 50,
    }
});