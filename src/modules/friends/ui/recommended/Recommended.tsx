import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";
import { use, useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user-context";

export function Recommended(props: {setChosenTab: (title: string) => void, isMarginBottom?: boolean, toDetailPage?: boolean}){
    const {setChosenTab, isMarginBottom, toDetailPage} = props
    const { getOnlineUsers } = useUserContext()!
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])

    const [cursor, setCursor] = useState<number | undefined>(undefined);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data,
        isFetching,
        isLoading,
        refetch
    } = useGetRecommendedPeopleQuery({
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
    const userFromRequest = users.map(user => ({ user }))
    const userIds = users.map((user) => user.id)

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
        <View style = {isMarginBottom && {marginBottom: 48, flex: 1}}>
            <FriendFrame 
                onlineUserIds={onlineUserIds} 
                isLoading={isLoading} 
                toDetailPage={toDetailPage} 
                setChosenTab={setChosenTab} 
                buttonText="Додати" 
                frameName="Рекомендації" 
                messageIfNull="У вас поки немає рекомендацій" 
                data = {userFromRequest}
                isFetching={isFetching}
                refreshing={refreshing}
                onEndReached={loadMore}
                onRefresh={onRefresh}
            />
        </View>
    );
}