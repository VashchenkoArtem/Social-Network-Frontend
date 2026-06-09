import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@shared/ui";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Button } from "@shared/ui/button";
import { PlusIcon } from "@shared/ui/icons/buttons/Plus";
import { COLORS } from "@shared/constants/colors";
import { SERVER } from "@shared/constants/server";
import { getAvatar } from "@shared/utils/avatar";

interface AvatarFieldProps {
    value?: string;
    onPress: () => void;
    avatar?: string;
}

export function AvatarField({ value, onPress, avatar }: AvatarFieldProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.ContainerAvatar}
        >
            <View style={styles.AvatarView}>
                <Image
                    source={{uri: value
						? value
						: `http://${SERVER.host}:${SERVER.port}/media/thumb/${avatar}` 
					}}
                    style={styles.SelectedAvatar}
                />
            </View>
        </TouchableOpacity>
    );
}
