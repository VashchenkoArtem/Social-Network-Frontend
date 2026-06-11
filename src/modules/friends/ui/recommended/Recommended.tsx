import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user-context";

export function Recommended(props: {setChosenTab: (title: string) => void, isMarginBottom?: boolean, toDetailPage?: boolean}){
    const {setChosenTab, isMarginBottom, toDetailPage} = props
    const { getOnlineUsers } = useUserContext()!
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])
    const { data, isFetching, isLoading } = useGetRecommendedPeopleQuery(undefined, {
        pollingInterval: 5000
    })
    const userFromRequest = data?.map((user) => {
            return {
                user: user
            }
        })
    const userIds = data?.map((user) => user.id)
    useEffect(() => {
        async function loadOnlineUsers() {
            if (!userIds?.length) return

            const online = await getOnlineUsers(userIds)

            setOnlineUserIds(online)
        }

        loadOnlineUsers()
    }, [userIds])
    return (
        <View style = {isMarginBottom && {marginBottom: 48, flex: 1}}>
            <FriendFrame onlineUserIds={onlineUserIds} isLoading={isLoading} toDetailPage={toDetailPage} setChosenTab={setChosenTab} buttonText="Додати" frameName="Рекомендації" messageIfNull="У вас поки немає рекомендацій" data = {userFromRequest}/>
        </View>
    )
}