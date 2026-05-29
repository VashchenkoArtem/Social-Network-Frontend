import { UserContext } from "@modules/auth/context/user-context";
import { FriendProfile } from "@modules/friends/ui/friendProfile/FriendProfile";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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