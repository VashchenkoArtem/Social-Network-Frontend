import { PostCard } from "../postCard/PostCard";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { postApi, useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext, useUserContext } from "@modules/auth/context/user-context";
import { ActivityIndicator, FlatList, RefreshControl, Text } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";

export function MyPostsPage() {
    const { user } = useContext(UserContext)!;

    const [refreshing, setRefreshing] = useState(false);

    if (!user) {
        return <Redirect href="/login" />;
    }

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useMyPostsQuery({
        userId: user.id,
        cursor: undefined,
        limit: 3,
    });
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])
    const userIds =
        data?.data
            ?.filter(item => item?.user_app_user)
            .map(item => item.user_app_user.id) ?? [];
    const { getOnlineUsers } = useUserContext()!;
    useEffect(() => {
        async function loadOnlineUsers() {
            if (!userIds?.length) return

            const online = await getOnlineUsers(userIds)

            setOnlineUserIds(online)
        }

        loadOnlineUsers()
    }, [userIds])
    const prefetchMyPosts = postApi.usePrefetch("myPosts");

    useEffect(() => {
        if (!data?.meta?.hasMore || !data?.meta?.nextCursor) {
            return;
        }

        prefetchMyPosts({
            userId: user.id,
            cursor: data.meta.nextCursor,
            limit: 3,
        });
    }, [data?.meta?.nextCursor]);

    const loadMore = () => {
        if (!data?.meta?.hasMore || isFetching) {
            return;
        }

        prefetchMyPosts({
            userId: user.id,
            cursor: data.meta.nextCursor,
            limit: 3,
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const posts = data?.data ?? [];

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{ marginTop: 24, marginBottom: 24 }}
                size="small"
            />
        );  
    }

    if (posts.length === 0) {
        return (
            <Text
                style={{
                    textAlign: "center",
                    marginTop: 24,
                    fontFamily: FONTS.regular,
                    fontSize: 20,
                    color: COLORS.gray,
                }}
            >
                У вас поки немає постів
            </Text>
        );
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <PostCard
                    isOnlineUser={onlineUserIds.includes(item.user_app_user.id)}
                    post={item}
                    isEditingPost={true}
                />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            ListFooterComponent={
                isFetching ? (
                    <ActivityIndicator
                        style={{ marginVertical: 20 }}
                    />
                ) : null
            }
        />
    );
}       