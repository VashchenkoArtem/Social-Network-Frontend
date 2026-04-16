import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { ICONS } from "@shared/ui"; 
import { AlbumsModal } from "@shared/ui/albumsModal/AlbumsModal";
import { IAlbumData } from "@shared/ui/albumsModal/types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { 
    useGetAlbumsQuery, 
    useCreateAlbumMutation, 
    useUpdateAlbumMutation 
} from "@modules/auth/api/albumsApi";
import { Album, CreateAlbumRequest } from "@modules/auth/api/api.types";
import { COLORS } from "@shared/constants/colors";

export const AlbumsPage = () => {
    const { data: albums = [], isLoading } = useGetAlbumsQuery();
    const [createAlbum] = useCreateAlbumMutation();
    const [updateAlbum] = useUpdateAlbumMutation();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

    const modalInitialData = useMemo(() => {
        if (!selectedAlbum) return null;
        
        return {
            title: selectedAlbum.title || "",
            theme: selectedAlbum.topic?.name || "", 
            year: selectedAlbum.createdAt?.createdAt 
                ? new Date(selectedAlbum.createdAt.createdAt).getFullYear().toString() 
                : new Date().getFullYear().toString()
        };
    }, [selectedAlbum]);

    const handleSave = async (formData: IAlbumData) => {
        try {
            const payload: CreateAlbumRequest = {
                title: formData.title,
                theme: formData.theme,
                year: formData.year,
                isVisible: true,
            };

            if (selectedAlbum) {
                await updateAlbum({ 
                    id: selectedAlbum.id, 
                    ...payload
                }).unwrap();
            } else {
                await createAlbum(payload).unwrap();
            }
            
            closeModal();
        } catch (e) {
            console.error("Помилка при збереженні:", e);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedAlbum(null);
    };

    const openCreateModal = () => {
        setSelectedAlbum(null);
        setModalVisible(true);
    };

    const openEditModal = (album: Album) => {
        setSelectedAlbum(album);
        setModalVisible(true);
    };

    if (isLoading) {
        return (
            <View style={[styles.contentContainer, { justifyContent: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <View style={styles.contentContainer}>
                    <TouchableOpacity 
                        style={styles.createCard} 
                        onPress={openCreateModal}
                    >
                        <Text style={styles.createCardText}>
                            {albums.length > 0 ? "Створити альбом" : "Немає ще жодного альбому"}
                        </Text>
                        <View style={styles.plusBtn}>
                            <ICONS.PlusIcon color="#000" />
                        </View>
                    </TouchableOpacity>

                    {albums.map((album) => (
                        <View key={album.id} style={styles.albumCard}>
                            <View style={styles.albumHeader}>
                                <View>
                                    <Text style={styles.albumTitle}>
                                        {album.title}
                                    </Text>
                                    <Text style={styles.albumInfo}>
                                        {album.topic?.name} • {new Date(album.createdAt.createdAt).getFullYear()}
                                    </Text>
                                </View>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => openEditModal(album)}>
                                        <ICONS.ManageIcon color={COLORS.gray} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <TouchableOpacity style={styles.addPhotoDashed}>
                                <ICONS.PlusIcon color={COLORS.gray} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <AlbumsModal 
                visible={modalVisible}
                onClose={closeModal}
                onSubmit={handleSave}
                initialData={modalInitialData} 
            />
        </KeyboardAwareScrollView>
    );
};