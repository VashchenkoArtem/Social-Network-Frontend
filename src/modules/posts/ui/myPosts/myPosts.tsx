import { PostCard } from "../postCard/PostCard";
import { Redirect } from "expo-router";
import { useContext } from "react";
import { useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export function MyPostsPage(){
    const { data } = useMyPostsQuery(undefined, {
        pollingInterval: 5000
    });
    const { user } = useContext(UserContext)!;
    if (!user) {
        return <Redirect href={"/login"}></Redirect>;
    }

    if (!data) return null
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            { data.map((post) => {
                return(
                    <PostCard post = {post} key={post.id} isEditingPost={true}/>
                )
            }) }
        </KeyboardAwareScrollView>
    )
}
