import { View, Text } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";


export function FriendFrame(props: {frameName: string}){
    const { user } = useContext(UserContext)!
    const { frameName } = props
    if (!user) return null
    return (
        <View style={styles.friendCards}>
            <View style={styles.cardHeader}>
                <Text style= {styles.cardTitle}>{frameName}</Text>
                <Text style = {styles.cardLink}>Дивитись всі</Text>
            </View>
            <View>
                <FriendCard user={user}/>
            </View>
        </View>
    )
}