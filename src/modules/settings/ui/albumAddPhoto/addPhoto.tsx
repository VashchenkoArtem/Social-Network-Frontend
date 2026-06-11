import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { albumApi } from "@modules/settings/api/albumApi";
import { Button } from "@shared/ui/button";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { styles } from "./styles";
import { SERVER } from "@shared/constants/server";
import { ReactNativeFile } from "@modules/auth/api/api.types";
import { useUserContext } from "@modules/auth/context/user-context";
import { useState } from "react";
import { useAppDispatch } from "@modules/posts/api/store";

type Props = {
    albumId: number;
    userId: number;
};

export const AddAlbumPhoto = ({ albumId, userId }: Props) => {
    const { token } = useUserContext()!;
    const dispatch = useAppDispatch();
    const [isUploading, setIsUploading] = useState(false);

    const addPhoto = async ({ albumId, files }: { albumId: number; files: ReactNativeFile[] }) => {
        setIsUploading(true);

        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('albumId', String(albumId));

        files.forEach((file) => {
            formData.append("images", {
                uri: file.uri,
                name: file.name ?? `photo_${Date.now()}.jpg`,
                type: file.type ?? "image/jpeg",
            } as any);
        });

        xhr.open('POST', `http://${SERVER.host}:${SERVER.port}/upload/${albumId}`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onload = () => {
            setIsUploading(false);
            
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    
                    (dispatch as any)(
                        albumApi.util.updateQueryData("getAlbums", userId, (draft) => {
                            const currentAlbum = draft.find(album => album.id === albumId);
                            
                            if (currentAlbum) {
                                if (!currentAlbum.photos) {
                                    currentAlbum.photos = [];
                                }

                                if (Array.isArray(responseData)) {
                                    currentAlbum.photos.push(...responseData);
                                }
                                else if (responseData && responseData.photos) {
                                    currentAlbum.photos = responseData.photos;
                                }
                            }
                        })
                    );
                } catch (e) {
                    console.log("Помилка парсингу або оновлення кэшу:", e);
                }
            } else {
                console.log('STATUS ERROR:', xhr.status, xhr.responseText);
            }
        };

        xhr.onerror = (e) => {
            setIsUploading(false);
            console.log('XHR ERROR:', e);
        };

        xhr.send(formData);
    };

    const pickImage = async () => {
        if (isUploading) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsMultipleSelection: true,
        });

        if (result.canceled || !result.assets?.length) return;

        const files = result.assets.map((asset) => ({
            uri: asset.uri,
            name: asset.fileName ?? `photo_${Date.now()}.jpg`,
            type: asset.mimeType ?? "image/jpeg",
        }));

        await addPhoto({
            albumId,
            files,
        });
    };

    return (
        <TouchableOpacity onPress={pickImage} disabled={isUploading}>
            <View style={styles.btnView}>
                <Button
                    variant="white"
                    iconLeft={
                        isUploading ? (
                            <ActivityIndicator size="small" color={COLORS.plum} />
                        ) : (
                            <ICONS.PlusIcon color={COLORS.plum} />
                        )
                    }
                />
            </View>
        </TouchableOpacity>
    );
};