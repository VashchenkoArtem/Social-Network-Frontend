import React, { useContext } from "react";
import { View, Text, Modal } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Props } from "./types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "@modules/auth/context/user-context";


interface detailsFormData {
    pseudonym: string;
    username: string;
}

export function WelcomeDetailsModal({ isVisible, onClose }: Props) {
    const { user } = useContext(UserContext)!;
    const { handleSubmit, control } = useForm<detailsFormData>();
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

    const handleConfirm = async (data: detailsFormData) => {
        const cleanPseudonym = data.pseudonym?.trim();
        let cleanUsername = data.username?.trim();
        
        if (cleanUsername?.startsWith("@")) {
            cleanUsername = cleanUsername.slice(1);
        
        if (!cleanUsername || !cleanPseudonym) {
            return;
        }
        
        try {
            await updateUser({
                pseudonym: cleanPseudonym,
                username: cleanUsername,
            }).unwrap();
            
            onClose();
        } catch (error) {
            console.error("Не вдалося оновити дані:", error);
        }
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.modalCard}>
                        <Text style={styles.title}>Додай деталі про себе</Text>

                        <View style={styles.inputGap}>
                            <Controller
                                name="pseudonym"
                                control={control}
                                defaultValue={user?.profile_app_profile?.pseudonym ?? ""}
                                render={({ field }) => (
                                    <Input
                                        label="Псевдонім автора"
                                        placeholder="Введіть Псевдонім автора"
                                        onChangeText={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />

                            <Controller
                                name="username"
                                control={control}
                                defaultValue={user?.username ?? ""}
                                render={({ field }) => (
                                    <Input
                                        label="Ім’я користувача"
                                        placeholder="@"
                                        onChangeText={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                        </View>

                        <Text style={styles.hint}>
                            Або оберіть:{" "}
                            <Text style={styles.highlight}>
                                (Запропоновані варіанти відповідно до Ім’я та Прізвища)
                            </Text>
                        </Text>

                        <View style={styles.footer}>
                            <Button
                                variant="purple"
                                text={isLoading ? "..." : "Продовжити"}
                                onPress={handleSubmit(handleConfirm)}
                                disabled={isLoading}
                                style={styles.button}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
}}