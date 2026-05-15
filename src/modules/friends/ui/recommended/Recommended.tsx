import { SafeAreaView } from "react-native-safe-area-context";
import { FriendFrame } from "../friendFrame";

export function Recommended(){
    return (
        <SafeAreaView>
            <FriendFrame frameName="Рекомендації"/>
        </SafeAreaView>
    )
}