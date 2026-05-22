import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker"; 
import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi"; 
import { useCreateGroupChatMutation } from "@modules/chats/api/chatsApi";
import { Input } from "@shared/ui/input"; 
import { SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui"; 
import { styles } from "./styles"; 

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
    senderId: number;
    receiverId: number;
    from_profile: IFriend;
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
}

interface ICreateGroupChatDtoFake {
    name: string;
    userIds: number[];
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
    onChangeAvatar
}: IConfirmGroupModalProps) {
    const { data: friendsRequestsData } = useGetAllFriendsQuery(undefined);
    const friendsRequests = (friendsRequestsData || []) as unknown as IFriendRequest[];
    const [createGroupChat, { isLoading: isCreating }] = useCreateGroupChatMutation();

    const chosenFriends = React.useMemo<IFriend[]>(() => {
        return friendsRequests
            .map((request: IFriendRequest) => request.from_profile)
            .filter((friend: IFriend) => selectedUserIds.includes(friend.id));
    }, [friendsRequests, selectedUserIds]);

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

    const handleCreateGroupSubmit = async () => {
        if (!groupName.trim()) {
            Alert.alert("Помилка", "Будь ласка, введіть назву групи");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("name", groupName.trim());
            formData.append("userIds", JSON.stringify(selectedUserIds));

            if (avatarUri) {
                const fileToUpload = {
                    uri: avatarUri,
                    name: `group_${Date.now()}.jpg`,
                    type: "image/jpeg"
                };
                formData.append("avatar", fileToUpload as unknown as Blob); 
            }

            await createGroupChat(formData as unknown as ICreateGroupChatDtoFake).unwrap();
            
            setGroupName("");
            onClose(); 
        } catch (error: unknown) {
            console.log(error)
            Alert.alert("Помилка", "Не вдалося створити групу");
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.modal}
            useNativeDriver
            animationIn="slideInRight"
            animationOut="slideOutRight"
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={15}>
                    <ICONS.DeleteIcon color={COLORS.black} width={22} height={22} />
                </TouchableOpacity>

                <Text style={[styles.title, { color: COLORS.black }]}>Нова група</Text>

                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 4 }}>Назва</Text>
                <Input
                    placeholder="Введіть назву"
                    value={groupName}
                    onChangeText={setGroupName}
                    variant="primary"
                />

                <View style={{ alignItems: "center", marginVertical: 15 }}>
                    <TouchableOpacity onPress={pickGroupImage} activeOpacity={0.8}>
                        {avatarUri ? (
                            <Image 
                                source={{ uri: avatarUri }} 
                                style={{ width: 60, height: 60, borderRadius: 30 }} 
                            />
                        ) : (
                            <View style={[styles.avatar, { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.plum, justifyContent: "center", alignItems: "center" }]}>
                                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>
                                    {groupName ? groupName[0].toUpperCase() : "NG"}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
                        <TouchableOpacity style={{ marginRight: 15 }} onPress={pickGroupImage}>
                            <Text style={{ color: COLORS.plum, fontWeight: "600" }}>
                                {avatarUri ? "Змінити... " : "+ Додайте фото"}
                            </Text>
                        </TouchableOpacity>
                        
                        {avatarUri && (
                            <TouchableOpacity onPress={() => onChangeAvatar(null)}>
                                <Text style={{ color: COLORS.gray, fontWeight: "600" }}>Видалити</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>Учасники</Text>

                <FlatList
                    data={chosenFriends}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const userAvatarUri = item.profile?.avatar 
                            ? `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.profile.avatar}`
                            : null;

                        return (
                            <View style={[styles.friendRow, { justifyContent: "space-between" }]}>
                                <View style={styles.friendInfo}>
                                    {userAvatarUri ? (
                                        <Image source={{ uri: userAvatarUri }} style={styles.avatar} />
                                    ) : (
                                        <View style={[styles.avatar, styles.placeholderAvatar, { backgroundColor: COLORS.lightestGray }]}>
                                            <Text style={[styles.placeholderText, { color: COLORS.gray }]}>
                                                {item.firstname ? item.firstname[0].toUpperCase() : "U"}
                                            </Text>
                                        </View>
                                    )}
                                    <Text style={[styles.friendName, { color: COLORS.black }]}>
                                        {item.firstname} {item.lastname}
                                    </Text>
                                </View>
                                
                                <TouchableOpacity onPress={() => onRemoveParticipant(item.id)} hitSlop={15}>
                                    <ICONS.DeleteIcon color={COLORS.gray} width={20} height={20} />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

                <View style={styles.footerRow}>
                    <TouchableOpacity style={[styles.btn, styles.btnCancel, { backgroundColor: COLORS.lightestGray }]} onPress={onBackStep}>
                        <Text style={{ color: COLORS.gray }}>Назад</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.btn, 
                            styles.btnNext, 
                            { backgroundColor: COLORS.plum },
                            (!groupName.trim() || selectedUserIds.length === 0 || isCreating) && { backgroundColor: COLORS.lightGray }
                        ]} 
                        onPress={handleCreateGroupSubmit}
                        disabled={!groupName.trim() || selectedUserIds.length === 0 || isCreating}
                    >
                        <Text style={{ color: COLORS.white }}>
                            {isCreating ? "..." : "Створити групу"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}