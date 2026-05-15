import { View, Text, ScrollView } from "react-native"
import { FriendCard } from "../friendCard"
import { useContext } from "react"
import { UserContext } from "@modules/auth/context/user-context"
import { FriendFrame } from "../friendFrame"
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi"
import { date } from "yup"
import { Requests } from "../requests/Requests"
import { Recommended } from "../recommended/Recommended"
import { AllFriends } from "../allFriends/AllFriends"

export function Friends(){
    const { user } = useContext(UserContext)!
    const { data: requests } = useGetAllRequestsQuery()
    if (!user) return null
    return (
        <ScrollView style = {{marginTop: 24, marginBottom: 48}} contentContainerStyle={{gap: 8}}>
            <Requests/>
            <Recommended/>
            <AllFriends/>
        </ScrollView>
    )
}

