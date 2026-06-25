import { View,Text, Image } from "react-native";
import { styles } from "./friendAlbum.styles";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { Album } from "@modules/settings/api/albumApi";
import { CLOUDINARY_URL, NGROK_SERVER_URL } from "@shared/constants/server";
export function FriendAlbum(props: {album: Album}){
    const { album } = props
    return (
        <View style = {styles.contentCard}>
            <Text style = {styles.name}>{album.name}</Text>
            <View style = {{flexDirection: "row", gap: 16}}>
                <Text style = {styles.theme}>{album.theme}</Text>
                <Text style = {[styles.textGray, styles.year]}>{album.year} рік</Text>
            </View>
            <View style = {{gap: 5}}>
                { album.photos  && 
                    ( album.photos.length !== 0  && 
                        <Image
                            source={{
                                uri: `${CLOUDINARY_URL}${album.photos[album.photos.length - 1].image}`
                            }}
                            height={162}
                            width={343}
                            style = {{borderRadius: 10}}
                        />
                    )

                }
            </View>
        </View>
    )
}