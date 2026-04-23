import React from "react";
import { TouchableOpacity, Alert, Text } from "react-native";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { useDeleteAlbumMutation } from "@modules/settings/api/albumApi";
import { styles } from "../albums/styles"


type Props = {
    albumId: number;
    albumTitle: string;
    onSuccess?: () => void;
};

export const DeleteAlbum = ({ albumId, albumTitle, onSuccess }: Props) => {
    const [deleteAlbum, { isLoading }] = useDeleteAlbumMutation();

    const handleDelete = () => {
        if (!albumId) {
            Alert.alert("Помилка", "ID альбому відсутній");
            return;
        }

        Alert.alert(
            "Видалити альбом",
            `Ви впевнені, що хочете видалити альбом "${albumTitle}"?`,
            [
                { text: "Скасувати", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteAlbum({ id: albumId }).unwrap();
                            if (onSuccess) onSuccess();
                        } catch (error) {
                            Alert.alert("Помилка", "Не вдалося видалити альбом");
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity
            style={styles.albumEditBtn}
            onPress={handleDelete} 
            disabled={isLoading}
        >
            <ICONS.DeleteIcon color={COLORS.black} />
            <Text style={styles.albumEditText}>Видалити альбом</Text>
        </TouchableOpacity>
    );
};