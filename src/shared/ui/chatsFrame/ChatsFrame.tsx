import { FlatList, View, Image, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { IChatProps } from "./types"
import { SERVER } from "@shared/constants/server"
import { Input } from "../input"
import { SearchIcon } from "../icons/inputs/Search"
import { COLORS } from "@shared/constants/colors"
import { useState } from "react"
import { ChatModal } from "@modules/chats/ui/groupChatsModal/gropChatsModal"
import { useRouter } from "expo-router"

export function ChatsFrame(props: IChatProps){
    const {Icon, frameTitle, items} = props
    const router = useRouter()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainerHeader}>
                {Icon}
                <Text style = {styles.frameTitle}>{frameTitle}</Text>
            </View>
            <Input iconLeft={<SearchIcon color = {COLORS.gray} width={20} height={20} />} placeholder="Пошук" />
            <FlatList
                data = {items}
                renderItem={({item}) => (
                    <View>
                        <TouchableOpacity style = {{ flexDirection: "row", gap: 12}} onPress={ () => router.push(`(chats)/${item.id}`)}>
                            
                            <Image source={{
                                    uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.avatar}`
                            }} width={46} height = {46} style = {{ borderRadius: 123}}/>
                            <Text style = {styles.groupName}>{item.name}</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />

        </View>
    )
}