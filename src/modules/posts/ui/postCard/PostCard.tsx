import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Redirect } from "expo-router";
import { IProps } from "./types";


export function PostCard(props: IProps){
    const { post } = props
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatarSignatureInfo}>
                    <View style={styles.postAvatarInfo}>
                        <Image style={styles.authorAvatar} source={
							post.author.avatars[post.author.avatars?.length - 1]
							? { uri: `http://192.168.88.237:8000/media/thumb/${post.author.avatars[post.author.avatars.length - 1]?.filename}`, }
							: require("../../../../assets/defaultAvatar.png")
					}/>
                        <Text style={styles.authorName}>{post.author.nickname}</Text>
                    </View>
                    { post.author.signature && 
                    <Image style={styles.authorSignature} source={{
                        uri: `http://192.168.88.237:8000/media/thumb/${post.author.signature}`
                    }}/>}
                </View>
                <TouchableOpacity style={styles.dotIconContainer} >
                    <ICONS.DotsIcon color={COLORS.gray} />
                </TouchableOpacity>
            </View>
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{ post.title }</Text>
                <Text style={styles.postDescription}>{ post.content }</Text>

                {post.photos && (
                    <Image
                        source={{
                            uri: `http://192.168.88.237:8000/upload/${post.photos?.filename}`
                        }}
                        style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
                    />
                )}
            </View>
        </View>
    )
}