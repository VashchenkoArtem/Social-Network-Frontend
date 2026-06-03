import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import { getPhotoStyle, styles } from "./styles";
import { useContext, useState } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Link, Redirect } from "expo-router";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors";
import Modal from "react-native-modal"

import { CreatePostForm } from "@modules/posts/ui/create-post-form";
import { useDeletePostMutation } from "@modules/posts/api/postsApi";
import { getAvatar } from "@shared/utils/avatar";
import { SmallUserCard } from "@shared/ui/smallUserCard/SmallUserCard";


export function PostCard(props: IProps){
    const { post, isEditingPost } = props
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const photos = post.post_app_postimage ?? [];
    const [isPostModalOpen, setisPostModalOpen] = useState(false)
    const handleEdit = () => {
        setIsMenuOpen(false);
        setTimeout(() => {
            setIsEditModalOpen(true);
        }, 500);
    };
    const authorProfile = post.user_app_user.profile_app_profile
    const authorUser = post.user_app_user
    return (
        <View style={styles.postContainer}>
            <SmallUserCard username={authorUser.username} avatar={authorProfile.avatar} signature={authorProfile.signature} isPadding={true}/>
            <Modal
                isVisible={isEditModalOpen}
                onBackdropPress={() => setIsEditModalOpen(false)}
                onSwipeComplete={() => setIsEditModalOpen(false)}
                style={styles.fullModal}
                useNativeDriver
            >
                <View style={styles.formModalContainer}>
                    <View style={styles.closeModalContainer}>
                        <TouchableOpacity onPress={() => setIsEditModalOpen(false)} hitSlop={15}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <CreatePostForm 
                        setIsCreatePostModalOpen={setIsEditModalOpen} 
                        editData={post} 
                    />
                </View>
            </Modal>


            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{ post.title }</Text>
                
                <View>
                    <Text style={styles.postDescription}>{ post.content }</Text>
                    <View style = {{flexDirection: "row", gap: 5}}>
                        { post.post_app_post_tags?.map((tag) => {
                            return (
                                <Text style = {styles.tag} key = {tag.post_app_tag.id}>#{tag.post_app_tag.name}</Text>
                            )
                        })}
                    </View>
                </View>

                <View>
                    { post.post_app_postlink?.map((url) => {
                        return (
                            <Link href={url.url} key={url.id} style = {[styles.tag, {textDecorationLine: "underline"}]}>{url.url}</Link>
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