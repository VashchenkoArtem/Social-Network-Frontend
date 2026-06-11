import { PostCard } from "../postCard/PostCard";
import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ActivityIndicator, FlatList, RefreshControl, Text } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";

export function MyPostsPage(){
    const { user } = useContext(UserContext)!;

    const [cursor, setCursor] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useMyPostsQuery({
        userId: user.id,
        cursor: undefined,
        limit: 3
    });

    const posts = data?.data ?? []
    const hasMore = data?.meta.hasMore

    const loadMore = () => {
        if (!hasMore || isFetching) {
            return
        }

        setCursor(data?.meta.nextCursor)
    }

    const onRefresh = async () => {
        setRefreshing(true);
        setCursor(null)
        await refetch();
        setRefreshing(false);
    };

    if (isLoading) {
        return <ActivityIndicator animating={true} color={COLORS.foggy} style={{ marginTop: 20 }}/>
    }

    if (posts.length === 0) {
        return (
            <Text 
                style = {{
                    textAlign: "center", 
                    marginTop: 24, 
                    fontFamily: FONTS.regular, 
                    fontSize: 20, 
                    color: COLORS.gray
                }}>
                    У вас поки немає постів
                </Text>
        )
    }
    
    // if (!data) return null
    // if (data.length === 0) return <Text style = {{textAlign: "center", marginTop: 24, fontFamily: FONTS.regular, fontSize: 20, color: COLORS.gray}}>У вас поки немає постів</Text>
    // if (isFetching)return <ActivityIndicator style={{marginTop: 24}} size = {20} />
    return (
        // <KeyboardAwareScrollView
        //     keyboardShouldPersistTaps="handled"
        //     contentContainerStyle={{
        //         flexGrow: 1,
        //         paddingBottom: 8
        //     }}
        //     refreshControl={
        //         <RefreshControl
        //             refreshing={refreshing}
        //             onRefresh={onRefresh}
        //         />
        //     }
        // >
        //     {data.map((post) => (
        //         <PostCard
        //             post={post}
        //             key={post.id}
        //             isEditingPost={true}
        //         />
        //     ))}
        // </KeyboardAwareScrollView>

        <FlatList 
            data={posts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <PostCard
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
    )
}
