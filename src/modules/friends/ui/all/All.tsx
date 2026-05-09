import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";

export function AllFriends(){
    return (
        <SafeAreaView>
            <FriendFrame frameName="Всі друзі"/>
        </SafeAreaView>
    )
}