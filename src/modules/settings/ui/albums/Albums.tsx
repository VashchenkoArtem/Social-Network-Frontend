import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ICONS } from "@shared/ui"; 
import { AlbumsModal } from "@shared/ui/albumsModal/AlbumsModal";
import { IAlbum, IAlbumData } from "@shared/ui/albumsModal/types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const AlbumsPage = () => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const handleCreateNew = () => {
        setSelectedAlbum(null);
        setModalVisible(true);
    };

    const handleEdit = (album: IAlbum) => {
        setSelectedAlbum(album);
        setModalVisible(true);
    };

    const handleSave = (data: IAlbumData) => {
        if (selectedAlbum) {
            setAlbums(prev => prev.map(a => 
                a.id === selectedAlbum.id ? { ...a, ...data } : a
            ));
        } else {
            const newAlbum: IAlbum = {
                id: Date.now().toString(),
                ...data,
                isVisible: true
            };
            setAlbums(prev => [...prev, newAlbum]);
        }
    };

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
                            {albums.length > 0 ? "Створити альбом" : "Немає ще жодного альбому"}
                        </Text>
                        <TouchableOpacity style={styles.plusBtn} onPress={handleCreateNew}>
                            <ICONS.PlusIcon color="#000" />
                        </TouchableOpacity>
                    </View>

                    {albums.map(album => (
                        <View key={album.id} style={styles.albumCard}>
                            <View style={styles.albumHeader}>
                                <View>
                                    <Text style={styles.albumTitle}>{album.name}</Text>
                                    <Text style={styles.albumInfo}>{album.theme} • {album.year} рік</Text>
                                </View>
                                <View style={styles.actions}>
                                    <TouchableOpacity>
                                        <ICONS.EyeOpen color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEdit(album)}>
                                        <ICONS.ManageIcon color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addPhotoDashed}>
                                <ICONS.PlusIcon color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                
            </ScrollView>
            <AlbumsModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSave}
                initialData={selectedAlbum} 
            />
        </KeyboardAwareScrollView>
    );
};