import { useDeleteGroupChatMutation, useGetChatByIdQuery } from "@modules/chats/api/chatsApi"
import { useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { TouchableOpacity, View, Text, Image, Pressable, Platform, KeyboardAvoidingView } from "react-native"
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
import { useLazyMarkMessagesAsReadQuery } from "@modules/message/api/messageApi"
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker"
import { ChatAvatar } from "../ChatAvatar/ChatAvatar"

export function Chat(props: { chatId: number | undefined}){
    const { chatId } = props
    const { data: chat} = useGetChatByIdQuery(Number(chatId))
    const router = useRouter()
    const [markMessagesAsRead] = useLazyMarkMessagesAsReadQuery();
    useEffect(() => {
        markMessagesAsRead(Number(chatId))
    },[])
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [deleteGroupChat] = useDeleteGroupChatMutation()
    const [messageText, setMessageText] = useState<string>("")
    const { user, token } = useContext(UserContext)!
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    if (!chat || !user || !chatId) return null
    const otherUser = chat.chat_app_chat_users.filter(
        (chatUser) => chatUser.user_id !== user.id
    )[0];
    const pickImages = async () => {
        const permission = await requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 7,
            quality: 0.8,
        });

        if (!result.canceled) {
            const assets = result.assets.slice(0, 7);

            setSelectedImages(
                assets.map(asset => asset.uri)
            );
        }
    };
    const sendMessage = async () => {
        socket.emit("sendMessage", {
            text: messageText,
            chat_id: chatId,
            sender_id: user.id,
            avatar: user.profile_app_profile.avatar ? user.profile_app_profile.avatar : getAvatar(user.profile_app_profile.avatar),
            pseudonym: user.profile_app_profile.pseudonym || "",
            photos: selectedImages  
        })

        if (selectedImages.length > 0){
            const xhr = new XMLHttpRequest()
            const formData = new FormData()

            xhr.open('POST', `http://${SERVER.host}:${SERVER.port}/messages/chat/${chat.id}`);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);

            formData.append("text", messageText)
            selectedImages.forEach((uri, index) => {
                formData.append("images", {
                    uri,
                    type: "image/jpeg",
                    name: `photo-${index}.jpg`,
                } as any);
            });
            xhr.send(formData)
        }
        setSelectedImages([])
        setMessageText("")
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.groupChatContainer}
            keyboardVerticalOffset={80}
        >
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
                    { chat.is_group 
                        ? <ChatAvatar avatar={chat.avatar} isGroup={chat.is_group} groupName={chat.name}/>
                        : <ChatAvatar avatar={otherUser.user_app_user.profile_app_profile.avatar} isGroup={chat.is_group} groupName={chat.name}/>
                    }         

                    <View style={styles.chatInfo}>                        
                        <Text style={styles.chatName}>
                            { chat.is_group 
                            ? chat.name
                            : otherUser.user_app_user.profile_app_profile.pseudonym || ""
                        }
                            
                        </Text>
                        { chat.is_group ? (
                            <Text style={styles.chatOnlineStatus}>
                                {chat.chat_app_chat_users.length} учасника, 1 в мережі
                            </Text>
                        ) : (
                            <Text style={styles.chatOnlineStatus}>
                                Був(-ла) в мережі о 20:45                   
                            </Text>
                        )}
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
            {selectedImages.length > 0 && (
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 8,
                    }}
                >
                    {selectedImages.map((uri) => (
                        <View
                            key={uri}
                            style={{
                                position: "relative",
                            }}
                        >
                            <Image
                                source={{ uri }}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 8,
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedImages(prev =>
                                        prev.filter(imageUri => imageUri !== uri)
                                    );
                                }}
                                style={{
                                    position: "absolute",
                                    top: -6,
                                    right: -6,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
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
                        iconLeft={
                            <ICONS.MyPostsPageIcon
                                width={20}
                                height={20}
                                color={COLORS.plum}
                            />
                        }
                        onPress={pickImages}
                    />

                    <Button 
                        variant="purple" 
                        iconLeft={<ICONS.ArrowIcon width={20} height={20} color = {COLORS.white}/>}
                        onPress={() => {sendMessage()}}
                    />
                </View>
                
            </View>
        </KeyboardAvoidingView>
    )
}