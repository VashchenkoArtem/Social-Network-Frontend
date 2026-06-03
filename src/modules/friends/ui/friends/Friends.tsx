import { View, Text, ScrollView, FlatList } from "react-native"
import { FriendCard } from "../friendCard"
import { useContext } from "react"
import { UserContext } from "@modules/auth/context/user-context"
import { FriendFrame } from "../friendFrame"
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi"
import { date } from "yup"
import { Requests } from "../requests/Requests"
import { Recommended } from "../recommended/Recommended"
import { AllFriends } from "../allFriends/AllFriends"

export function Friends(props: {setChosenTab: (title: string) => void}){
    const { setChosenTab } = props
    const componentsData = [
        <Requests toDetailPage={true} setChosenTab={setChosenTab}/>,
        <Recommended toDetailPage={true} setChosenTab={setChosenTab}/>,
        <AllFriends toDetailPage={true} setChosenTab={setChosenTab}/>
    ]
    return (
            <FlatList   
                contentContainerStyle={{gap: 8, paddingBottom: 8, paddingTop: 24}}
                data = {componentsData}
                keyExtractor = {(item) => {
                    return item.type.name
                }}
                renderItem = {({item}) => {
                    return item
                }}
            />
        // <ScrollView style = {{marginTop: 24}} contentContainerStyle={{gap: 8}}>
        //     <Requests setChosenTab={setChosenTab}/>
        //     <Recommended setChosenTab={setChosenTab}/>
        //     <AllFriends setChosenTab={setChosenTab}/>
        // </ScrollView>
    )
}

