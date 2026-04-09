import { Text, View } from "react-native";
import { useState } from "react";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { EditIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";
import { useUpdateUserMutation } from "@shared/api/baseApi";

type FormData = {
    name: string;
    birthDate: string;
    email: string;
    password: string;
    newPassword?: string;
    confirmPassword?: string;
}

export function PersonalInformation() {
    const [isEditing, setIsEditing] = useState(false)
    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty }
    } = useForm<FormData>({
        defaultValues: {
            name: "Li",
            birthDate: "2001-04-15",
            email: "you@example.com",
            password: "******",
            newPassword: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await updateUser(data).unwrap()
            reset(data)
            setIsEditing(false)
        } catch (error) {
            console.log("error:", error);
        }
    };

    const handleEditPress = () => {
        if (isEditing) {
            if (isDirty) {
                handleSubmit(onSubmit)()
            } else {
                setIsEditing(false)
            }
        } else {
            setIsEditing(true)
        }
    };

    return (
        <KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
            <ScrollView>
                <View style={styles.personalInformationContainer}>

                    {/* PROFILE CARD */}
                    <View style={styles.profileCardBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Картка профілю</Text>

                            <Button
                                variant={"white"}
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                text={isEditing ? "Зберегти" : ""}
                                onPress={handleEditPress}
                                isSettings={true}
                                style={[styles.button, styles.white]}
                            />
                        </View>

                        <View style={styles.profileCardAvatarBlock}>
                            {isEditing && (
                                <Text>Оберіть або завантажте фото профілю</Text>
                            )}

                            <Text style={styles.name}>Name lastname</Text>
                            <Text style={styles.username}>@username</Text>

                            {isEditing && (
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Ім'я користувача"
                                            placeholder="@username"
                                            value={field.value}
                                            onChangeText={field.onChange}
                                        />
                                    )}
                                />
                            )}
                        </View>
                    </View>

                    {/* PERSONAL INFF */}
                    <View style={styles.personalInformationBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Особиста інформація</Text>
                        </View>

                        <View
                            style={[
                                styles.personalInformationFormBlock,
                                { opacity: isEditing ? 1 : 0.5 },
                            ]}
                        >
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Ім'я та прізвище"
                                        placeholder="Ім'я"
                                        editable={isEditing}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />

                            <Controller
                                name="birthDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Дата народження"
                                        placeholder="15.04.2001"
                                        editable={isEditing}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Електронна пошта"
                                        placeholder="you@example.com"
                                        keyboardType="email-address"
                                        editable={isEditing}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Пароль"
                                        placeholder="****"
                                        isPassword={true}
                                        editable={isEditing}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    {/* PASSRORD */}
                    <View style={styles.personalInformationBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Пароль</Text>
                        </View>

                        <View
                            style={[
                                styles.personalInformationFormBlock,
                                { opacity: isEditing ? 1 : 0.5 },
                            ]}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Поточний пароль"
                                        placeholder="******"
                                        isPassword={true}
                                        editable={false}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />

                            {isEditing && (
                                <>
                                    <Controller
                                        name="newPassword"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Новий пароль"
                                                placeholder="Введи новий пароль"
                                                isPassword={true}
                                                editable={true}
                                                value={field.value}
                                                onChangeText={field.onChange}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Підтвердження пароля"
                                                placeholder="Повтори пароль"
                                                isPassword={true}
                                                editable={true}
                                                value={field.value}
                                                onChangeText={field.onChange}
                                            />
                                        )}
                                    />
                                </>
                            )}
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}