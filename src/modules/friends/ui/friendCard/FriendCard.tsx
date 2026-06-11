import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { useCreateFriendRequestMutation, useDeleteFriendRequestMutation, useUpdateFriendRequestMutation } from "@modules/friends/api/friendsApi";
import { useState } from "react";
import Modal from "react-native-modal";
import { getAvatar } from "@shared/utils/avatar";
import { useCreateChatMutation } from "@modules/chats/api/chatsApi";
import { socket } from "@shared/socket/socket";
import { BigUserCard } from "@shared/ui/bigUserCard/BigUserCard";

export function FriendCard(props: IProps) {
    const router = useRouter();
    const { user, requestId, buttonText, isOnline } = props;
    
    if (!user) return null
    
    const [deleteFriendRequest] = useDeleteFriendRequestMutation()
    const [deleteFriendRequestModal, setDeleteFriendRequestModal] = useState(false)
    const [createFriendShip] = useCreateFriendRequestMutation()
    const [ updateFriendRequest ] = useUpdateFriendRequestMutation()
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [ createChat ] = useCreateChatMutation()
    if (!user.profile_app_profile) return null
    return (
        <>
            {isVisible && (
                <View style={styles.card}>
                    <BigUserCard isOnline={isOnline} avatar={user.profile_app_profile.avatar} username={user.username} pseudonym={user.profile_app_profile.pseudonym}/>
                    <View style={styles.cardButtons}>
                        <Button variant="purple" text = {buttonText} onPress={async () => {
                            if (buttonText === "Підтвердити" || buttonText === "Додати"){
                                router.push({
                                    pathname: `/(friends)/${user.id}`, 
                                    params: {
                                        userId: user.id,
                                        requestId: requestId,
                                    }
                            })
                            }else if (buttonText === "Повідомлення"){
                                const chat = await createChat({
                                    name: "",
                                    userIds: [user.id]
                                }).unwrap()
                                socket.emit("joinChat", {
                                    chatId: chat.id
                                })
                                router.push(`/(chats)/${chat.id}`)
                            }
                        }}/>
                        <Button 
                            variant="white" 
                            text = "Видалити" 
                            onPress={(event) => {
                                event.stopPropagation()
                                // setIsVisible(false)
                                if (requestId){
                                    setDeleteFriendRequestModal(!deleteFriendRequestModal)
                                }
                        }}/>
        
                        {deleteFriendRequestModal && (
                            <Modal
                                isVisible={deleteFriendRequestModal}
                                onBackdropPress={() => setDeleteFriendRequestModal(false)}
                                onSwipeComplete={() => setDeleteFriendRequestModal(false)}
                                style={styles.modal}
                                useNativeDriver
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInTiming={150}
                                animationOutTiming={150}
                                backdropOpacity={0.4}
                                backdropTransitionInTiming={200}
                                backdropTransitionOutTiming={200}
                            >
                                <View style={styles.deleteRequestContainer}>
                                    <Text style={styles.deleteModalText}>Підтвердити дію</Text>
                                    <Text style={styles.deleteModalTextSecond}>Ви дійсно хочете видалити користувача?</Text>
        
                                    <View style={styles.modalButtons}>
                                        <Button variant="white" text="Скасувати" onPress={() => setDeleteFriendRequestModal(false)} />
                                        <Button variant="purple" text="Підтвердити" onPress={() => {
                                                if (requestId){
                                                    updateFriendRequest({
                                                        requestId,
                                                        status: "canceled"
                                                    })
                                                }
                                                setIsVisible(false)
                                                setDeleteFriendRequestModal(false)
                                            }} 
                                        />
                                    </View>
                                </View>
                            </Modal>
                        )}                
                    </View>
            </View>
            )}
        </>
    )
}