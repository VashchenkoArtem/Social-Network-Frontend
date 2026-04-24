import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Redirect } from "expo-router";


export function PostCard(){
    const { user } = useContext(UserContext)! 
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatarSignatureInfo}>
                    <View style={styles.postAvatarInfo}>
                        <Image style={styles.authorAvatar} source={
							user.avatars[user.avatars.length - 1]
							? { uri: `http://192.168.0.104:8000/media/thumb/${user.avatars[user.avatars.length - 1]?.filename}`, }
							: require("../../../../assets/defaultAvatar.png")
					}/>
                        <Text style={styles.authorName}>{user.nickname}</Text>
                    </View>
                    { user.signature && 
                    <Image style={styles.authorSignature} source={{
                        uri: `http://192.168.0.104:8000/media/thumb/${user.signature}`
                    }}/>}
                </View>
                <TouchableOpacity style={styles.dotIconContainer} >
                    <ICONS.DotsIcon color={COLORS.gray} />
                </TouchableOpacity>
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>Інколи найкращі ідеї народжуються в тиші 🌿</Text>{/*  */}
            </View>
        </View>
    )
}