import { Text, View } from "react-native";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from './styles'
import { EditIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";

export function PersonalInformation() {
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
                            <Text>Варіанти підпису</Text>

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
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>

    )
}