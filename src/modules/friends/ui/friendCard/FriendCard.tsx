import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { useCreateFriendRequestMutation, useDeleteFriendRequestMutation, useUpdateFriendRequestMutation } from "@modules/friends/api/friendsApi";
import { useState } from "react";
import Modal from "react-native-modal";

export function FriendCard(props: IProps) {
    const router = useRouter();
    const { user, requestId, buttonText } = props;
    
    if (!user) return null
    
    const [deleteFriendRequest] = useDeleteFriendRequestMutation()
    const [deleteFriendRequestModal, setDeleteFriendRequestModal] = useState(false)
    const [createFriendShip] = useCreateFriendRequestMutation()
    const [ updateFriendRequest ] = useUpdateFriendRequestMutation()
    const [isVisible, setIsVisible] = useState<boolean>(true)
    return (
        <>
            {isVisible && (
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Image style={styles.authorAvatar} source={
                            user.profile_app_profile.avatar
                            ? { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user.profile_app_profile.avatar}`, }
                            : require("../../../../assets/defaultAvatar.png")
                        }/>
                        <View style={styles.friendInfo}>
                            <Text style={styles.friendsFullName}>{ user.first_name }asdasdad { user.last_name }</Text>
                            <Text style={styles.friendsNickName}>@{ user.username }</Text>
                        </View>
                    </View>
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
                            }
                        }}/>
                        <Button 
                            variant="white" 
                            text = "Видалити" 
                            onPress={(event) => {
                                event.stopPropagation()
                                // setIsVisible(false)
                                if (requestId){
                                    console.log(deleteFriendRequestModal)
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
                                                        status: "Canceled"
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