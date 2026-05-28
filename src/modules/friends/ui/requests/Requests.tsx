import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi";

export function Requests(props: {setChosenTab: (title: string) => void}){
    const { setChosenTab } = props
    const { data } = useGetAllRequestsQuery(undefined, {
        pollingInterval: 5000
    })
    console.log(data)
    if (!data) { return null }
    return (
        <FriendFrame type = "requests" setChosenTab = {setChosenTab} buttonText="Підтвердити" frameName="Запити" messageIfNull="У вас поки немає запитів" data={data}/>
    )
}