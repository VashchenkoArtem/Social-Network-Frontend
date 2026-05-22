import { useDeleteGroupChatMutation, useGetChatByIdQuery } from "@modules/chats/api/chatsApi"
import { useRouter } from "expo-router"
import { useState } from "react"
import { TouchableOpacity, View, Text, Image, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IChat } from "@modules/chats/api/api.types"
import { ICONS } from "@shared/ui"
import { COLORS } from "@shared/constants/colors"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { SERVER } from "@shared/constants/server"
import { styles } from "./chat.styles"

export function Chat(props: { chatId: number | undefined}){
    const { chatId } = props
    const { data: chat} = useGetChatByIdQuery(Number(chatId))
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [deleteGroupChat] = useDeleteGroupChatMutation()
    if (!chat) return null
    return (
        <View style={styles.groupChatContainer}>
            <View style={styles.groupChatHeader}>

                <TouchableOpacity onPress={() => {
                    router.replace("/chats")
                        
                    }}>
                    <Text style={styles.close} ><ICONS.LeftArrowIcon color = {COLORS.gray}/></Text>
                </TouchableOpacity>

                <View style={styles.infoHeaderContainer}>              
                    <Image source={{
                            uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${chat.avatar}`
                    }} width={46} height = {46} style = {{ borderRadius: 123}}/>

                    <View style={styles.chatInfo}>                        
                        <Text style={styles.chatName}>
                            {chat.name}
                        </Text>

                        <Text style={styles.chatOnlineStatus}>
                            2 учасникa, 1 в мережі
                        </Text>
                    </View>
                </View>

                <View style={{ position: "relative" }}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsMenuOpen(!isMenuOpen)
                        }}
                    >
                        <ICONS.DotsIcon color={COLORS.gray} />
                    </TouchableOpacity>

                    {isMenuOpen && (
                        <Pressable style={styles.menuContainer}>
                            <TouchableOpacity style={styles.menuBtn}>
                                <ICONS.MyPostsPageIcon color={COLORS.black} />
                                <Text style={styles.menuBtnText}>Медіа</Text>
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity 
                                style={styles.menuBtn}
                                onPress={() => {
                                    deleteGroupChat(chat.id)
                                }}
                            >
                                <ICONS.ExitIcon color={COLORS.black} />
                                <Text style={styles.menuBtnText}>Покинути групу</Text>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                </View>
            </View>

            <View style={styles.inputMessageContainer}>
                <View style = {{ flex: 1, justifyContent: "center"}}>
                    <Input 
                        inputType='text'
                        placeholder="Повідомлення"
                        notMarginBottom={true}
                    />
                </View>

                <View style={styles.messageBtnContainer}>
                    <Button 
                        variant="white" 
                        iconLeft={<ICONS.MyPostsPageIcon  width={20} height={20} color = {COLORS.plum}/>}
                    />

                    <Button 
                        variant="purple" 
                        iconLeft={<ICONS.ArrowIcon width={20} height={20} color = {COLORS.white}/>}
                    />
                </View>
                
            </View>
        </View>
    )
}