import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@shared/ui";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Button } from "@shared/ui/button";
import { PlusIcon } from "@shared/ui/icons/buttons/Plus";
import { COLORS } from "@shared/constants/colors";

interface AvatarFieldProps {
	value?: string;
	onChange: (uri: string) => void;
}

export function AvatarField({ value, onChange }: AvatarFieldProps) {
	const [updateUser, { isLoading }] = useUpdateUserInfoMutation();


	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (result.canceled) { return }

		const asset = result.assets[0]

		onChange(asset.uri);

	}

	return (
		<View>
			<Button
				variant={"white"}
				iconLeft={<PlusIcon color={COLORS.plum} />}
				text={"Додайте фото"}
				onPress={pickImage}
				isSettings={true}
				style={{ borderWidth: 0 }}
			>

				<TouchableOpacity  style={styles.ContainerAvatar}>
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
			</Button>
		</View>
	);
}
