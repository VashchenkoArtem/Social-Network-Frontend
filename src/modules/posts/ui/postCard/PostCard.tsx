import { View, Image, Text, TouchableOpacity } from "react-native";
import { getPhotoStyle, styles } from "./styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Link, Redirect } from "expo-router";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";


export function PostCard(props: IProps){
    const { post } = props
    const photos = post.photos ?? [];
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatarSignatureInfo}>
                    <View style={styles.postAvatarInfo}>
                        <Image style={styles.authorAvatar} source={
							post.author.avatars[post.author.avatars?.length - 1]
							? { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${post.author.avatars[post.author.avatars.length - 1]?.filename}`, }
							: require("../../../../assets/defaultAvatar.png")
					}/>
                        <Text style={styles.authorName}>{post.author.nickname}</Text>
                    </View>
                    { post.author.signature && 
                    <Image style={styles.authorSignature} source={{
                        uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${post.author.signature}`
                    }}/>}
                </View>
                <TouchableOpacity style={styles.dotIconContainer} >
                    <ICONS.DotsIcon color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{ post.title }</Text>
                
                <View>
                    <Text style={styles.postDescription}>{ post.content }</Text>
                    <View style = {{flexDirection: "row", gap: 5}}>
                        { post.tags?.map((tag) => {
                            return (
                                <Text style = {styles.tag} key = {tag.tag.id}>#{tag.tag.name}</Text>
                            )
                        })}
                    </View>
                </View>

                <View>
                    { post.urls?.map((url) => {
                        return (
                            <Link href={url.href} key={url.id} style = {[styles.tag, {textDecorationLine: "underline"}]}>{url.href}</Link>
                        )
                    })}
                </View>
            {photos?.length === 1 && (
                <Image
                    source={{ uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photos[0].original_image}` }}
                    style={{ width: "100%", height: 250, borderRadius: 10 }}
                />
            )}

            {photos?.length > 1 && (
                <View style={styles.photosContainer}>
                    {photos.map((photo) => (
                        <Image
                            key={photo.id}
                            source={{
                                uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photo.original_image}`,
                            }}
                            style={getPhotoStyle(photos.length)}
                        />
                    ))}
                </View>
            )}
                <View style={styles.postFooter}>
                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn}>
                            <ICONS.PostLikeIcon width = {20} height={20} color = {COLORS.gray}/>
                            <Text>Вподобань</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn}>
                            <ICONS.PostThumbUpIcon width = {20} height={20} color = {COLORS.gray}/>
                            <Text>Вподобань</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn}>
                            <ICONS.PostViewsIcon width = {20} height={20} color = {COLORS.gray}/>
                            <Text>Переглядів</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </View>
    )
}