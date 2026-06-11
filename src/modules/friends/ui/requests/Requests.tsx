import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetAllRequestsQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user-context";

export function Requests(props: {setChosenTab: (title: string) => void, isMarginTop?: boolean, isMarginBottom?: boolean, toDetailPage?: boolean} ){
    const { setChosenTab, isMarginTop, isMarginBottom, toDetailPage } = props
    const { getOnlineUsers } = useUserContext()!
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([]) 
    const { data, isFetching, isLoading } = useGetAllRequestsQuery(undefined, {
        pollingInterval: 5000
    })
    const userIds = data?.map((user) => user.user.id)
    useEffect(() => {
        async function loadOnlineUsers() {
            if (!userIds?.length) return

            const online = await getOnlineUsers(userIds)

            setOnlineUserIds(online)
        }

        loadOnlineUsers()
    }, [userIds])
    return (
        <View style = {[isMarginTop && {marginTop: 24}, isMarginBottom && {marginBottom: 24}]}>
            <FriendFrame isLoading={isLoading} toDetailPage={toDetailPage} setChosenTab = {setChosenTab} buttonText="Підтвердити" frameName="Запити" messageIfNull="У вас поки немає запитів" data={data}/>
        </View>
    )
}