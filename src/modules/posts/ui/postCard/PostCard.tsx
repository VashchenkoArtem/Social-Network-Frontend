import { View, Image, Text, TouchableOpacity } from "react-native";
import { getPhotoStyle, styles } from "./styles";
import { useEffect, useState } from "react";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui";
import { Link } from "expo-router";
import { IProps } from "./types";
import { CLOUDINARY_URL, SERVER } from "@shared/constants/server";
import Modal from "react-native-modal";

import { CreatePostForm } from "@modules/posts/ui/create-post-form";
import { 
    useCreateHeartMutation, 
    useCreateLikeMutation, 
    useDeleteHeartMutation, 
    useDeleteLikeMutation, 
    useDeletePostMutation, 
    useGetAllHeartsQuery, 
    useGetAllLikesQuery, 
    useGetPostHeartStatusQuery, 
    useGetPostLikeStatusQuery, 
    useViewPostMutation 
} from "@modules/posts/api/postsApi";
import { SmallUserCard } from "@shared/ui/smallUserCard/SmallUserCard";
export function PostCard(props: IProps){
    const { post, isOnlineUser } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const [viewPost] = useViewPostMutation();
    const photos = post.post_app_postimage ?? [];
    const [isPostModalOpen, setisPostModalOpen] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isPostHearted, setIsPostHearted] = useState(false);
    const [localLikesCount, setLocalLikesCount] = useState(0);
    const [localHeartsCount, setLocalHeartsCount] = useState(0);

    const { data: likesCount } = useGetAllLikesQuery({ postId: post.id });
    const { data: heartsCount } = useGetAllHeartsQuery({ postId: post.id });
    const { data: likeStatus } = useGetPostLikeStatusQuery({ postId: post.id });
    const { data: heartStatus } = useGetPostHeartStatusQuery({ postId: post.id });

    const [createLike] = useCreateLikeMutation();
    const [deleteLike] = useDeleteLikeMutation();
    const [createHeart] = useCreateHeartMutation();
    const [deleteHeart] = useDeleteHeartMutation();

    useEffect(() => {
        if (post?.id) {
            viewPost(post.id)
                .unwrap()
                .catch((error) => console.error("Помилка реєстрації перегляду:", error));
        }
    }, [post?.id]);

    useEffect(() => {
        if (likeStatus?.isLiked !== undefined) {
            setIsPostLiked(likeStatus.isLiked);
        }
    }, [likeStatus]);

    useEffect(() => {
        if (likesCount !== undefined) {
            setLocalLikesCount(likesCount);
        }
    }, [likesCount]);

    useEffect(() => {
        if (heartStatus?.isHearted !== undefined) {
            setIsPostHearted(heartStatus.isHearted);
        }
    }, [heartStatus]);

    useEffect(() => {
        if (heartsCount !== undefined) {
            setLocalHeartsCount(heartsCount);
        }
    }, [heartsCount]);

    const handleEdit = () => {
        setIsMenuOpen(false);
        setTimeout(() => {
            setIsEditModalOpen(true);
        }, 500);
    };

    const handleLike = async () => {
        const previousLiked = isPostLiked;
        const previousCount = localLikesCount;

        setIsPostLiked(!previousLiked);
        setLocalLikesCount(prev => previousLiked ? prev - 1 : prev + 1);

        try {
            if (previousLiked) {
                await deleteLike({ postId: post.id }).unwrap();
            } else {
                await createLike({ postId: post.id }).unwrap();
            }
        } catch (error) {
            console.error("Помилка при зміні лайку:", error);
            setIsPostLiked(previousLiked);
            setLocalLikesCount(previousCount);
        }
    };

    const handleHeart = async () => {
        const previousHearted = isPostHearted;
        const previousCount = localHeartsCount;

        setIsPostHearted(!previousHearted);
        setLocalHeartsCount(prev => previousHearted ? prev - 1 : prev + 1);

        try {
            if (previousHearted) {
                await deleteHeart({ postId: post.id }).unwrap();
            } else {
                await createHeart({ postId: post.id }).unwrap();
            }
        } catch (error) {
            console.error("Помилка при зміні сердечка:", error);
            setIsPostHearted(previousHearted);
            setLocalHeartsCount(previousCount);
        }
    };

    const authorProfile = post.user_app_user.profile_app_profile;
    if (!authorProfile) return null;

    return (
        <View style={styles.postContainer}>
            <SmallUserCard isOnline={isOnlineUser} pseudonym={authorProfile.pseudonym} avatar={authorProfile.avatar} signature={authorProfile.signature} isPadding={true}/>
            
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
                <Text style={styles.postTitle}>{ post.title } </Text>
                
                <View>
                    <Text style={styles.postDescription}>{ post.content }</Text>
                    <View style = {{flexDirection: "row", gap: 5, flexWrap: "wrap"}}>
                        { post.post_app_post_tags?.map((tag) => (
                            <Text style={styles.tag} key={tag.post_app_tag.id}>#{tag.post_app_tag.name}</Text>
                        ))}
                    </View>
                </View>
                
                <View>
                    { post.post_app_postlink?.map((url) => (
                        <Link href={url.url} key={url.id} style={[styles.tag, {textDecorationLine: "underline"}]}>{url.url}</Link>
                    ))}
                </View>

                {photos?.length === 1 && (
                    <Image
                        source={{  uri: `${CLOUDINARY_URL}${photos[0].original_image}` }}
                        style={{ width: "100%", height: 250, borderRadius: 10 }}
                    />
                )}

                {photos?.length > 1 && (
                    <View style={styles.photosContainer}>
                        {photos.map((photo) => {
                            return (
                                <Image
                                    key={photo.id}
                                    source={{  uri: `${CLOUDINARY_URL}${photo.original_image}` }}
                                    style={getPhotoStyle(photos.length)}
                                />
                            )
                        })}
                    </View>
                )}

                <View style={styles.postFooter}>
                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn} onPress={handleLike}>
                            { isPostLiked ? (
                                <ICONS.PostLikeFilledIcon width={20} height={20} color={COLORS.plum} />
                            ) : (
                                <ICONS.PostLikeIcon width={20} height={20} color={COLORS.gray} />
                            ) }
                            <Text>{localLikesCount} Вподобань</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn} onPress={handleHeart}>
                            { isPostHearted ? (
                                <ICONS.PostThumbUpFilledIcon width={20} height={20} color={COLORS.plum} />
                            ) : (
                                <ICONS.PostThumbUpIcon width={20} height={20} color={COLORS.gray} />
                            ) }
                            <Text>{localHeartsCount} Вподобань</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postFooterContainer}>
                        <TouchableOpacity style={styles.postFooterBtn}>
                            <ICONS.PostViewsIcon width={20} height={20} color={COLORS.gray}/>
                            <Text>{post._count?.post_app_postview ?? 0} Переглядів</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}