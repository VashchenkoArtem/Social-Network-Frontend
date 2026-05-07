import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";

export function FriendCard(props: IProps) {
    const router = useRouter();
    const { user } = props;
    if (!user) return null
    return (
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
            <View style={styles.cardButtons}>
                <Button variant="purple" text = "Підтвердити"  onPress={() => {
                    router.push({
                        pathname: `/${user.id}`, 
                  })
                }}/>
                <Button variant="white" text = "Видалити" />
            </View>
       </View>
    )
}