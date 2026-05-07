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


export function PostCard(props: IProps){
    const { post } = props

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deletePost] = useDeletePostMutation();

    const photos = post.photos ?? [];
    const [isPostModalOpen, setisPostModalOpen] = useState(false)

    const handleEdit = () => {
        setIsMenuOpen(false);
        setTimeout(() => {
            setIsEditModalOpen(true);
        }, 500);
    };
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

                <Pressable
                    onPress={() => setisPostModalOpen(false)}
                >
                    <View style={styles.isModalOpenContainer}>
                        <TouchableOpacity
                            style={styles.dotIconContainer}
                            onPress={(event) => {
                                event.stopPropagation()
                                setisPostModalOpen(!isPostModalOpen)
                            }}
                        >
                            <ICONS.DotsIcon color={COLORS.gray} />
                        </TouchableOpacity>

                        {isPostModalOpen && (
                            <View style={styles.postModalMenu}>
                                <TouchableOpacity style={styles.postModalMenuBtn} onPress={handleEdit}>
                                    <ICONS.EditIcon color={COLORS.black} width={18} height={18} />
                                    <Text style={styles.postModalBtnTxt}>Редагувати</Text>
                                </TouchableOpacity>

                                <View style={styles.devider}></View>

                                <TouchableOpacity 
                                    style={styles.postModalMenuBtn}
                                    onPress={async () => {
                                        try {
                                            await deletePost(post.id).unwrap()
                                        } catch (error) {
                                            console.error("Delete error:", error)
                                        }
                                    }}
                                >
                                    <ICONS.DeleteIcon color={COLORS.black} />
                                    <Text style={[styles.postModalBtnTxt]}>Видалити публікацію</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </Pressable>
            </View>


            {/* <Modal
                isVisible={isMenuOpen}
                onBackdropPress={() => setIsMenuOpen(false)}
                backdropOpacity={0.3}
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                style={styles.bottomModal}
            >
                <View style={styles.menuContent}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                        <ICONS.EditIcon color={COLORS.black} width={20} height={20} />
                        <Text style={styles.menuText}>Редагувати</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.menuItem, { borderTopWidth: 1, borderColor: COLORS.gray }]} 
                        onPress={handleDelete}
                    >
                        <ICONS.DeleteIcon color="red" width={20} height={20} />
                        <Text style={[styles.menuText, { color: 'red' }]}>Видалити</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}

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