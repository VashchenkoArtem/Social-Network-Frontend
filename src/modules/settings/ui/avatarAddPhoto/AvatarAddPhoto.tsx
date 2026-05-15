import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Button } from "@shared/ui/button";
import * as ImagePicker from "expo-image-picker";

export function AvatarAddPhoto() {
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (asset) {
            await updateUser({
                avatar: {
                    uri: asset.uri,
                    name: asset.fileName ?? "avatar.jpg",
                    type: asset.mimeType ?? "image/jpeg"
                }
            });
        }
    };

    return (
        <Button 
            onPress={pickImage}
            variant="white" 
            text={isLoading ? "Завантаження..." : "Додати фото"} 
            iconLeft={<ICONS.MyPostsPageIcon color={COLORS.plum}/>}
        />
    );
}