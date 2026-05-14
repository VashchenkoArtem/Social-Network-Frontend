import { View, Text, ScrollView } from "react-native"
import { FriendCard } from "../friendCard"
import { useContext } from "react"
import { UserContext } from "@modules/auth/context/user-context"
import { FriendFrame } from "../friendFrame"

export function Friends(){
    const { user } = useContext(UserContext)!
    // const { user } = (undefined, {
    //     pollingInterval: 3000
    // })
    if (!user) return null
    return (
        <ScrollView style = {{marginTop: 24, marginBottom: 48}} contentContainerStyle={{gap: 8}}>
            {/* { data.map((user) => {
                return(
                    <FriendCard user={user}></FriendCard>
                )
            }) } */}
            
            {/* <FriendFrame frameName="Запити" />
            <FriendFrame frameName="Рекомандції" />
            <FriendFrame frameName="Всі друзі" /> */}
        </ScrollView>
    )
}

