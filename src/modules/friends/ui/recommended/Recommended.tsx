import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";

export function Recommended(props: {setChosenTab: (title: string) => void}){
    const {setChosenTab} = props
    const { data } = useGetRecommendedPeopleQuery(undefined, {
        pollingInterval: 5000   
    })
    if (!data) return null
    return (
        <FriendFrame setChosenTab={setChosenTab} buttonText="Додати" frameName="Рекомендації" messageIfNull="У вас поки немає рекомендацій" data = {data}/>
    )
}