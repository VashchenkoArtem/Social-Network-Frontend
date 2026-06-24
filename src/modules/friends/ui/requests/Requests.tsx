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

    const [cursor, setCursor] = useState<number | undefined>(undefined);
    const [refreshing, setRefreshing] = useState(false);

    const { 
        data, 
        isFetching, 
        refetch,
        isLoading 
    } = useGetAllRequestsQuery({
        cursor,
        limit: 2
    }, {
    })

    const hasMore = data?.meta.hasMore
    const loadMore = () => {
        if (!hasMore || isFetching) return
        setCursor(data?.meta?.nextCursor ?? undefined)
    }
    
    const users = data?.data ?? []
    const userIds = users.map((user) => user.user.id)

    const onRefresh = async () => {
        setRefreshing(true);
        setCursor(undefined)
        await refetch();
        setRefreshing(false);
    };

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
            <FriendFrame 
                data={users}
                isLoading={isLoading} 
                toDetailPage={toDetailPage} 
                setChosenTab = {setChosenTab} 
                buttonText="Підтвердити" 
                frameName="Запити" 
                messageIfNull="У вас поки немає запитів" 
                isFetching={isFetching}
                refreshing={refreshing}
                onEndReached={loadMore}
                onRefresh={onRefresh}
            />
        </View>
    )
}