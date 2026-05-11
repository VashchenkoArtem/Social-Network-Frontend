import { View, Text } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";


export function FriendFrame(props: {frameName: string, data: FriendRequest[]}){
    const { user } = useContext(UserContext)!
    const { frameName, data } = props
    if (!user) return null
    return (
        <View style={styles.friendCards}>
            <View style={styles.cardHeader}>
                <Text style= {styles.cardTitle}>{frameName}</Text>
                <Text style = {styles.cardLink}>Дивитись всі</Text>
            </View>
            <View>
                { data?.map((friendRequest) => {
                    return <FriendCard user={friendRequest.from_profile} key={friendRequest.id} />
                }) }
            </View>
        </View>
    )
}