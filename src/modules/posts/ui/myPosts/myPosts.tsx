import { View, Text } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";

export function MyPostsPage(){
    const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(
        isNewUser === "true",
    );

    const { data } = useMyPostsQuery(undefined, {
        pollingInterval: 5000
    });

    const { user } = useContext(UserContext)!;
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }

    if (!data) return null
    return (
        <View>
            <WelcomeDetailsModal
                isVisible={isWelcomeVisible}
                onClose={() => setIsWelcomeVisible(false)}
            />
            { data.map((post) => {
                return(
                    <PostCard post = {post} key={post.id}/>
                )
            }) }
        </View>
    )
}