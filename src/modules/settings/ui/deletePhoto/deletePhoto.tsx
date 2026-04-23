import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { useDeletePhotoMutation } from "@modules/settings/api/albumApi";

type Props = {
    photoId: number;
};

export const DeletePhoto = ({ photoId }: Props) => {
    const [deletePhoto, { isLoading }] = useDeletePhotoMutation();

    const handleDelete = () => {
        Alert.alert(
            "Видалення",
            "Ви впевнені, що хочете видалити це фото?",
            [
                { text: "Скасувати", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deletePhoto({ photoId }).unwrap();
                        } catch (error) {
                            Alert.alert("Помилка", "Не вдалося видалити фото");
                            console.error("Delete error:", error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity 
            onPress={handleDelete} 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.5 : 1 }}
        >
            <ICONS.DeleteIcon color={COLORS.plum} />
        </TouchableOpacity>
    );
};