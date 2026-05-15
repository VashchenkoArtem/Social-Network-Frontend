import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@shared/ui";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Button } from "@shared/ui/button";
import { PlusIcon } from "@shared/ui/icons/buttons/Plus";
import { COLORS } from "@shared/constants/colors";
import { SERVER } from "@shared/constants/server";

interface AvatarFieldProps {
	value?: string;
	onChange: (uri: string) => void;
	avatar: string | null
}

export function AvatarField({ value, onChange, avatar }: AvatarFieldProps) {
	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (result.canceled) return;

		const asset = result.assets[0];
		onChange(asset.uri);
	}
	
	const getImageSource = () => {
        if (value) return { uri: value };
        if (avatar) return { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${avatar}` }; 
        return require("../../../../assets/defaultAvatar.png");
    };

	return (
        <TouchableOpacity onPress={pickImage} style={styles.ContainerAvatar}>
            <View style={styles.AvatarView}>
                <Image
                    source={getImageSource()}
                    style={styles.SelectedAvatar}
                />
            </View>
        </TouchableOpacity>
    );
}
