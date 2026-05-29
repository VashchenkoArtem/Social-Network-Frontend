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

    return (
        <View style = {styles.mainContainer}>
            <View style = {styles.mainContainerHeader}>
                <ICONS.FriendsPageIcon height={20} color = {COLORS.gray} />
                <Text style = {styles.frameTitle}>Контакти</Text>
            </View>
            <Input iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />} placeholder="Пошук" notMarginBottom={true}/>
            {data && (
                <FlatList
                data={data}
                renderItem={({ item }) => {
        
                return (
                    <ContactCard friend={item.user}/>
                );
                }}
                />
            )}
        </View>
    )
}