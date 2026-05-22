import Modal from "react-native-modal";
import { useState } from "react";
import { styles } from "./styles";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import { IChat } from "@modules/chats/api/api.types";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useDeleteGroupChatMutation } from "@modules/chats/api/chatsApi";

interface IChatModalProps {
    isModalVisible: boolean
    onClose: () => void
    chat: IChat | null
}

export function ChatModal(props: IChatModalProps) {
    const { isModalVisible, onClose, chat } = props
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [deleteGroupChat] = useDeleteGroupChatMutation()

    if (!chat) return null

    return (
        <Modal
            isVisible={isModalVisible}
            style={styles.modal}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            swipeDirection="up"
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            useNativeDriver
        >
            <View style={styles.groupChatContainer}>
                <View style={styles.groupChatHeader}>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.close}>✕</Text>
                    </TouchableOpacity>

                    <View style={styles.infoHeaderContainer}>                        
                        <Text style={styles.chatName}>
                            {chat.name}
                        </Text>

                        <Text style={styles.chatOnlineStatus}>
                            учасників
                        </Text>
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
                                        onClose()
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
                    <Input placeholder="Повідомлення" />

                    <Button 
                        variant="white" 
                        iconLeft={<ICONS.MyPostsPageIcon color = {COLORS.plum}/>}
                    />

                    <Button 
                        variant="purple" 
                        iconLeft={<ICONS.ArrowIcon color = {COLORS.plum}/>}
                    />
                </View>

            </View>
        </Modal>
    );
}