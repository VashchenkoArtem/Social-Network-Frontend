import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { ContactCard } from "../Contact/Contact";
import { FlatList, View, Image, Text } from "react-native";
import { SERVER } from "@shared/constants/server";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { styles } from "@shared/ui/chatsFrame/styles";
import { Input } from "@shared/ui/input";
import { SearchIcon } from "@shared/ui/icons/inputs/Search";

export function Contacts(){
    const { data } = useGetAllFriendsQuery()
    const { user } = useContext(UserContext)!
    if (!data) return null
    const filteredData = data.filter(
    (item) =>
        item.from_profile.id === user?.id ||
        item.to_profile.id === user?.id
    )
    return (
        <View style = {styles.mainContainer}>
            <View style = {styles.mainContainerHeader}>
                <ICONS.FriendsPageIcon height={20} color = {COLORS.gray} />
                <Text style = {styles.frameTitle}>Контакти</Text>
            </View>
            <Input iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} placeholder="Пошук" notMarginBottom={true}/>
            <FlatList
            data={filteredData}
            renderItem={({ item }) => {
            const friend =
                item.from_profile.id === user?.id
                ? item.to_profile
                : item.from_profile;
    
            const avatarUri = `http://${SERVER.host}:${SERVER.port}/media/thumb/${friend.profile.avatar}`;
    
            return (
                <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <Image
                    source={{ uri: avatarUri }}
                    style={{ width: 46, height: 46, borderRadius: 23 }}
                />
                <Text style = {styles.groupName}>{friend.username}</Text>
                </View>
            );
            }}
            />
        </View>
    )
}