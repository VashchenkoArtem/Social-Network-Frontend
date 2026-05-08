import { View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { IProps } from "../friendCard/types";
import { SERVER } from '@shared/constants/server';
import { useGetAlbumsQuery } from '@modules/settings/api/albumApi';
import { FriendAlbum } from '../friendAlbum/FriendAlbum';

export function FriendProfile(props: IProps) {
    const router = useRouter();
    const { user } = props;    
    const { data } = useGetAlbumsQuery()
    if (!user) return null

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
                gap: 8
            }}
        >
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Image style={styles.authorAvatar} source={
                        user.avatars[user.avatars?.length - 1]
                        ? { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user.avatars[user.avatars.length - 1]?.filename}`, }
                        : require("../../../../assets/defaultAvatar.png")
                    }/>
                    <View style={styles.friendInfo}>
                        <Text style={styles.friendsFullName}>{ user.firstname } { user.lastname }</Text>
                        <Text style={styles.friendsNickName}>@{ user.nickname }</Text>
                    </View>
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

                <View style={styles.cardButtons}>
                    <Button variant="purple" text = "Підтвердити"  onPress={() => {
                        router.push({
                            pathname: `/(friends)/[${user.id}]`, 
                    })
                    }}/>
                    <Button variant="white" text = "Видалити" />
                </View>
            </View>
            { data?.map((album) => {
                return (
                    <FriendAlbum album={album} key = {album.id}></FriendAlbum>
                )
            })}
        </KeyboardAwareScrollView>
    )
}