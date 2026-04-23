import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Button } from "@shared/ui/button";
import * as ImagePicker from "expo-image-picker";

export function AvatarAddPhoto(){
    const [ updateUser ] = useUpdateUserInfoMutation()

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (asset){
            await updateUser({avatar: asset.uri});
        }
    };
    return (
        <Button 
            onPress={pickImage}
            variant="white" 
            text = "Додати фото" 
            iconLeft={<ICONS.MyPostsPageIcon color = {COLORS.plum}/>}
        />
    )
}