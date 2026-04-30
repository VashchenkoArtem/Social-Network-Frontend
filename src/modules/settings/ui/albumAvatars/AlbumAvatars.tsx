import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Button } from "@shared/ui/button";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AvatarsProps } from "./albumAvatars.types";
import { styles } from "./styles";
import { AvatarAddPhoto } from "../avatarAddPhoto/AvatarAddPhoto";
import { DeletePhoto } from "../deletePhoto/deletePhoto";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export function AlbumAvatars(props: AvatarsProps){
    const { avatars, handlePhotoVisibility } = props
    return (
        <View style = {[styles.albumAvatarsContainer, avatars.length > 0 && { gap: 16}]}>
            <View style = {styles.albumTitleContainer}>
                <Text style = {styles.title}>Мої фото</Text>
                <AvatarAddPhoto></AvatarAddPhoto>
            </View>
            <View style = {styles.avatars}>
                { avatars?.map((avatar) => {
                    return (
                        <View key={avatar.id}>
                            <Image
                                source={{
                                    uri: `http://192.168.88.237:8000/media/thumb/${avatar.filename}`,
                                }}
                                style={[{
                                    width: 162,
                                    height: 162,
                                    margin: 4,
                                    borderRadius: 10,
                                    backgroundColor: "#eee",
                                }]}
                                blurRadius={avatar.isVisible ? 0 : 9}
                                
                                />
                                <View>
                                    <TouchableOpacity 
                                        style={[styles.btnContainer, {right: 50}]}
                                        onPress={() => handlePhotoVisibility(avatar.id, !avatar.isVisible)}
                                    >
                                        <View style = {styles.photoBtn}>
                                            {avatar.isVisible
                                                ? <ICONS.EyeOpen color={COLORS.plum} />
                                                : <ICONS.EyeClose color={COLORS.plum} />
                                            }
                                        </View>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={styles.btnContainer}>
                                        <View style={styles.photoBtn}>
                                            <DeletePhoto photoId={avatar.id} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}