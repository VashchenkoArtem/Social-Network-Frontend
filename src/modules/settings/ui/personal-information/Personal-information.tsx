import { Modal, Text, View } from "react-native";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from './styles'
import { EditIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { useState } from "react";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU/ModalUIU";
import { SignatureEditor } from "@shared/ui/signatureEditor";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function PersonalInformation() {
    const user = { 
        firstname: "Lina", 
        lastname: "Li", 
        nickname: "@username", 
        signature: null
    };
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
    const [selectedType, setSelectedType] = useState<'alias' | 'signature'>(
        user?.signature ? 'signature' : 'alias'
    );
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSaveSignature = async (base64: string) => {
        try {
            await updateUser({ signature: base64 }).unwrap();
            setSelectedType('signature');
            setModalVisible(false);
        } catch (err) {
            console.error("Error saving signature", err);
        }
    };
    return (
        <KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
            <ScrollView>
                <View style={styles.personalInformationContainer}>
                    <View style={styles.profileCardBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Картка профілю</Text>

                            <Button
                                variant={"white"}
                                iconLeft={<EditIcon color = {COLORS.plum}/>}
                                isSettings={true}
                                style={[styles.button, styles.white]}
                            />
                        </View>

                        <View style={styles.profileCardAvatarBlock}>
                            <Text style={styles.name}>Name lastname</Text>
                            <Text style={styles.username}>@username</Text>
                        </View>
                    </View>


                    <View style={styles.personalInformationBlock}>
                        <View style={styles.headerBlock}>
                            <Text>Особиста інформація</Text>

                            <Button
                                variant={"white"}
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                isSettings={true}
                                style={[styles.button, styles.white]}
                            />
                        </View>

                        <View style={styles.personalInformationFormBlock}>
                            {/* <Controller
                                name="email"
                                control={control}
                                render={({ field }) => ( */}
                                    <Input
                                        placeholder="lI"
                                        // error={errors.name?.message}
                                        label="Ім'я та прізвище"
                                        // keyboardType="name"
                                        autoCapitalize="none"
                                        // value={field.value}
                                        // onChangeText={field.onChange}
                                    />
                                {/* )}
                                > */}

                            {/* <Controller
                                render={({ field }) => ( */}
                                    <Input
                                        placeholder="15.04.2001"
                                        // error={errors.birthDate?.message}
                                        label="Дата народження"
                                        // keyboardType="birth-date"
                                        autoCapitalize="none"
                                        // value={field.value}
                                        // onChangeText={field.onChange}
                                    />
                                {/* )}
                            /> */}

                            <View style={styles.editPasswordBlock}>
                                <Text>Пароль</Text>
                                <Button
                                    variant={"white"}
                                    iconLeft={<EditIcon color={COLORS.plum} />}
                                    isSettings={true}
                                    style={[styles.button, styles.white]}
                                />
                            </View>

                            {/* <Controller 
                                render={({ field }) => ( */}
                                    <Input
                                        placeholder="you@example.com"
                                        // error={errors.email?.message}
                                        label="Електронна пошта"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        // value={field.value}
                                        // onChangeText={field.onChange}
                                    />
                                {/* )}
                            /> */}

                            {/* <Controller
                                name="password"
                                control={control}
                                render={({ field }) => ( */}
                                    <Input
                                        placeholder="Введи пароль"
                                        // error={errors.password?.message}
                                        label="Пароль"
                                        isPassword={true}
                                        // value={field.value}
                                        // onChangeText={field.onChange}
                                    />
                                {/* )}
                            /> */}
                        </View>
                    </View>
                    
                    <View style={styles.signatureBlock}>
                        <View style={styles.headerBlock}>
                            <Text style={styles.signatureTitle}>Варіанти підпису</Text>
                            <Button
                                variant="white"
                                iconLeft={<EditIcon color={COLORS.plum} />}
                                isSettings={true}
                                style={[styles.button, styles.white]}
                                onPress={() => setModalVisible(true)}
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

    )
}