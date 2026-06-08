import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { FriendFrame } from "../friendFrame";
import { View } from "react-native";

export function AllFriends(props: {setChosenTab: (title: string) => void, isMarginBottom?: boolean, toDetailPage?: boolean}){
    const {setChosenTab, isMarginBottom, toDetailPage} = props
    const { data, isFetching, isLoading } = useGetAllFriendsQuery(undefined, {
        pollingInterval: 5000
    })
    return (
        <View style = { isMarginBottom && {marginBottom: 24}}>
            <FriendFrame isFetching={isFetching} isLoading={isLoading} toDetailPage={toDetailPage} setChosenTab={setChosenTab} buttonText="Повідомлення" frameName="Всі друзі" messageIfNull="У вас поки немає друзів" data={data}/>
        </View>
    )
}