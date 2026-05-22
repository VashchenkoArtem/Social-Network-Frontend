import { useDeleteGroupChatMutation, useGetChatByIdQuery } from "@modules/chats/api/chatsApi"
import { styles } from "@modules/chats/ui/groupChatsModal/styles"
import { COLORS } from "@shared/constants/colors"
import { SERVER } from "@shared/constants/server"
import { ICONS } from "@shared/ui"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ChatScreen(){
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const params = useLocalSearchParams()
    const router = useRouter()
    const chatId = 
        typeof params.chatId === 'string'
        ? Number(params.chatId)
        : undefined
        
    const [deleteGroupChat] = useDeleteGroupChatMutation()
    const { data: chat} = useGetChatByIdQuery(Number(chatId))
    if (!chat) return null
    return (
        <SafeAreaView style={styles.groupChatContainer}>
            <View style={styles.groupChatHeader}>

                <TouchableOpacity onPress={() => {
                    console.log("asdasd")
                    router.back()
                        
                    }}>
                    <Text style={styles.close} >&lt;</Text>
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
                            2 учасникa
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
                <View style = {{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Input 
                        // inputType='text'
                        placeholder="Повідомлення"                        
                    />
                </View>

                <View style={styles.messageBtnContainer}>
                    <Button 
                        variant="white" 
                        iconLeft={<ICONS.MyPostsPageIcon color = {COLORS.plum}/>}
                    />

                    <Button 
                        variant="purple" 
                        iconLeft={<ICONS.ArrowIcon width={20} color = {COLORS.white}/>}
                    />
                </View>
                
            </View>
        </SafeAreaView>
    )
}