import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, SectionList, Image, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { useGetAllFriendsQuery } from "@modules/friends/api/friendsApi"; 
import { Input } from "@shared/ui/input"; 
import { COLORS } from "@shared/constants/colors";
import { SERVER } from "@shared/constants/server";
import { styles } from "./styles"; 
import { FriendRequest } from "@modules/friends/api/api.types";
import { ICONS } from "@shared/ui/icons/icons";
import { SearchIcon } from "@shared/ui/icons/inputs";
import { Button } from "@shared/ui/button";
import { getAvatar } from "@shared/utils/avatar";

interface ISelectParticipantsModalProps {
    visible: boolean;
    onClose: () => void;
    selectedUserIds: number[];
    onToggleSelectFriend: (userId: number) => void;
    onNextStep: () => void;
}

type FriendProfileType = FriendRequest["user_app_user_user_app_friendship_to_user_idTouser_app_user"];

interface IFriendSection {
    title: string;
    data: FriendProfileType[];
}

export function SelectParticipantsModal({ 
    visible, 
    onClose, 
    selectedUserIds, 
    onToggleSelectFriend, 
    onNextStep 
}: ISelectParticipantsModalProps) {
    const { data: friendsRequests = [], isLoading: isFriendsLoading } = useGetAllFriendsQuery();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const friends = useMemo(() => {
        return friendsRequests.map((request) => request);
    }, [friendsRequests]);
    const sections = useMemo<IFriendSection[]>(() => {
        const filteredFriends = friends.filter((friend) => {
            const pseudonym =
                friend.user.profile_app_profile?.pseudonym?.toLowerCase() || "";

            return pseudonym.includes(searchQuery.toLowerCase());
        });

        const groups: Record<string, FriendProfileType[]> = {};

        filteredFriends.forEach((friend) => {
            const pseudonym =
                friend.user.profile_app_profile?.pseudonym || "U";

            const firstLetter = pseudonym[0].toUpperCase();
            if (!groups[firstLetter]) groups[firstLetter] = [];
            groups[firstLetter].push(friend.user);
        });

        return Object.keys(groups)
            .sort((elementA, elementB) =>
                elementA.localeCompare(elementB, "uk")
            )
            .map((letter) => ({
                title: letter,
                data: groups[letter].sort((friendA, friendB) => {
                    const nameA = friendA.profile_app_profile?.pseudonym || "";
                    const nameB = friendB.profile_app_profile?.pseudonym || "";

                    return nameA.localeCompare(nameB, "uk");
                }),
            }));
    }, [friends, searchQuery]);

    const renderItem = ({ item }: { item: FriendProfileType }) => {
        const isSelected = selectedUserIds.includes(item.id);

        return (
            <TouchableOpacity 
                style={styles.friendRow} 
                onPress={() => onToggleSelectFriend(item.id)}
                activeOpacity={0.7}
            >
                <View style={styles.friendInfo}>
                    <Image source={{ uri: item.profile_app_profile.avatar ? item.profile_app_profile.avatar : getAvatar(item.profile_app_profile.avatar) }} style={styles.avatar} />
                    <Text style={styles.friendName}>
                        {item.profile_app_profile.pseudonym}
                    </Text>
                </View>
                
                {/* , isSelected && styles.checkboxSelected */}
                <View style={[styles.checkbox]}>
                    {isSelected && <Text style={styles.checkboxCheckmark}>✓</Text>}
                </View>
            </TouchableOpacity>
        );
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

                <Text style={styles.title}>Нова група</Text>

                <Input
                    placeholder="Пошук"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    iconLeft={<SearchIcon color={COLORS.gray} width={16} height={16} />}
                    variant="primary"
                />

                <Text style={styles.selectedCount}>Вибрано: {selectedUserIds.length}</Text>

                {isFriendsLoading ? (
                    <ActivityIndicator size="large" color={COLORS.plum} style={{ flex: 1 }} />
                ) : (
                    <SectionList
                        sections={sections}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        renderSectionHeader={({ section }) => (
                            <View style={styles.sectionHeaderContainer}>
                                <Text style={styles.sectionHeader}>{section.title}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        // contentContainerStyle={{ paddingBottom: 16 }}
                    />
                )}

                <View style={styles.footerRow}>
                    {/* <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                        <Text style={styles.btnCancelText}>Скасувати</Text>
                    </TouchableOpacity> */}

                    <Button
                        variant='white'
                        text="Скасувати"
                        onPress={onClose}
                    />

                    <Button 
                        variant="purple"
                        text="Далі"
                        onPress={onNextStep}
                        disabled={selectedUserIds.length === 0}
                    />
                    
                    {/* <TouchableOpacity 
                        style={[styles.btn, styles.btnNext, selectedUserIds.length === 0 && styles.btnDisabled]} 
                        onPress={onNextStep}
                        disabled={selectedUserIds.length === 0}
                    >
                        <Text style={styles.btnNextText}>Далі</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
}