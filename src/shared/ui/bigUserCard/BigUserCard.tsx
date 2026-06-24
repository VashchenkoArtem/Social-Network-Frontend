import { View, Image, Text } from "react-native";
import { IProps } from "./types";  
import { CLOUDINARY_URL } from "@shared/constants/server";
import { getAvatar } from "@shared/utils/avatar";
import { styles } from "./styles";

export function BigUserCard(props: IProps){
    const { avatar, username, pseudonym, isOnline, usernameNotIncluded } = props
    return (
        <View style = {{alignItems: "center"}}>
            <View style = {{ alignItems: "center", width: 96, height: 96}}>
                <Image
                    source={{ uri:avatar ? `${CLOUDINARY_URL}${avatar}` : getAvatar(avatar)
                    }}
                    style = {styles.authorAvatar}
                />
                <View style = {[styles.contactStatus, isOnline ? styles.online : styles.offline]}/>
            </View>
            { !usernameNotIncluded && 
                <View style={styles.friendInfo}>
                    <Text style={styles.friendsFullName}>{ pseudonym }</Text>
                        {username?.startsWith("@") 
                            ? <Text style={styles.friendsNickName}>{ username }</Text>
                            : <Text style={styles.friendsNickName}>@{ username }</Text>
                        }
                </View>
            }
        </View>
    ) 
}