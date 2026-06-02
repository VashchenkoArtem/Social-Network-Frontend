import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";

export function Recommended(props: {setChosenTab: (title: string) => void, isMarginBottom?: boolean}){
    const {setChosenTab, isMarginBottom} = props
    const { data } = useGetRecommendedPeopleQuery(undefined, {
        pollingInterval: 5000   
    })
    const userFromRequest = data?.map((user) => {
            return {
                user: user
            }
        })
    return (
        <View style = {isMarginBottom && {marginBottom: 48}}>
            <FriendFrame setChosenTab={setChosenTab} buttonText="Додати" frameName="Рекомендації" messageIfNull="У вас поки немає рекомендацій" data = {userFromRequest}/>
        </View>
    )
}