import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { SERVER } from "@shared/constants/server";
import { Button } from "@shared/ui/button";
import { styles } from './styles'
import { useRouter } from "expo-router";
import { useDeleteFriendRequestMutation } from "@modules/friends/api/friendsApi";
import { useState } from "react";
import Modal from "react-native-modal";

export function FriendCard(props: IProps) {
    const router = useRouter();
    const { user } = props;
    if (!user) return null

    const [deleteFriendRequest] = useDeleteFriendRequestMutation()
    const [deleteFriendRequestModal, setDeleteFriendRequestModal] = useState(false)

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Image style={styles.authorAvatar} source={
                    user.profile.avatar
                    ? { uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user.profile.avatar}`, }
                    : require("../../../../assets/defaultAvatar.png")
                }/>
                <View style={styles.friendInfo}>
                    <Text style={styles.friendsFullName}>{ user.firstname } { user.lastname }</Text>
                    <Text style={styles.friendsNickName}>@{ user.username }</Text>
                </View>
            </View>
            <View style={styles.cardButtons}>
                <Button variant="purple" text = "Підтвердити"  onPress={() => {
                    router.push({
                        pathname: `/${user.id}`, 
                  })
                }}/>
                <Button 
                    variant="white" 
                    text = "Видалити" 
                    onPress={(event) => {
                        event.stopPropagation()
                        setDeleteFriendRequestModal(!deleteFriendRequestModal)
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
                                        deleteFriendRequest(user.id)
                                        setDeleteFriendRequestModal(false)
                                    }} 
                                />
                            </View>
                        </View>
                    </Modal>
                )}                
            </View>
       </View>
    )
}