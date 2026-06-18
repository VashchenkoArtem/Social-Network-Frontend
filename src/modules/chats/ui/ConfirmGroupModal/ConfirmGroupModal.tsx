import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker"; 
import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi"; 
import { useCreateChatMutation, useLazyGetChatByIdQuery } from "@modules/chats/api/chatsApi";
import { Input } from "@shared/ui/input"; 
import { SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui"; 
import { styles } from "./styles"; 
import { Button } from "@shared/ui/button";
import { IUser } from "@shared/types/user.types";
import { useUserContext } from "@modules/auth/context/user-context";
import { ChatAvatar } from "../ChatAvatar/ChatAvatar";
import { getAvatar } from "@shared/utils/avatar";

interface IUserProfile {
    avatar: string | null;
    signature: string | null;
    birth_date: string | null;
    pseudonym: string | null;
    is_image_signature: boolean;
    is_text_signature: boolean;
}

interface IFriend {
    id: number;
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    email: string;
    profile: IUserProfile | null;
}

interface IFriendRequest {
    id: number;
    status: string | null;
    from_user_id: number;
    to_user_id: number;
    user: IUser;
}

interface GroupUserPayload {
    id: number;
    username: string;
    profile_app_profile: {
        id: number;
        avatar: string;
        pseudonym: string;
    };
}

interface IConfirmGroupModalProps {
    visible: boolean;
    onClose: () => void;
    onBackStep: () => void;
    groupName: string;
    setGroupName: (name: string) => void;
    selectedUserIds: number[];
    onRemoveParticipant: (userId: number) => void;
    avatarUri: string | null;
    onChangeAvatar: (uri: string | null) => void;
    mode: "create" | "edit";
    chatId?: number;
    usersInGroup?: GroupUserPayload[];
    chat?: {
        avatar: string;
        is_group: boolean;
    };
    isAdmin?: boolean;
    onDeleteChat?: () => void;
}

export function ConfirmGroupModal({
    visible,
    onClose,
    onBackStep,
    groupName,
    setGroupName,
    selectedUserIds,
    onRemoveParticipant,
    avatarUri,
    onChangeAvatar,
    mode,
    chatId,
    usersInGroup,
    chat,
    isAdmin = false,
    onDeleteChat
}: IConfirmGroupModalProps) {
    const { data: friendsRequestsData } = useGetAllFriendsQuery(undefined);
    const [ getChatById ] = useLazyGetChatByIdQuery();
    const friendsRequests = (friendsRequestsData || []) as unknown as IFriendRequest[];
    const { token, user } = useUserContext()!;

    const chosenFriends = React.useMemo(() => {
        return (friendsRequests ?? [])
            .map(r => r.user)
            .filter(Boolean)
            .filter(user => selectedUserIds.includes(user.id));
    }, [friendsRequests, selectedUserIds]);

    const chosenParticipants = chosenFriends.map((friend) => ({
        id: friend.id,
        username: friend.username,
        profile_app_profile: {
            id: friend.profile_app_profile.id,
            avatar: friend.profile_app_profile.avatar || "",
            pseudonym: friend.profile_app_profile.pseudonym || "",
        }
    }));

    const filteredUsersInGroup = usersInGroup?.filter((userInGroup) => userInGroup.id !== user?.id) || [];

    const pickGroupImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], 
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });

        if (!result.canceled) {
            onChangeAvatar(result.assets[0].uri);
        }
    };

    // const confirmDelete = () => {
    //     Alert.alert(
    //         "Видалення чату",
    //         "Ви впевнені, що хочете повністю видалити цей чат? Усі повідомлення та медіа будуть стерті для всіх учасників.",
    //         [
    //             { text: "Скасувати", style: "cancel" },
    //             { 
    //                 text: "Видалити", 
    //                 style: "destructive", 
    //                 onPress: () => {
    //                     if (onDeleteChat) onDeleteChat();
    //                 } 
    //             }
    //         ]
    //     );
    // };

    const handleSubmit = async () => {
        if (!groupName.trim()) {
            Alert.alert("Помилка", "Будь ласка, введіть назву групи");
            return;
        }

        try {
            const formData = new FormData();
            const xhr = new XMLHttpRequest();

            xhr.open(
                mode === "create" ? "POST" : "PATCH",
                mode === "create"
                    ? `http://${SERVER.host}:${SERVER.port}/chat`
                    : `http://${SERVER.host}:${SERVER.port}/chat/${chatId}`
            );

            xhr.setRequestHeader("Authorization", `Bearer ${token}`);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    onClose();
                    if (chatId){
                        getChatById(chatId);
                    }
                }
            };

            xhr.onerror = () => {
                console.log("XHR ERROR:", xhr.responseText);
                Alert.alert("Ошибка", "Network error");
            };

            formData.append("name", groupName.trim());
            formData.append("userIds", JSON.stringify(selectedUserIds));
            formData.append("is_group", "true");

            if (avatarUri) {
                formData.append("avatar", {
                    uri: avatarUri,
                    name: `group_${Date.now()}.jpg`,
                    type: "image/jpeg",
                } as any);
            }

            xhr.send(formData);
        } catch (error) {
            console.log(error);

            Alert.alert(
                "Помилка",
                mode === "create"
                    ? "Не вдалося створити групу"
                    : "Не вдалося оновити групу"
            );
        }
    };
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.modal}
            useNativeDriver
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={250}
            animationOutTiming={200}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <ICONS.CloseModalIcon color={COLORS.black} width={12} height={12} />
                </TouchableOpacity>

                <Text style={styles.title}>
                    {mode === "create" ? "Нова група" : "Редагування групи"}
                </Text>

                <View style={styles.groupNameInputContainer}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Назва</Text>
                    <Input
                        placeholder="Введіть назву"
                        value={groupName}
                        onChangeText={setGroupName}
                        variant="primary"
                    />
                </View>

                <View style={styles.pickGroupImageContainer}>
                    <TouchableOpacity onPress={pickGroupImage} activeOpacity={0.8}>
                        {avatarUri && !avatarUri.includes("default-group-avatar.png") ? (
                            <Image
                                source={{ uri: avatarUri }}
                                style={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: 123,
                                }}
                            />
                        ) : (
                            <View>
                                <ChatAvatar
                                    avatar={chat?.avatar && !chat.avatar.includes("default-group-avatar.png") ? chat.avatar : undefined}
                                    isGroup={true}
                                    groupName={groupName}
                                />
                                <Text>{chat?.is_group}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.groupImageBtnsContainer}>
                        <TouchableOpacity style={{ marginRight: 15, alignItems: 'center' }} onPress={pickGroupImage}>
                            <Text style={{ color: COLORS.plum, fontWeight: 500 }}>
                                {avatarUri ? "Змінити" : "+ Додайте фото"}
                            </Text>
                        </TouchableOpacity>

                        {!avatarUri && (                            
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, alignItems: 'center' }} onPress={pickGroupImage}>
                                <ICONS.MyPostsPageIcon color={COLORS.plum}/>
                                <Text style={{ color: COLORS.plum, fontWeight: 500 }}>Оберіть фото</Text>
                            </TouchableOpacity>
                        )}
                        
                        {avatarUri && (
                            <TouchableOpacity onPress={() => onChangeAvatar(null)}>
                                <Text style={{ color: COLORS.gray, fontWeight: 500 }}>Видалити</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.groupPartisipantsContainer}>
                    <Text style={{ fontSize: 16, color: COLORS.black, textAlign: 'left' }}>Учасники</Text>

                    <FlatList
                        data={usersInGroup ? filteredUsersInGroup : chosenParticipants}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ width: '100%' }}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            
                            return (
                                <View style={[styles.friendRow, { justifyContent: "space-between" }]}>
                                    <View style={styles.friendInfo}>
                                        <Image source={{ uri: item.profile_app_profile.avatar ? item.profile_app_profile.avatar : getAvatar(item.profile_app_profile.avatar) }} style={styles.avatar} />
                                        <Text style={[styles.friendName, { color: COLORS.black }]}>
                                            {item.profile_app_profile.pseudonym}
                                        </Text>
                                    </View>
                                    
                                    <TouchableOpacity onPress={() => onRemoveParticipant(item.id)} hitSlop={15}>
                                        <ICONS.DeleteIcon color={COLORS.gray} width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>

                <View style={styles.footerRow}>
                    <Button 
                        variant="white"
                        text="Назад"
                        onPress={onBackStep}
                    />
                    <Button
                        variant="purple"
                        text={mode === "create" ? "Створити групу" : "Зберегти"}
                        onPress={handleSubmit}
                        disabled={!groupName.trim() || selectedUserIds.length === 0}
                    />                                                                             
                </View>
            </View>
        </Modal>
    );
}