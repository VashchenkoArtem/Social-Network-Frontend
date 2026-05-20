import { View, Text } from "react-native";
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
    const { data } = useGetAllPostsQuery(undefined, {
        pollingInterval: 5000
    });
    const { user } = useContext(UserContext)! 
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