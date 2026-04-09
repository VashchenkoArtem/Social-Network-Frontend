import { Text, View } from "react-native";
import { useContext, useState } from "react";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { EditIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";
import { useUpdateUserMutation } from "@shared/api/baseApi";
import { UserContext } from "@shared/context/user-context"; 

type FormData = {
    firstname: string;
    lastname: string;
    nickname: string;
    birthDate: string;
    email: string;
    password: string;
    newPassword?: string;
    confirmPassword?: string;
}

export function PersonalInformation() {
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false)
    
    const [updateUser, { isLoading }] = useUpdateUserMutation()
    const { user } = useContext(UserContext)!;
    if (!user)return null
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await updateUser(data).unwrap()
            reset(data)
            setIsEditingProfile(false)
        } catch (error) {
            console.log("error:", error);
        }
    };

    const handleEditProfilePress = () => {
        if (isEditingProfile) {
            if (isDirty) {
                handleSubmit(onSubmit)()
            } else {
                setIsEditingProfile(false)
            }
        } else {
            setIsEditingProfile(true)
        }
    }

    const handleEditPersonalInfoPress = () => {
        if (isEditingPersonalInfo) {
            if (isDirty) {
                handleSubmit(onSubmit)()
            } else {
                setIsEditingPersonalInfo(false)
            }
        } else {
            setIsEditingPersonalInfo(true)
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
                                text={isEditingProfile ? "Зберегти" : ""}
                                onPress={handleEditProfilePress}
                                isSettings={true}
                            />
                        </View>

                        <View style={styles.profileCardAvatarBlock}>
                            {isEditingProfile && (
                                <Text>Оберіть або завантажте фото профілю</Text>
                            )}

                            

                            <Text style={styles.name}>{user.firstname} {user.lastname}</Text>
                            <Text style={styles.username}>@{user.nickname}</Text>

                            {isEditingProfile && (
                                <Controller
                                    name="nickname"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Ім'я користувача"
                                            placeholder=""
                                            defaultValue={user.nickname ? user.nickname : ""}
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

                            <Button
                                variant={"white"}
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                text={isEditingPersonalInfo ? "Зберегти" : ""}
                                onPress={handleEditPersonalInfoPress}
                                isSettings={true}
                            />
                        </View>

                        <View
                            style={[
                                styles.personalInformationFormBlock,
                                { opacity: isEditingPersonalInfo ? 1 : 0.5 },
                            ]}
                        >
                            <Controller
                                name="firstname"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Ім'я"
                                        placeholder=""
                                        editable={isEditingPersonalInfo}
                                        defaultValue={user.firstname ? user.firstname : ""}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="lastname"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Прізвище"
                                        placeholder=""
                                        editable={isEditingPersonalInfo}
                                        defaultValue={user.lastname ? user.lastname : ""}
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
                                        placeholder=''
                                        editable={isEditingPersonalInfo}
                                        defaultValue={user.birthDate ? user.birthDate :""}
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
                                        placeholder=""
                                        keyboardType="email-address"
                                        editable={isEditingPersonalInfo}
                                        defaultValue={user.email}
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
                                        placeholder=""
                                        isPassword={true}
                                        editable={isEditingPersonalInfo}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    {/* PASSRORD */}
                    {/* <View style={styles.personalInformationBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Пароль</Text>
                        </View>

                        <View
                            style={[
                                styles.personalInformationFormBlock,
                                { opacity: isEditingProfile ? 1 : 0.5 },
                            ]}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Поточний пароль"
                                        placeholder=""
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
                                                placeholder=""
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
                                                placeholder=""
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
                    </View> */}
                    
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}