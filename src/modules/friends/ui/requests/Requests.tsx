import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi";

export function Requests(){
    const { data } = useGetAllRequestsQuery(undefined, {
        pollingInterval: 5000
    })
    if (!data) { return null }
    return (
        <FriendFrame buttonText="Підтвердити" frameName="Запити" data={data}/>
    )
}