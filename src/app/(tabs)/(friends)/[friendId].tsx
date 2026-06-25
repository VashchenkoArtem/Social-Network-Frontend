import { FriendProfile } from "@modules/friends/ui/friendProfile/FriendProfile";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function FriendProfileScreen(){
    const params = useLocalSearchParams()

    const userId =
        typeof params.userId === "string"
            ? Number(params.userId)
            : undefined

    const requestId =
        typeof params.requestId === "string"
            ? Number(params.requestId)
            : undefined

    if (userId == null) return <Redirect href={"(tabs)/friends"}/>

    return <FriendProfile userId={userId} requestId = {requestId}/>
}