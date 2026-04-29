import { View } from "react-native";
import { PostContent } from "@modules/tabs/ui/postPage/postPage"; 

export default function PostsPage() {
    return (
        <View style={{ flex: 1 }}>
            <PostContent />
        </View>
    );
}