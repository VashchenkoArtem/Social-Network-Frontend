import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { SERVER } from "@shared/constants/server";
import { Album } from "@modules/settings/api/albumApi";
import { DeletePhoto } from "../deletePhoto/deletePhoto";
import { AddAlbumPhoto } from "../albumAddPhoto/addPhoto";
import { AvatarAddPhoto } from "../avatarAddPhoto/AvatarAddPhoto";
import { styles } from "./styles";

interface AlbumItemProps {
    album: Album;
    variant: 'avatar' | 'regular';
    onEdit?: (album: Album) => void;
    onToggleAlbumVisibility: (id: number, currentStatus: boolean) => void;
    onTogglePhotoVisibility: (photoId: number, currentStatus: boolean) => void;
    isMenuOpen?: boolean;
    onMenuToggle?: (isOpen: boolean) => void;
}

export const AlbumItem = ({
    album,
    variant,
    onEdit,
    onToggleAlbumVisibility,
    onTogglePhotoVisibility,
    isMenuOpen,
    onMenuToggle
}: AlbumItemProps) => {
    const isAvatar = variant === 'avatar';
    
    const photosToRender = isAvatar 
        ? (album.photos ? album.photos?.length > 0 ? [album.photos[album.photos.length - 1]] : [] : [])
        : (album.photos || []);

    return (
        <View style={styles.albumCard}>
            <View style={styles.albumHeader}>
                <View style={styles.albumContainer}>
                    <Text style={styles.albumTitle}>
                        {isAvatar ? "Мої фото" : album.name}
                    </Text>
                    
                    {!isAvatar && (
                        <View style={styles.albumInfoContainer}>
                            <Text style={{ color: COLORS.black, fontSize: 16 }}>{album.theme}</Text>
                            <Text style={styles.albumInfo}>{album.year} рік</Text>
                        </View>
                    )}
                </View>

                <View style={styles.actions}>
                    {isAvatar ? (
                        <AvatarAddPhoto />
                    ) : (
                        <>
                        <TouchableOpacity onPress={() => onToggleAlbumVisibility(album.id, album.is_shown)}>
                            {album.is_shown ? <ICONS.EyeOpen color="#000" /> : <ICONS.EyeClose color="#000" />}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onMenuToggle?.(!isMenuOpen)}>
                            <ICONS.DotsIcon color={isMenuOpen ? COLORS.gray : "#000"} />
                        </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            <View style={styles.albumPhotoContainer}>
                {photosToRender.map((photo) => (
                    <View key={photo.id}>
                        <Image
                            source={{ uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photo.image}` }}
                            style={styles.albumPhoto}
                            blurRadius={isAvatar ? 0 : (photo.is_shown && album.is_shown ? 0 : 9)}
                        />
                        <View style={styles.photoBtns}>
                            <TouchableOpacity
                                style={styles.photoBtn}
                                onPress={() => onTogglePhotoVisibility(photo.id, !photo.is_shown)}
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
                {!isAvatar && (
                    <View style={styles.plusBtn}>
                        <AddAlbumPhoto userId={album.authorId} albumId={album.id} />
                    </View>
                )}
            </View>
        </View>
    );
};