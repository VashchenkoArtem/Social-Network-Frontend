import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@shared/ui";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";

interface AvatarFieldProps {
	value?: string;
	onChange: (uri: string) => void;
}

export function AvatarField({ value, onChange }: AvatarFieldProps) {
	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (!result.canceled) {
			onChange(result.assets[0].uri);
		}
	}

	return (
		<TouchableOpacity onPress={pickImage} style={styles.ContainerAvatar}>
			<View style={styles.AvatarView}>
				{value ? (
					<Image
						source={{ uri: value }}
						style={styles.SelectedAvatar}
						resizeMode="cover"
					/>
				) : (
					<>
						<Image
							source={require("../../../../assets/defaultAvatar.png")}
							style={styles.DefaultAvatar}
							resizeMode="cover"
						/>
					</>
				)}
			</View>
		</TouchableOpacity>
	);
}
