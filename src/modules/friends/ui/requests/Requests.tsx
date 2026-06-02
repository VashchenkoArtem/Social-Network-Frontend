import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";

export function Requests(props: {setChosenTab: (title: string) => void, isMarginTop?: boolean, isMarginBottom?: boolean} ){
    const { setChosenTab, isMarginTop, isMarginBottom } = props
    const { data } = useGetAllRequestsQuery(undefined, {
        pollingInterval: 5000
    })
    console.log(data)
    if (!data) { return null }
    return (
        <View style = {[isMarginTop && {marginTop: 24}, isMarginBottom && {marginBottom: 24}]}>
            <FriendFrame setChosenTab = {setChosenTab} buttonText="Підтвердити" frameName="Запити" messageIfNull="У вас поки немає запитів" data={data}/>
        </View>
    )
}