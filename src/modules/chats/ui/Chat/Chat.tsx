import { useDeleteGroupChatMutation, useGetChatByIdQuery } from "@modules/chats/api/chatsApi"
import { useRouter } from "expo-router"
import { useContext, useState } from "react"
import { TouchableOpacity, View, Text, Image, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IChat } from "@modules/chats/api/api.types"
import { ICONS } from "@shared/ui"
import { COLORS } from "@shared/constants/colors"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { SERVER } from "@shared/constants/server"
import { styles } from "./chat.styles"
import { socket } from "@shared/socket/socket"
import { UserContext } from "@modules/auth/context/user-context"
import { Messages } from "@modules/message/ui/messages/Messages"
import { getAvatar } from "@shared/utils/avatar"

export function Chat(props: { chatId: number | undefined}){
    const { chatId } = props
    const { data: chat} = useGetChatByIdQuery(Number(chatId))
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [deleteGroupChat] = useDeleteGroupChatMutation()
    const [messageText, setMessageText] = useState<string>("")
    const { user } = useContext(UserContext)!
    if (!chat || !user || !chatId) return null
    const otherUser = chat.chat_app_chat_users.filter(
        (chatUser) => chatUser.user_id !== user.id
    )[0];
    return (
        <View style={styles.groupChatContainer}>
            <View style={styles.groupChatHeader}>

                <TouchableOpacity onPress={() => {
                    router.replace("/chats")
                    socket.emit("leaveChat", {
                        chatId: chat.id
                    })
                    }}>
                    <Text style={styles.close} ><ICONS.LeftArrowIcon color = {COLORS.gray}/></Text>
                </TouchableOpacity>

                <View style={styles.infoHeaderContainer}>              
                    <Image source={{
                            uri: getAvatar(chat.avatar)
                    }} width={46} height = {46} style = {{ borderRadius: 123, backgroundColor: COLORS.gray}}/>

                    <View style={styles.chatInfo}>                        
                        <Text style={styles.chatName}>
                            { chat.is_group 
                            ? chat.name
                            : otherUser.user_app_user.username
                        }
                            
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
                                <Text style={styles.menuBtnText}>{ chat.is_group 
                                                                    ? "Покинути групу"
                                                                    : "Видалити чат"}</Text>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                </View>
            </View>

            <Messages chatId={chatId} />
            <View style={styles.inputMessageContainer}>
                <View style = {{ flex: 1, justifyContent: "center"}}>
                <Input
                inputType="text"
                placeholder="Повідомлення"
                notMarginBottom={true}
                value={messageText} 
                onChangeText={(text) => setMessageText(text)}
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
                        onPress={() => {
                            socket.emit("sendMessage", {
                                text: messageText,
                                chat_id: chatId,
                                sender_id: user.id,
                                avatar: user.profile_app_profile.avatar ? user.profile_app_profile.avatar : getAvatar(user.profile_app_profile.avatar),
                                username: user.username || ""
                            })
                            setMessageText("")
                        }}
                    />
                </View>
                
            </View>
        </View>
    )
}