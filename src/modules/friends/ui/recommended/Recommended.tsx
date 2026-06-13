import { FriendFrame } from "../friendFrame";
import { useGetRecommendedPeopleQuery } from "@modules/friends/api/friendsApi";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user-context";

export function Recommended(props: {
    setChosenTab: (title: string) => void;
    isMarginBottom?: boolean;
    toDetailPage?: boolean;
    isPaginate?: boolean
}) {
    const { setChosenTab, isMarginBottom, toDetailPage, isPaginate } = props;

    const { getOnlineUsers } = useUserContext()!;

    const [onlineUserIds, setOnlineUserIds] = useState<number[]>([]);
    const [cursor, setCursor] = useState<number | undefined>(undefined);

    const { data, isLoading, isFetching } =
        useGetRecommendedPeopleQuery({
            cursor,
            limit: 2,
        });

    const users = data?.data ?? [];

    const userFromRequest = users.map((user) => ({
        user,
    }));

    const userIds = users.map((user) => user.id);

    useEffect(() => {
        async function loadOnlineUsers() {
            if (!userIds.length) return;

            const online = await getOnlineUsers(userIds);

            setOnlineUserIds(online);
        }

        loadOnlineUsers();
    }, [userIds]);

    const loadMore = () => {
        if (!data?.meta?.hasMore || isFetching) return;
        setCursor(data.meta.nextCursor);
    };
    return (
        <View>
            <FriendFrame
                onlineUserIds={onlineUserIds}
                isLoading={isLoading}
                toDetailPage={toDetailPage}
                setChosenTab={setChosenTab}
                buttonText="Додати"
                frameName="Рекомендації"
                messageIfNull="У вас поки немає рекомендацій"
                data={userFromRequest}
                onEndReached={loadMore}
                isPaginate={isPaginate}
            />
        </View>
    );
}