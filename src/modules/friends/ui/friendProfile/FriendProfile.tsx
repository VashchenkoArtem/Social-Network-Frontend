import { View, Text, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { SERVER } from '@shared/constants/server';
import { useGetAlbumsQuery } from '@modules/settings/api/albumApi';
import { FriendAlbum } from '../friendAlbum/FriendAlbum';
import { ICONS } from '@shared/ui';
import { COLORS } from '@shared/constants/colors';
import { useCreateFriendRequestMutation, useDeleteFriendRequestMutation, useGetPostsByUserIdQuery, useGetUserByIdQuery, useUpdateFriendRequestMutation } from '../../api/friendsApi';
import { useState, useEffect } from 'react';
import { PostCard } from '@modules/posts/ui/postCard/PostCard';
import { BigUserCard } from '@shared/ui/bigUserCard/BigUserCard';
import { useUserContext } from '@modules/auth/context/user-context';


interface IProps {
    userId: number;
    requestId?: number;
}

export function FriendProfile({ userId, requestId }: IProps) {
    const router = useRouter();
    
    const { getOnlineUsers } = useUserContext(); 
    
    const [isOnline, setIsOnline] = useState<boolean>(false);

    const { data: user } = useGetUserByIdQuery(userId);
    const { data } = useGetAlbumsQuery(userId)
    const [ createFriendRequest ] = useCreateFriendRequestMutation()
    const [ updateFriendRequest ] = useUpdateFriendRequestMutation()
    const [isAccepted, setIsAccepted ] = useState<boolean>(false)
    const { data: posts } = useGetPostsByUserIdQuery(userId)

    useEffect(() => {
        if (!userId) return;

        async function checkOnline() {
            try {
                const onlineIds = await getOnlineUsers([userId]);
                setIsOnline(onlineIds.includes(userId));
            } catch (e) {
                console.log("Ошибка проверки статуса сокета", e);
            }
        }
        checkOnline();

        const interval = setInterval(checkOnline, 10000);

        return () => clearInterval(interval);
    }, [userId]);

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
                <View style = {{width: "100%", paddingHorizontal: 16}}>
                    <TouchableOpacity onPress={() => {
                        router.replace("/(friends)")
                        }}>
                        <Text style={styles.close} ><ICONS.LeftArrowIcon color = {COLORS.gray}/></Text>
                    </TouchableOpacity>
                </View>
                
                <BigUserCard username={user.username} avatar = {user.profile_app_profile.avatar} pseudonym={user.profile_app_profile.pseudonym}/>

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
                <View style={styles.cardButtons}>
                    <Button variant="purple" text = "Підтвердити"  onPress={async () => {
                        if (requestId){
                            await updateFriendRequest({
                                requestId: requestId,
                                status: "accepted"
                            })
                        }else{
                            await createFriendRequest({
                                receiverId: userId
                            })
                        }
                        router.push("/(tabs)/friends")
                    }}/>
                    <Button variant="white" text = "Видалити" onPress={async () => {
                        if (requestId){
                            await updateFriendRequest({
                                requestId: requestId,
                                status: "canceled"
                            })
                            router.push("/(friends)")
                        }else{
                            await createFriendRequest({
                                receiverId: userId,
                                status: "canceled"
                            })
                            router.push("/(friends)")
                        }
                    }}/>
                </View>
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
                            album={data[data.length - 1]}
                            key={data[data.length - 1].id}
                        />
                    </View>
                ))
            }
            <View style = {{paddingBottom: 20}}>
                { posts?.map((post) => {
                    return(
                        <PostCard 
                            post = {post} 
                            key={post.id} 
                            isEditingPost={false}
                            isOnlineUser={isOnline}поста
                        />
                    )
                }) }
            </View>
        </KeyboardAwareScrollView>
    )
}