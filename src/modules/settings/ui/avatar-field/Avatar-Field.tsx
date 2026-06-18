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
import { BigUserCard } from "@shared/ui/bigUserCard/BigUserCard";

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
            <BigUserCard avatar={value ? value : avatar} usernameNotIncluded={true} isOnline={true}/>
        </TouchableOpacity>
    );
}
