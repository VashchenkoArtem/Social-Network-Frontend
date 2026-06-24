import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { FriendFrame } from "../friendFrame";
import { View } from "react-native";
import { socket } from "@shared/socket/socket";
import { useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user-context";

export function AllFriends(props: {setChosenTab: (title: string) => void, isMarginBottom?: boolean, toDetailPage?: boolean}){
    const {setChosenTab, isMarginBottom, toDetailPage} = props
    const { data, isFetching, isLoading } = useGetAllFriendsQuery(undefined, {
    })
    const { getOnlineUsers } = useUserContext()!
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])
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
        <View style = { isMarginBottom && {marginBottom: 24}}>
            <FriendFrame onlineUserIds={onlineUserIds} isLoading={isLoading} toDetailPage={toDetailPage} setChosenTab={setChosenTab} buttonText="Повідомлення" frameName="Всі друзі" messageIfNull="У вас поки немає друзів" data={data}/>
        </View>
    )
}