import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { getAvatar } from "@shared/utils/avatar";
import { styles } from "./styles";

export function BigUserCard(props: IProps){
    const { avatar, username, pseudonym, isOnline } = props
    return (
        <View style = {{alignItems: "center"}}>
            <View style = {{ alignItems: "center", width: 96, height: 96}}>
                <Image
                    source={{ uri: avatar 
                        ? `http://${SERVER.host}:${SERVER.port}/media/thumb/${avatar}`
                        : getAvatar(avatar)
                    }}
                    style = {styles.authorAvatar}
                />
                <View style = {[styles.contactStatus, isOnline ? styles.online : styles.offline]}/>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendsFullName}>{ pseudonym }</Text>
                <Text style={styles.friendsNickName}>@{ username }</Text>
            </View>
        </View>
    ) 
}