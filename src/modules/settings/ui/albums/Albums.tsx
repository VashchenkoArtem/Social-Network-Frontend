import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ICONS } from "@shared/ui";
import { AlbumsModal } from "@shared/ui/albumsModal/AlbumsModal";
import { IAlbum, IAlbumData } from "@shared/ui/albumsModal/types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
	Album,
	CreateAlbumDto,
	UpdateAlbumDto,
	useCreateAlbumMutation,
	useGetAlbumsQuery,
	useToggleVisibilityMutation,
	useUpdateAlbumMutation,
} from "@modules/settings/api/albumApi";
import { COLORS } from "@shared/constants/colors";
import { Image } from "react-native";
import { AddAlbumPhoto } from "../albumAddPhoto/addPhoto";
import { Link, Redirect } from "expo-router";
import { UserContext } from "@modules/auth/context/user-context";
type AlbumForm = {
	id: number;
	title: string;
	topicId: number;
	yearId: number;
};
export const AlbumsPage = () => {
	const { data: albums = [] } = useGetAlbumsQuery(undefined, {
		pollingInterval: 3000,
	});
	const [createAlbum] = useCreateAlbumMutation();
	const [updateAlbum] = useUpdateAlbumMutation();
	const [toggleVisibility] = useToggleVisibilityMutation();
	const { user } = useContext(UserContext)!;
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
	const [scrollEnabled, setScrollEnabled] = useState(true);
	const handleCreateNew = () => {
		setSelectedAlbum(null);
		setModalVisible(true);
	};

	const handleEdit = (album: Album) => {
		setSelectedAlbum(album);
		setModalVisible(true);
	};
	const toForm = (album: Album): AlbumForm => ({
		id: album.id,
		title: album.title,
		topicId: album.topic.id,
		yearId: album.year.id,
	});
	const handleSave = async (data: AlbumForm) => {
		const payload: CreateAlbumDto = {
			title: data.title,
			topicId: data.topicId!,
			yearId: data.yearId!,
		};

		if (selectedAlbum) {
			await updateAlbum({
				id: selectedAlbum.id,
				data: payload,
			}).unwrap();
		} else {
			await createAlbum(payload).unwrap();
		}

		setModalVisible(false);
	};
	if (!user) {
		return <Redirect href={"/login"}></Redirect>;
	}
	return (
		<KeyboardAwareScrollView
			scrollEnabled={scrollEnabled}
			bottomOffset={120}
			extraKeyboardSpace={20}
		>
			<ScrollView
				scrollEnabled={scrollEnabled}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 150 }}
				scrollEventThrottle={16}
			>
				<View style={styles.contentContainer}>
					<View style={styles.createCard}>
						<Text style={styles.createCardText}>
							{albums.length > 0
								? "Створити альбом"
								: "Немає ще жодного альбому"}
						</Text>
						<TouchableOpacity style={styles.plusBtn} onPress={handleCreateNew}>
							<ICONS.PlusIcon color="#000" />
						</TouchableOpacity>
					</View>

					{albums.map((album) => (
						<View key={album.id} style={styles.albumCard}>
							<View style={styles.albumHeader}>
								<View style={styles.albumContainer}>
									<Text style={styles.albumTitle}>{album.title}</Text>
									<View style={styles.albumInfoContainer}>
										<Text style={{ color: COLORS.black, fontSize: 16 }}>
											{album.topic.name}
										</Text>
										<Text style={styles.albumInfo}>{album.year.year} рік</Text>
									</View>
								</View>
								<View style={styles.actions}>
									<TouchableOpacity style={styles.plusBtn}>
										<ICONS.EyeOpen color="#000" />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => handleEdit(album)}>
										<ICONS.DotsIcon color="#000" />
									</TouchableOpacity>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginTop: 10,
								}}
							>
								{album.photos.map((photo) => (
									<View key={photo.id}>
										<Image
											source={{
												uri: `http://192.168.0.103:8000/media/thumb/${photo.filename}`,
											}}
											style={{
												width: 162,
												height: 162,
												margin: 4,
												borderRadius: 10,
												backgroundColor: "#eee",
											}}
										/>
										<View style={styles.photoBtns}>
											<TouchableOpacity
												style={styles.photoBtn}
												onPress={() =>
													toggleVisibility({ id: Number(album.id) })
												}
											>
												<ICONS.EyeOpen color={COLORS.plum} />
											</TouchableOpacity>
											<TouchableOpacity style={styles.photoBtn}>
												<ICONS.DeleteIcon color={COLORS.plum} />
											</TouchableOpacity>
										</View>
									</View>
								))}
								<AddAlbumPhoto albumId={album.id} />
							</View>
						</View>
					))}
				</View>
			</ScrollView>
			<AlbumsModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={handleSave}
				initialData={selectedAlbum ? toForm(selectedAlbum) : null}
			/>
		</KeyboardAwareScrollView>
	);
};
