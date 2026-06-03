import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, Text, View } from "react-native";
import { useAddAlbumPhotoMutation } from "@modules/settings/api/albumApi";
import { Button } from "@shared/ui/button";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { styles } from "./styles";
import { SERVER } from "@shared/constants/server";
import { ReactNativeFile } from "@modules/auth/api/api.types";
import { useUserContext } from "@modules/auth/context/user-context";

type Props = {
	albumId: number;
};

export const AddAlbumPhoto = ({ albumId }: Props) => {
	const { token } = useUserContext()!
	const addPhoto = async ({albumId,files}: {albumId: number, files: ReactNativeFile[]}) => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();

		formData.append('albumId', String(albumId));

		xhr.open('PATCH', `http://${SERVER.host}:${SERVER.port}/add-photo`);

		xhr.setRequestHeader('Authorization', `Bearer ${token}`);

		xhr.onload = () => {
			console.log('STATUS:', xhr.status);
			console.log('RESPONSE:', xhr.responseText);
		};

		xhr.onerror = (e) => {
			console.log('XHR ERROR:', e);
		};

		xhr.send(formData);
	};

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
