import { useGetAllPostsQuery } from "@modules/posts/api/postsApi";
import { View } from "react-native";
import { PostCard } from "../postCard/PostCard";


export function Home(){
    const { data } = useGetAllPostsQuery(undefined, {
        pollingInterval: 3000
    })
    if (!data) return null
    return (
        <View>
            { data.map((post) => {
                return(
                    <PostCard post = {post} key={post.id} isEditingPost={false}/>
                )
            }) }
        </View>
    )
}