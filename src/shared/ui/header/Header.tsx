import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { LogoIcon, PlusIcon, ManageIcon } from "../icons/buttons";
import { ExitIcon } from "../icons/buttons/ExitIcon";
import { styles } from "./styles";
import { Button } from "../button";
import { COLORS } from "@shared/constants/colors";
import { HeaderProps } from "./types";
import { push } from "expo-router/build/global-state/routing";
import { Link, usePathname } from "expo-router";
import { Url } from "../url";
import { FriendsPageIcon } from "../icons/urls/FriendsPageIcon";
import { constStyles } from "@shared/constants/styles";
import { ChatsPageIcon } from "../icons/urls/ChatsPageIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { ICONS } from "../icons/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@modules/auth/context/user-context";
import { CreatePostForm } from "@modules/posts/ui/create-post-form";
import { CreateAlbumDto, useCreateAlbumMutation } from "@modules/settings/api/albumApi";
import { AlbumsModal } from "../albumsModal/AlbumsModal";
import { GroupChats } from "@modules/chats/ui/groupChats/GroupChats";
import { CreateGroupModals } from "@modules/chats/ui/CreateGroupModals/CreateGroupModals"; 

export function Header(props: HeaderProps) {
    const { cantCreatePost, cantEditSelf, isLogin, canCreateAlbum, canCreateChat } = props;
    const { user, logout } = useContext(UserContext)!;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createAlbum] = useCreateAlbumMutation();
    
    async function handleSave(data: CreateAlbumDto) {
        await createAlbum({
            name: data.name,
            theme: data.theme,
            year: data.year
        });
        
        setIsCreateModalOpen(false);
    }

    if ( isLogin ) {
        return (
            <View style={[styles.header, styles.headerLogin]}>
                <Link href="/home">
                    <LogoIcon color={COLORS.plum} width={145} height={18} />
                </Link>
            </View>
        );
    }
    
    // const isGroupChatsPage = pathname.includes("chats") || pathname.includes("group");

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white }} edges={['top']}>
            <View style={styles.header}>
                <Link href="/home">
                    <LogoIcon color={COLORS.plum} width={145} height={18} />
                </Link>

                <View style={styles.buttons}>
                    {!cantCreatePost && (
                        <>
                            <Button
                                variant="white"
                                iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
                                onPress={() => setIsCreateModalOpen(true)}
                            />
                            {canCreateAlbum ? (
                                <AlbumsModal
                                    visible={isCreateModalOpen}
                                    onClose={() => setIsCreateModalOpen(false)}
                                    onSubmit={handleSave}
                                />
                            ) : canCreateChat ? (
                                <CreateGroupModals
                                    visible={isCreateModalOpen}
                                    onClose={() => setIsCreateModalOpen(false)}
                                />
                            ) : (
                                <Modal
                                    isVisible={isCreateModalOpen}
                                    onBackdropPress={() => setIsCreateModalOpen(false)}
                                    onSwipeComplete={() => setIsCreateModalOpen(false)}
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
                                    <View style={styles.container}>
                                        <View style={styles.closeModalContainer}>
                                            <TouchableOpacity onPress={() => setIsCreateModalOpen(false)} hitSlop={15}>
                                                <Text style={styles.closeIcon}>✕</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <CreatePostForm setIsCreatePostModalOpen={setIsCreateModalOpen}></CreatePostForm>
                                    </View>
                                </Modal>
                            )}
                        </>
                    )}

                    {!cantEditSelf && (
                        <Button
                            variant="white"
                            iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
                            onPress={() => push("/settings")}
                            href="/settings"
                            isSettings={true}
                        />
                    )}

                    <Button
                        variant="white"
                        iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
                        onPress={() => {
                            if (user) {
                                logout();
                            }
                        }}
                        href="/login"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}