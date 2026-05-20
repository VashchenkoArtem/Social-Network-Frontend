import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
	contentContainer: {
		gap: 8,
		paddingTop: 24,

	},
	createCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
        borderColor: COLORS.lightGray,
        borderWidth: 1,
		alignItems: "center",
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
		backgroundColor: COLORS.white,
		borderColor: COLORS.plum,
		justifyContent: "center",
		alignItems: "center",
	},
	albumCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		padding: 16,
		borderColor: COLORS.lightGray,
        borderWidth: 1
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
	albumInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	albumContainer: {
		gap: 16,
	},
	photoBtns: {
		flexDirection: "row",
		gap: 10,
		position: "absolute",
		right: 10,
		bottom: 10,
	},
	photoBtn: {
		justifyContent: "center",
		alignItems: "center",
		width: 36,
		height: 36,
		backgroundColor: COLORS.white,
		borderRadius: 50,
		borderBlockColor: COLORS.plum,
		borderWidth: 1,
	},


	editAlbumModalContainer: {
		flexDirection: 'column',
		width: 350,
		height: 176,
		padding: 16,
		gap: 16,
		backgroundColor: COLORS.preWhite,
		borderRadius: 10,
		position: "absolute",
		top: -10,
		right: -17,
		zIndex: 1
	},

	albumEditBtn: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10, 
		textAlign: 'left',
		width: '100%',
	},

	closeModalBtn: {
		display: 'none'
	},

	dotIconContainer: {
		width: '100%',
		alignItems: 'flex-end'
	},

	albumEditText: {
		fontWeight: 500,
		fontSize: 16
	},

	devider: {
		width: '100%',
		height: 1,
		backgroundColor: COLORS.gray,
		borderRadius: 1
	},

	albumPhoto: {
		width: 162,
		height: 162,
		// margin: 4,
		borderRadius: 10,
		backgroundColor: "#eee",
	},

	albumPhotoContainer: {
		flexDirection: "row",
		width: '100%',
		// justifyContent: "",
		gap: 15,
		flexWrap: "wrap",
		// marginTop: 10,
		// backgroundColor: 'red'
	}
	
});