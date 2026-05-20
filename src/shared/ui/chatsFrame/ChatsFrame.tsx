import { FlatList, View, Image, Text } from "react-native"
import { styles } from "./styles"
import { IChatProps } from "./types"
import { SERVER } from "@shared/constants/server"
import { Input } from "../input"
import { SearchIcon } from "../icons/inputs/Search"
import { COLORS } from "@shared/constants/colors"

export function ChatsFrame(props: IChatProps){
    const {Icon, frameTitle, items} = props

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
                    <View style = {{ flexDirection: "row", gap: 12}}>
                        <Image source={{
                                uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.avatar}`
                        }} width={46} height = {46} style = {{ borderRadius: 123}}/>
                        <Text style = {styles.groupName}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}