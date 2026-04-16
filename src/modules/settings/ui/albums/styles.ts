import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    contentContainer: {
        gap: 8,
        paddingTop: 24
    },
    createCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: COLORS.lightGray,
        alignItems: "center",
        marginBottom: 16,
    },
    createCardText: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.black,
    },
    plusBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.lightestGray,
        justifyContent: "center",
        alignItems: "center",
    },
    albumCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    albumHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    albumTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.black,
    },
    albumInfo: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 4,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.black,
        marginTop: 8,
        marginBottom: 12,
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    addPhotoDashed: {
        width: "30%",
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.foggy,
    },
    photoThumb: {
        width: "30%",
        aspectRatio: 1,
        borderRadius: 12,
        backgroundColor: COLORS.lightestGray,
    },
    manageIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.gray,
    },
    plusIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.gray,
    },
});