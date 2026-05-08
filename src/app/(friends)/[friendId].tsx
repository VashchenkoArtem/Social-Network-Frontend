import { UserContext } from "@modules/auth/context/user-context";
import { FriendProfile } from "@modules/friends/ui/friendProfile/FriendProfile";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendProfileScreen(){
    const { user } = useContext(UserContext)!
    return (
        <View style = {{marginTop: 8}}>
            <FriendProfile user = {user}></FriendProfile>
        </View>
    )
}