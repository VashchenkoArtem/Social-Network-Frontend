import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { FriendFrame } from "../friendFrame";

export function AllFriends(props: {setChosenTab: (title: string) => void}){
    const {setChosenTab} = props
    const { data } = useGetAllFriendsQuery(undefined, {
        pollingInterval: 5000
    })
    if (!data) return null
    return (
        <FriendFrame setChosenTab={setChosenTab} buttonText="Повідомлення" frameName="Всі друзі" messageIfNull="У вас поки немає друзів" data={data}/>
    )
}