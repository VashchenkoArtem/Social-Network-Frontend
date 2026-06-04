import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useGetAllPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";

export function HomePage() {
    const { isNewUser } = useLocalSearchParams<{
        isNewUser?: string;
    }>();

    const [isWelcomeVisible, setIsWelcomeVisible] = useState(
        isNewUser === "true"
    );

    const [cursor, setCursor] = useState<number | undefined>();

    const [refreshing, setRefreshing] = useState(false);

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetAllPostsQuery({
        cursor,
        limit: 3,
    });

    const { user } = useContext(UserContext)!;

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const loadMore = () => {
        if (
            !isFetching &&
            data?.meta.hasMore &&
            data?.meta.nextCursor
        ) {
            setCursor(data.meta.nextCursor);
        }
    };

    if (!user) {
        return <Redirect href="/login" />;
    }

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{ marginTop: 24, marginBottom: 24 }}
                size={20}
            />
        );
    }

    return (
        <>
            <WelcomeDetailsModal
                isVisible={isWelcomeVisible}
                onClose={() => setIsWelcomeVisible(false)}
            />

            <FlatList
                data={data?.data ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PostCard
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