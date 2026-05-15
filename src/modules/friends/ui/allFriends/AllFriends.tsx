import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { FriendFrame } from "../friendFrame";

export function AllFriends(){
    const { data } = useGetAllFriendsQuery(undefined, {
        pollingInterval: 5000
    })
    console.log(data)
    if (!data) return null
    return (
        <FriendFrame buttonText="Повідомлення" frameName="Всі друзі" data={data}/>
    )
}