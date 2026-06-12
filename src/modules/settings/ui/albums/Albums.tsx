import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { ICONS } from "@shared/ui";
import { AlbumsModal } from "@shared/ui/albumsModal/AlbumsModal";
import { IAlbumData } from "@shared/ui/albumsModal/types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
	Album,
	CreateAlbumDto,
	useCreateAlbumMutation,
	useGetAlbumsQuery,
	useUpdateAlbumMutation,
	useTogglePhotoVisibilityMutation,
} from "@modules/settings/api/albumApi";
import { COLORS } from "@shared/constants/colors";
import { Image } from "react-native";
import { AddAlbumPhoto } from "../albumAddPhoto/addPhoto";
import { Link, Redirect } from "expo-router";
import { UserContext } from "@modules/auth/context/user-context";
import { AlbumItem } from "../albumItem/AlbumItem";
import { DeleteAlbum } from "../deleteAlbum/deleteAlbum";
import { DeletePhoto } from "../deletePhoto/deletePhoto";
import { SERVER } from "@shared/constants/server";

type AlbumForm = {
	id: number;
	name: string;
	theme: string;
	year: string;
};

export const AlbumsPage = () => {
	const [createAlbum] = useCreateAlbumMutation();
	const [updateAlbum] = useUpdateAlbumMutation();
	const [ togglePhotoVisibility ] = useTogglePhotoVisibilityMutation()
	const { user } = useContext(UserContext)!;
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [editAlbumModalVisibile, setEditAlbumModalVisibile] = useState<boolean>(false)
	
	const handleCreateNew = () => {
		setSelectedAlbum(null);
		setModalVisible(true);
	};
	
	const handleEdit = (album: Album) => {
		setSelectedAlbum(album);
		setModalVisible(true);
	};
	
	const handleEditAlbum = () => {
		setEditAlbumModalVisibile(true)
	}
	
	
	const toForm = (album: Album): AlbumForm => ({
		id: album.id,
		name: album.name,
		theme: album.theme,
		year: album.year,
	});
	const handleSave = async (data: AlbumForm) => {
		const payload: CreateAlbumDto = {
			name: data.name,
			theme: data.theme!,
			year: data.year!,
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
	const { data: albums = [] } = useGetAlbumsQuery(user.id, {
        pollingInterval: 3000,
	});
	const handlePhotoVisibility = async (photoId: number, isVisible: boolean) => {
		try {
			await togglePhotoVisibility({photoId, isVisible})
		}catch (error){
			console.log(error)
		}
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
                
                {albums.some(a => a.name === "Мої фото" || a.name === "Аватарки") && (
                    <AlbumItem 
                        album={albums.find(a => a.name === "Мої фото" || a.name === "Аватарки")!} 
                        variant="avatar"
                        onToggleAlbumVisibility={(id, currentStatus) => {
                            updateAlbum({ id, data: { is_shown: !currentStatus } });
                        }}
                        onTogglePhotoVisibility={handlePhotoVisibility}
                    />
                )}

                <View style={styles.createCard}>
                    <Text style={styles.createCardText}>
                        {albums.length === 0 ? "Немає ще жодного альбому" : "Створити новий альбом"}
                    </Text>
                    <TouchableOpacity style={styles.plusBtn} onPress={handleCreateNew}>
                        <ICONS.PlusIcon color="#000" />
                    </TouchableOpacity>
                </View>

                {albums
                    .filter(album => album.name !== "Мої фото" && album.name !== "Аватарки")
                    .map((album) => (
                        <View key={album.id} style={styles.albumCard}>
                            <View style={styles.albumHeader}>
                                <View style={styles.albumContainer}>
                                    <Text style={styles.albumTitle}>{album.name}</Text>
                                    <View style={styles.albumInfoContainer}>
                                        <Text style={{ color: COLORS.black, fontSize: 16 }}>
                                            {album.theme}
                                        </Text>
                                        <Text style={styles.albumInfo}>{album.year} рік</Text>
                                    </View>
                                </View>
                                
                                <View style={styles.actions}>
                                    <TouchableOpacity 
                                        style={styles.plusBtn} 
                                        onPress={() => {
                                            updateAlbum({
                                                id: album.id,
                                                data: { is_shown: !album.is_shown }
                                            });
                                        }}
                                    >
                                        {album.is_shown ? <ICONS.EyeOpen color="#000" /> : <ICONS.EyeClose color="#000" />}
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEditAlbum()}>
                                        <ICONS.DotsIcon color="#000" />
                                    </TouchableOpacity>

                                    {editAlbumModalVisibile && (
                                        <View style={styles.editAlbumModalContainer}>
                                            <TouchableOpacity 
                                                style={styles.dotIconContainer} 
                                                onPress={() => setEditAlbumModalVisibile(false)}
                                            >
                                                <ICONS.DotsIcon color={COLORS.gray} />
                                            </TouchableOpacity>

                                            <View>
                                                {!album.is_shown ? (
                                                    <View style={styles.albumEditBtn}>
                                                        <ICONS.EyeClose color={COLORS.black}/>
                                                        <Text style={styles.albumEditText}>Цей альбом бачите тільки ви</Text>
                                                    </View>
                                                ) : (
                                                    <View style={styles.albumEditBtn}>
                                                        <ICONS.EyeOpen color={COLORS.black}/>
                                                        <Text style={styles.albumEditText}>Цей альбом бачать усі користувачі</Text>
                                                    </View>
                                                )}
                                            </View>
                                            
                                            <TouchableOpacity onPress={() => handleEdit(album)} style={styles.albumEditBtn}>
                                                <ICONS.EditIcon color={COLORS.black}/>
                                                <Text style={styles.albumEditText}>Редагувати альбом</Text>
                                            </TouchableOpacity>

                                            <View style={styles.devider}></View>

                                            <DeleteAlbum 
                                                albumId={album.id} 
                                                albumTitle={album.name} 
                                                onSuccess={() => setEditAlbumModalVisibile(false)} 
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                            { album.photos && (
                                <View style={styles.albumPhotoContainer}>
                                    {album.photos.map((photo) => (
                                        <View key={photo.id}>
                                            <Image
                                                source={{
                                                    uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photo.image}`,
                                                }}
                                                style={styles.albumPhoto}
                                                blurRadius={photo.is_shown && album.is_shown ? 0 : 9}
                                            />
                                            <View style={styles.photoBtns}>
                                                <TouchableOpacity
                                                    style={styles.photoBtn}
                                                    onPress={() => handlePhotoVisibility(photo.id, !photo.is_shown)}
                                                >
                                                    {photo.is_shown && album.is_shown
                                                        ? <ICONS.EyeOpen color={COLORS.plum} />
                                                        : <ICONS.EyeClose color={COLORS.plum} />
                                                    }
                                                </TouchableOpacity>

                                                <View style={styles.photoBtn}>
                                                    <DeletePhoto photoId={photo.id} />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                    <AddAlbumPhoto albumId={album.id} userId={user.id} />
                                </View>
                            )}
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
)};