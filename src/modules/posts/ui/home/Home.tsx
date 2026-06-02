import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { useGetAllPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export function HomePage(){
    const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
	const [isWelcomeVisible, setIsWelcomeVisible] = useState(
        isNewUser === "true",
	);    
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const {
        data,
        isFetching,
        refetch
    } = useGetAllPostsQuery();
    const { user } = useContext(UserContext)! 
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }
    if (!data) return null
    if (isFetching)return <ActivityIndicator style={{marginTop: 24}} size = {20} />
    return (
        <KeyboardAwareScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            scrollEventThrottle={300}
        >
            <WelcomeDetailsModal
				isVisible={isWelcomeVisible}
				onClose={() => setIsWelcomeVisible(false)}
			/>
            { data.map((post) => {
                return(
                    <PostCard post = {post} key={post.id} isEditingPost={false}/>
                )
            }) }

            
        </KeyboardAwareScrollView>
    )
}