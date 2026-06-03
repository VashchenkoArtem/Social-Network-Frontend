import { PostCard } from "../postCard/PostCard";
import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ActivityIndicator, RefreshControl, Text } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { FONTS } from "@shared/constants/fonts";

export function MyPostsPage(){
    const {
        data,
        isFetching,
        refetch,
    } = useMyPostsQuery();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    const { user } = useContext(UserContext)!;
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }
    if (!data) return null
    if (data.length === 0) return <Text style = {{textAlign: "center", marginTop: 24, fontFamily: FONTS.regular, fontSize: 20, color: COLORS.gray}}>У вас поки що немає постів</Text>
    if (isFetching)return <ActivityIndicator style={{marginTop: 24}} size = {20} />
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 8
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {data.map((post) => (
                <PostCard
                    post={post}
                    key={post.id}
                    isEditingPost={true}
                />
            ))}
        </KeyboardAwareScrollView>
    )
}
