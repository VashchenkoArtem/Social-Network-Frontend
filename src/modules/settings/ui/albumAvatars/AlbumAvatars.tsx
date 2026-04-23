import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Button } from "@shared/ui/button";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AvatarsProps } from "./albumAvatars.types";
import { styles } from "./styles";
import { AvatarAddPhoto } from "../avatarAddPhoto/AvatarAddPhoto";
import { DeletePhoto } from "../deletePhoto/deletePhoto";

export function AlbumAvatars(props: AvatarsProps){
    const { avatars } = props
    return (
        <View style = {styles.albumAvatarsContainer}>
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
                                    uri: `http://192.168.1.111:8000/media/thumb/${avatar.filename}`,
                                }}
                                style={{
                                    width: 162,
                                    height: 162,
                                    margin: 4,
                                    borderRadius: 10,
                                    backgroundColor: "#eee",
                                }}
                                
                                />
                            <TouchableOpacity style={styles.btnContainer}>
                                <View style={styles.photoBtn}>
                                    <DeletePhoto photoId={avatar.id} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}