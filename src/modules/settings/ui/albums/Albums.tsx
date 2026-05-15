import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ICONS } from "@shared/ui";
import { AlbumsModal } from "@shared/ui/albumsModal/AlbumsModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    Album,
    CreateAlbumDto,
    useCreateAlbumMutation,
    useGetAlbumsQuery,
    useUpdateAlbumMutation,
    useTogglePhotoVisibilityMutation,
} from "@modules/settings/api/albumApi";
import { UserContext } from "@modules/auth/context/user-context";
import { Redirect } from "expo-router";
import { DeleteAlbum } from "../deleteAlbum/deleteAlbum";
import { AlbumItem } from "../albumAvatars/AlbumItem"; 
import { styles } from "./styles";
import { COLORS } from "@shared/constants/colors";

type AlbumForm = {
    id: number;
    name: string;
    theme: string;
    year: string;
};

interface ExtendedAlbum extends Album {
    is_default?: boolean;
}

export const AlbumsPage = () => {
    const { data: albums = [] } = useGetAlbumsQuery(undefined, { 
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true 
    }) as { data: ExtendedAlbum[] };
    const [createAlbum] = useCreateAlbumMutation();
    const [updateAlbum] = useUpdateAlbumMutation();
    const [togglePhotoVisibility] = useTogglePhotoVisibilityMutation();
    const { user } = useContext(UserContext)!;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    if (!user) return <Redirect href={"/login"} />;

    const avatarAlbum = albums.find(a => a.is_default);
    const regularAlbums = albums.filter(a => !a.is_default);

    const handleCreateNew = () => {
        setSelectedAlbum(null);
        setModalVisible(true);
    };

    const handleEditClick = (album: Album) => {
        setSelectedAlbum(album);
        setModalVisible(true);
        setOpenMenuId(null);
    };

    const handleSave = async (data: AlbumForm) => {
        const payload: CreateAlbumDto = {
            name: data.name,
            theme: data.theme,
            year: data.year,
        };

        if (selectedAlbum) {
            await updateAlbum({ id: selectedAlbum.id, data: payload }).unwrap();
        } else {
            await createAlbum(payload).unwrap();
        }
        setModalVisible(false);
    };

    const handleToggleAlbumVisibility = async (id: number, current: boolean) => {
        await updateAlbum({ id, data: { is_shown: !current } });
    };

    const handleTogglePhotoVisibility = async (photoId: number, isVisible: boolean) => {
        try {
            await togglePhotoVisibility({ photoId, isVisible });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                <View style={styles.contentContainer}>
                    
                    {avatarAlbum && (
                        <AlbumItem
                            album={avatarAlbum}
                            variant="avatar"
                            onToggleAlbumVisibility={handleToggleAlbumVisibility}
                            onTogglePhotoVisibility={handleTogglePhotoVisibility}
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

                    {regularAlbums.map((album) => (
                        <View key={album.id}>
                            <AlbumItem
                                album={album}
                                variant="regular"
                                isMenuOpen={openMenuId === album.id}
                                onMenuToggle={(open) => setOpenMenuId(open ? album.id : null)}
                                onEdit={handleEditClick}
                                onToggleAlbumVisibility={handleToggleAlbumVisibility}
                                onTogglePhotoVisibility={handleTogglePhotoVisibility}
                            />

                            {openMenuId === album.id && (
                                <View style={styles.editAlbumModalContainer}>
                                    <TouchableOpacity 
                                        style={styles.dotIconContainer} 
                                        onPress={() => setOpenMenuId(null)}
                                    >
                                        <ICONS.DotsIcon color={COLORS.gray} />
                                    </TouchableOpacity>

                                    <View style={styles.albumEditBtn}>
                                        {album.is_shown ? <ICONS.EyeOpen color="#000"/> : <ICONS.EyeClose color="#000"/>}
                                        <Text style={styles.albumEditText}>
                                            {album.is_shown ? "Альбом бачать усі" : "Альбом бачите тільки ви"}
                                        </Text>
                                    </View>

                                    <TouchableOpacity onPress={() => handleEditClick(album)} style={styles.albumEditBtn}>
                                        <ICONS.EditIcon color={COLORS.black}/>
                                        <Text style={styles.albumEditText}>Редагувати альбом</Text>
                                    </TouchableOpacity>

                                    <View style={styles.devider} />

                                    <DeleteAlbum 
                                        albumId={album.id} 
                                        albumTitle={album.name} 
                                        onSuccess={() => setOpenMenuId(null)} 
                                    />
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
                initialData={selectedAlbum ? {
                    id: selectedAlbum.id,
                    name: selectedAlbum.name,
                    theme: selectedAlbum.theme,
                    year: selectedAlbum.year
                } : null}
            />
        </KeyboardAwareScrollView>
    );
};