import { ActivityIndicator, FlatList, RefreshControl, Text } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { postApi, useGetAllPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { View } from "react-native";
import { FONTS } from "@shared/constants/fonts";
import { COLORS } from "@shared/constants/colors";
import { socket } from "@shared/socket/socket";

export function HomePage() {
    const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetAllPostsQuery({
        cursor: undefined,
        limit: 3
    });
    const [ onlineUserIds, setOnlineUserIds ] = useState<number[]>([])
    const userIds = data?.data.map((user) => user.user_app_user.id)
    useEffect(() => {
        if (!data?.meta?.nextCursor || !data?.meta?.hasMore) return;

        prefetchPosts({
            cursor: data.meta.nextCursor,
            limit: 3,
        });
    }, [data?.meta?.nextCursor]);
    const { user, getOnlineUsers } = useContext(UserContext)!;
    const prefetchPosts = postApi.usePrefetch("getAllPosts");
    useEffect(() => {
        async function loadOnlineUsers() {
            if (!userIds?.length) return

            const online = await getOnlineUsers(userIds)

            setOnlineUserIds(online)
        }

        loadOnlineUsers()
    }, [userIds])
    
    useEffect(() => {
        if (!user) return;

        const hasNoUsername = !user.username || user.username.trim() === "";
        const hasNoPseudonym = !user.profile_app_profile?.pseudonym || user.profile_app_profile.pseudonym.trim() === "";
        
        if (isNewUser === "true" || hasNoUsername || hasNoPseudonym) {
            setIsWelcomeVisible(true);
        }
    }, [isNewUser, user?.username, user?.profile_app_profile?.pseudonym]);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

const loadMore = () => {
    if (!data?.meta?.hasMore || isFetching) return;

    prefetchPosts({
        cursor: data.meta.nextCursor,
        limit: 1,
    });
};

    if (!user) {
        return <Redirect href="/login" />;
    }

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{ marginTop: 24, marginBottom: 24 }}
                size="small"
            />
        );
    }

    return (
        <>
            <WelcomeDetailsModal
                isVisible={isWelcomeVisible}
                onClose={() => setIsWelcomeVisible(false)}
            />
            { data && 
                data.data.length === 0 && 
                <View style = {{ width: "100%", paddingVertical: 24}}>
                    <Text style = {{ textAlign: "center",fontFamily: FONTS.regular, fontSize: 20, color: COLORS.gray}}>Поки немає постів</Text>
                </View>
                }
            <FlatList
        
                data={data?.data ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PostCard
                        isOnlineUser={onlineUserIds.includes(item.user_app_user.id) }
                        post={item}
                        isEditingPost={false}
                    />
                )}
                contentContainerStyle={{
                    paddingBottom: 8,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetching ? (
                        <ActivityIndicator
                            style={{ marginVertical: 20 }}
                        />
                    ) : null
                }
            />
        </>
    );
}