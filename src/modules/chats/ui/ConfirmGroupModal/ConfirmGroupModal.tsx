import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker"; 
import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi"; 
import { useCreateChatMutation } from "@modules/chats/api/chatsApi";
import { Input } from "@shared/ui/input"; 
import { SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/ui"; 
import { styles } from "./styles"; 
import { Button } from "@shared/ui/button";
import { IUser } from "@shared/types/user.types";

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

    user: IUser
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
    is_group: boolean;
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
    const [createGroupChat, { isLoading: isCreating }] = useCreateChatMutation();

    const chosenFriends = React.useMemo(() => {
        return (friendsRequests ?? [])
            .map(r => r.user)
            .filter(Boolean)
            .filter(user => selectedUserIds.includes(user.id));
    }, [friendsRequests, selectedUserIds]);
    console.log(chosenFriends)
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
            formData.append("is_group", true as any)

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
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={250}
            animationOutTiming={200}
        >
            <View style={styles.container}>
                {/* hitSlop={15} */}
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <ICONS.CloseModalIcon color={COLORS.black} width={12} height={12} />
                </TouchableOpacity>

                <Text style={styles.title}>Нова група</Text>

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
                        {avatarUri ? (
                            <Image 
                                source={{ uri: avatarUri }} 
                                style={{ width: 46, height: 46, borderRadius: 100 }} 
                            />
                        ) : (
                            <View style={[styles.avatar, { width: 46, height: 46, borderRadius: 30, backgroundColor: COLORS.plum, justifyContent: "center", alignItems: "center" }]}>
                                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>
                                    {groupName ? groupName[0].toUpperCase() : "NG"}
                                </Text>
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
                        data={chosenFriends}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ width: '100%' }}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const userAvatarUri = item.profile_app_profile.avatar
                                ? `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.profile_app_profile.avatar}`
                                : null;

                            return (
                                <View style={[styles.friendRow, { justifyContent: "space-between" }]}>
                                    <View style={styles.friendInfo}>
                                        {userAvatarUri ? (
                                            <Image source={{ uri: userAvatarUri }} style={styles.avatar} />
                                        ) : (
                                            <View style={[styles.avatar, styles.placeholderAvatar, { backgroundColor: COLORS.lightestGray }]}>
                                                <Text style={[styles.placeholderText, { color: COLORS.gray }]}>
                                                    {item.first_name ? item.first_name[0].toUpperCase() : "U"}
                                                </Text>
                                            </View>
                                        )}
                                        <Text style={[styles.friendName, { color: COLORS.black }]}>
                                            {item.first_name} {item.last_name}
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
                    {/* <TouchableOpacity style={[styles.btn, styles.btnCancel, { backgroundColor: COLORS.lightestGray }]} onPress={onBackStep}>
                        <Text style={{ color: COLORS.gray }}>Назад</Text>
                    </TouchableOpacity> */}
                    <Button 
                        variant="white"
                        text="Назад"
                        onPress={onBackStep}
                    />

                    <Button 
                        variant="purple"
                        text="Створити групу"
                        onPress={handleCreateGroupSubmit}
                        disabled={!groupName.trim() || selectedUserIds.length === 0 || isCreating}
                    />
                                                            
                    {/* <TouchableOpacity 
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
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
}