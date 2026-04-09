import { Modal, Text, View } from "react-native";
import { useContext, useState } from "react";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { EditIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";
import { SignatureEditor } from "@shared/ui/signatureEditor";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { UserContext } from "@shared/context/user-context"; 
import { useUpdateUserInfoMutation } from "./../../../auth/api/userApi"
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
    const [isModalVisible, setModalVisible] = useState(false);
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation()
    const { user } = useContext(UserContext)!;
    const [selectedType, setSelectedType] = useState<'alias' | 'signature'>(
        user?.signature ? 'signature' : 'alias'
);
    if (!user)return null
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty }
    } = useForm<FormData>();
    const handleSaveSignature = async (base64: string) => {
        try {
            await updateUser({ signature: base64 }).unwrap();
            setSelectedType('signature');
            setModalVisible(false);
        } catch (err) {
            console.error("Error saving signature", err);
        }

    };
    const onSubmit = async (data: FormData) => {
        try {
            const payload = {
            firstname: data.firstname,
            lastname: data.lastname,
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            ...(data.newPassword && { newPassword: data.newPassword }),
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined
        };
            await updateUser(payload).unwrap();
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
                            <Text style={styles.headerBlockText}>Картка профілю</Text>

                            <Button
                                variant={"white"}
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                text={isEditingProfile ? "Зберегти" : ""}
                                onPress={handleEditProfilePress}
                                isSettings={true}
                                isBackgroundColor="preWhite"
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
                            <Text style={styles.headerBlockText}>Особиста інформація</Text>

                            <Button 
                                variant={"white"}
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                text={isEditingPersonalInfo ? "Зберегти" : ""}
                                onPress={handleEditPersonalInfoPress}
                                isSettings={true}
                                isBackgroundColor="preWhite"

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
                    
                    <View style={styles.signatureBlock}>
                        <View style={styles.headerBlock}>
                            <Text style={styles.signatureTitle}>Варіанти підпису</Text>
                            <Button
                                variant="white"
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                isSettings={true}
                                onPress={() => setModalVisible(true)}
                                isBackgroundColor="preWhite"
                            />
                        </View>
                        <View style={styles.signatureOptions}>
                            <TouchableOpacity 
                                style={styles.checkboxRow} 
                                onPress={() => setSelectedType('alias')}
                            >
                                <View style={selectedType === 'alias' ? styles.customCheckboxActive : styles.customCheckbox}>
                                    {selectedType === 'alias' && <View style={styles.checkboxInner} />}
                                </View>
                                <Text style={styles.checkboxLabel}>Псевдонім автора</Text>
                            </TouchableOpacity>
                            <Text style={styles.signatureTextPreview}>{user?.firstname} {user?.lastname}</Text>
                            <TouchableOpacity 
                                style={styles.checkboxRow} 
                                onPress={() => {
                                    if (!user?.signature) {
                                        setModalVisible(true);
                                    } else {
                                        setSelectedType('signature');
                                    }
                                }}
                            >
                                <View style={selectedType === 'signature' ? styles.customCheckboxActive : styles.customCheckbox}>
                                    {selectedType === 'signature' && <View style={styles.checkboxInner} />}
                                </View>
                                <Text style={styles.checkboxLabel}>Мій електронний підпис</Text>
                            </TouchableOpacity>

                            {user?.signature ? (
                                <View style={styles.signatureImageWrapper}>
                                    <Image source={{ uri: user.signature }} style={styles.signatureImage} />
                                </View>
                            ) : (
                                <Text style={[styles.noSignatureText, { marginLeft: 34 }]}>Підпис не додано</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
                    <TouchableOpacity 
                        onPress={() => setModalVisible(false)} 
                        style={{ 
                            paddingHorizontal: 20, 
                            paddingVertical: 10, 
                            alignSelf: 'flex-end',
                            marginBottom: 10
                        }}
                    >
                        <Text style={{ 
                            color: COLORS.plum,
                            fontSize: 18, 
                            fontWeight: '700' 
                        }}>
                            Закрити
                        </Text>
                    </TouchableOpacity>
                    
                    <SignatureEditor 
                        onOK={handleSaveSignature} 
                        onClear={() => console.log('Canvas cleared')} 
                    />
                </View>
            </Modal>

        </KeyboardAwareScrollView>
    );
}