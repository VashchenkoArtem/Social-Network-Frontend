import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { PostCard } from "../postCard/PostCard";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { useMyPostsQuery } from "@modules/posts/api/postsApi";
import { UserContext } from "@modules/auth/context/user-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { COLORS } from "@shared/constants/colors";
import { CreatePostForm } from "../create-post-form";

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
