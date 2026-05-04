import { View, Text } from "react-native"
import { FriendCard } from "../friendCard"
import { useContext } from "react"
import { UserContext } from "@modules/auth/context/user-context"
import { styles } from "./styles"

export function Friends(){
    const { user } = useContext(UserContext)!
    // const { user } = (undefined, {
    //     pollingInterval: 3000
    // })
    if (!user) return null
    return (
        <View style = {{marginTop: 24, gap: 8}}>
            {/* { data.map((user) => {
                return(
                    <FriendCard user={user}></FriendCard>
                )
            }) } */}
            
            <View style={styles.friendCards}>
                <View style={styles.cardHeader}>
                    <Text style= {styles.cardTitle}>Запити</Text>
                    <Text style = {styles.cardLink}>Дивитись всі</Text>
                </View>
                <View>
                    <FriendCard user={user}/>
                </View>
            </View>
            <View style={styles.friendCards}>
                <View style={styles.cardHeader}>
                    <Text style = {styles.cardTitle}>Рекомендації</Text>
                    <Text style = {styles.cardLink}>Дивитись всі</Text>
                </View>
            </View>
            <View style={styles.friendCards}>
                <View style={styles.cardHeader}>
                    <Text style = {styles.cardTitle}>Всі друзі</Text>
                    <Text style = {styles.cardLink}>Дивитись всі</Text>
                </View>
            </View>

        </View>
    )
}

