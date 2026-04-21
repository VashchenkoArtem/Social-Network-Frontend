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
			mediaTypes: ["images"],
			quality: 0.8,
		});

		if (result.canceled) return;

		const asset = result.assets[0];

		await addPhoto({
			albumId,
			file: {
				uri: asset.uri,
				name: asset.fileName ?? "photo.jpg",
				type: asset.type ?? "image/jpeg",
			},
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
