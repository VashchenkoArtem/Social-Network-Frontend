import { View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { IProps } from "../friendCard/types";
import { SERVER } from '@shared/constants/server';

export function FriendProfile(props: IProps) {
    const router = useRouter();
    const { user } = props;    
    if (!user) return null

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
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
                        <Text>3</Text>
                        <Text>Дописи</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text>3</Text>
                        <Text>Читачі</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text>3</Text>
                        <Text>Друзі</Text>
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
        </KeyboardAwareScrollView>
    )
}