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
import { COLORS } from "@shared/constants/colors";
import { ActivityIndicator } from "react-native-paper";
import { ErrorIcon } from "../icons/urls/ErrorIcon";


interface detailsFormData {
    pseudonym: string;
    username: string;
}

export function WelcomeDetailsModal({ isVisible, onClose }: Props) {
    const { user } = useContext(UserContext)!;
    const { handleSubmit, control, setError, formState: { errors } } = useForm<detailsFormData>();
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

    const handleConfirm = async (data: detailsFormData) => {
        const cleanPseudonym = data.pseudonym?.trim();
        let cleanUsername = data.username?.trim();
        
        if (cleanUsername?.startsWith("@")) {
            cleanUsername = cleanUsername.slice(1);
        }
        
        if (!cleanUsername || !cleanPseudonym) {
            return;
        }
        
        try {
            await updateUser({
                pseudonym: cleanPseudonym,
                username: cleanUsername,
            }).unwrap()
            
            onClose()
        } catch (error: any) {
			setError('root', {
				type: 'server',
				message: error?.data?.message || 'Не вдалося оновити дані. Спробуйте ще раз.'
			})
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
                                        error={errors.pseudonym?.message}
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
                                        error={errors.username?.message}
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
                                text={isLoading ? "" : "Продовжити"}
                                onPress={handleSubmit(handleConfirm)}
                                disabled={isLoading}
                                style={styles.button}
                                iconLeft={ isLoading && <ActivityIndicator animating={true} color={COLORS.foggy}/> }
                            />
                        </View>

                        {errors.root && (
                            <View style={styles.errorContainer}>
                                <ErrorIcon color={COLORS.red} width={14} height={14}/>
                                <Text style={styles.errorMessage}>{errors.root.message}</Text>
                            </View>
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
}