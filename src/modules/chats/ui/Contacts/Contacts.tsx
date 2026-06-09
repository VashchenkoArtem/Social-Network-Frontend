import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi";
import { ContactCard } from "../Contact/Contact";
import { FlatList, View, Image, Text } from "react-native";
import { SERVER } from "@shared/constants/server";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { styles } from "@shared/ui/chatsFrame/styles";
import { Input } from "@shared/ui/input";
import { SearchIcon } from "@shared/ui/icons/inputs/Search";
import { useOnlineUsers } from "@modules/chats/api/onlineUsers";
import { socket } from "@shared/socket/socket";

export function Contacts() {
    const { data } = useGetAllFriendsQuery(undefined, {
        pollingInterval: 3000
    });
    const onlineUsers = useOnlineUsers()
    const [searchQuery, setSearchQuery] = useState("")
    const filteredContacts = data?.filter((item) => {
        if (!item?.user?.profile_app_profile.pseudonym) return false
        const username = item.user.profile_app_profile.pseudonym.toLowerCase()
        const search = searchQuery.toLowerCase()

        return username.includes(search)
    }) ?? []
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                <ICONS.FriendsPageIcon height={20} color={COLORS.gray} />
                <Text style={styles.frameTitle}>Контакти</Text>
            </View>

            <Input
                iconLeft={<SearchIcon color={COLORS.gray} width={20} height={20} />}
                placeholder="Пошук"
                notMarginBottom={true}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={filteredContacts}
                contentContainerStyle={{gap: 10}}
                keyExtractor={(item) => String(item.user.id)}
                renderItem={({ item }) => {
                    // const isOnline = onlineUsers.has(Number(item.user.id));

                    return (
                        <ContactCard
                            friend={item.user}
                            // isOnline={isOnline}
                        />
                    );
                }}
            />
        </View>
    );
}