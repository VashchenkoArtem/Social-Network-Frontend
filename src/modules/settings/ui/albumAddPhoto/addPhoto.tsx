import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, Text, View } from "react-native";
import { useAddAlbumPhotoMutation } from "@modules/settings/api/albumApi";
import { Button } from "@shared/ui/button";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { styles } from "./styles";

type Props = {
	albumId: number;
};

export const AddAlbumPhoto = ({ albumId }: Props) => {
	const [addPhoto] = useAddAlbumPhotoMutation();

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8,
			allowsMultipleSelection: true,
		});

		if (result.canceled) return;

		const files = result.assets.map((asset) => ({
			uri: asset.uri,
			name: asset.fileName ?? "photo.jpg",
			type: asset.mimeType ?? "image/jpeg",
		}));

		await addPhoto({
			albumId,
			files,
		});
	};

	return (
		<TouchableOpacity onPress={pickImage}>
			<View style={styles.btnView}>
				<Button
					variant="white"
					iconLeft={<ICONS.PlusIcon color={COLORS.plum} />}
				/>
			</View>
		</TouchableOpacity>
	);
};
