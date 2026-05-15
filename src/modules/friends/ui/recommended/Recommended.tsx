import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";

export function Recommended(){
    const { data } = useGetRecommendedPeopleQuery(undefined, {
        pollingInterval: 5000   
    })
    if (!data) return null
    return (
        <FriendFrame buttonText="Додати" frameName="Рекомендації" data = {data}/>
    )
}