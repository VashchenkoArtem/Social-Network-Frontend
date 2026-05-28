import { View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { SERVER } from '@shared/constants/server';
import { useGetAlbumsQuery } from '@modules/settings/api/albumApi';
import { FriendAlbum } from '../friendAlbum/FriendAlbum';
import { ICONS } from '@shared/ui';
import { COLORS } from '@shared/constants/colors';
import { useDeleteFriendRequestMutation, useGetPostsByUserIdQuery, useGetUserByIdQuery, useUpdateFriendRequestMutation } from '../../api/friendsApi';
import { useState } from 'react';
import { PostCard } from '@modules/posts/ui/postCard/PostCard';

interface IProps {
    userId: number;
    requestId: number
}

export function FriendProfile({ userId, requestId }: IProps) {
    console.log(userId, requestId)
    const router = useRouter();
    const { data: user } = useGetUserByIdQuery(userId);
    const { data } = useGetAlbumsQuery(userId)
    const [ updateFriendRequest ] = useUpdateFriendRequestMutation()
    const [isAccepted, setIsAccepted ] = useState<boolean>(false)
    const { data: posts } = useGetPostsByUserIdQuery(userId)
    const [deleteFriendRequest] = useDeleteFriendRequestMutation()
    if (!user) return null


    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
                gap: 8,
                marginTop: 8
            }}
        >
            <View style={styles.card}>
                <Image style={styles.authorAvatar} source={
                    user.profile_app_profile.avatar
                    ? { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user.profile_app_profile.avatar}` }
                    : require("../../../../assets/defaultAvatar.png")
                }/>
                <View style={styles.friendInfo}>
                    <Text style={styles.friendsFullName}>{ user.first_name } { user.last_name }</Text>
                    <Text style={styles.friendsNickName}>@{ user.username }</Text>
                </View>

                <View style={styles.friendFollowersInfo}>
                    <View style={styles.infoRow}>
                        <Text style = {styles.infoCount}>3</Text>
                        <Text style = {styles.infoLabel}>Дописи</Text>
                    </View>
                    <View style={[styles.infoRow, styles.infoBorder]}>
                        <Text style = {styles.infoCount}>3</Text>
                        <Text style = {styles.infoLabel}>Читачі</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style = {styles.infoCount}>3</Text>
                        <Text style = {styles.infoLabel}>Друзі</Text>
                    </View>
                </View>
                { !isAccepted && 
                    <View style={styles.cardButtons}>
                        <Button variant="purple" text = "Підтвердити"  onPress={async () => {
                            router.push("/(tabs)/friends")
                            await updateFriendRequest({
                                requestId: requestId,
                                status: "Accepted"
                            })
                        }}/>
                        <Button variant="white" text = "Видалити" onPress={async () => {
                            await deleteFriendRequest(requestId)
                        }}/>
                    </View>
                }
            </View>
            { data && 
                (data?.length > 0 && (
                    <View style={styles.card}>
                        <View style={styles.headerCard}>
                            <View
                                style={{
                                    gap: 8,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <ICONS.MyPostsPageIcon color={COLORS.gray} />

                                <Text style={[styles.textGray, styles.title]}>
                                    Альбоми
                                </Text>
                            </View>

                            <Text style={[styles.cardLink]}>
                                Дивитись всі
                            </Text>
                        </View>

                        <FriendAlbum
                            album={data[0]}
                            key={data[0].id}
                        />
                    </View>
                ))
            }
            { posts?.map((post) => {
                console.log(post)
                return(
                    <PostCard post = {post} key={post.id} isEditingPost={false}/>
                )
            }) }
        </KeyboardAwareScrollView>
    )
}