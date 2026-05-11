import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi";

export function Requests(){
    const { data } = useGetAllRequestsQuery()
    console.log(data)
    if (!data) { return null }
    return (
        <SafeAreaView>
            <FriendFrame frameName="Запити" data={data}/>
        </SafeAreaView>
    )
}