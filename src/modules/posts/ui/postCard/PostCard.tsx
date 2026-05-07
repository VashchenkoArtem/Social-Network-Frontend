import { getPhotoStyle, styles } from "./styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Link, Redirect } from "expo-router";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import Modal from "react-native-modal"
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useDeletePostMutation } from "@modules/posts/api/postsApi";
import { CreatePostForm } from "@modules/posts/ui/create-post-form";


export function PostCard(props: IProps){
    const { post } = props

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deletePost] = useDeletePostMutation();

    const photos = post.photos ?? [];

    const handleDelete = () => {
        setIsMenuOpen(false);
        Alert.alert(
            "Видалення",
            "Ви впевнені, що хочете видалити цей пост?",
            [
                { text: "Скасувати", style: "cancel" },
                { 
                    text: "Видалити", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await deletePost(post.id).unwrap();
                        } catch (e) {
                            console.error("Помилка при видаленні:", e);
                        }
                    } 
                }
            ]
        );
    };

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
                <View>
                    <TouchableOpacity 
                        style={styles.dotIconContainer} 
                        onPress={() => setIsMenuOpen(true)}
                    >
                        <ICONS.DotsIcon color={COLORS.gray} />
                    </TouchableOpacity>

                    <Modal
                        isVisible={isMenuOpen}
                        onBackdropPress={() => setIsMenuOpen(false)}
                        backdropOpacity={0.2}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        style={{ margin: 0 }} 
                        useNativeDriver
                    >
                        <View style={styles.popoverMenu}>
                            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                                <ICONS.EditIcon color={COLORS.black} width={18} height={18} />
                                <Text style={styles.menuText}>Редагувати</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.menuItem, { borderTopWidth: 1, borderColor: COLORS.lightGray }]} 
                                onPress={handleDelete}
                            >
                                <ICONS.DeleteIcon color="red" width={18} height={18} />
                                <Text style={[styles.menuText, { color: 'red' }]}>Видалити</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
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
                    source={{ uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photos[0].filename}` }}
                    style={{ width: "100%", height: 250, borderRadius: 10 }}
                />
            )}

            {photos?.length > 1 && (
                <View style={styles.photosContainer}>
                    {photos.map((photo) => (
                        <Image
                            key={photo.id}
                            source={{
                                uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${photo.filename}`,
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