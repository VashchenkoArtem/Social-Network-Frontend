import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "@modules/auth/models/lib/login.validation";
import { Modal } from "@shared/ui/modal";
import { useLogin } from "@shared/hooks/useLogin";
import { useRouter } from "expo-router";


interface LoginForm {
	email: string
	password: string
}


export function LoginForm() {
    const { handleSubmit, control } = useForm<LoginForm>({resolver: yupResolver(loginValidator)})
    const { loginUser } = useLogin();
    const router = useRouter();
    async function onSubmit (data: LoginForm){
        loginUser(data)
        router.push("/(tabs)/home")
	}

    return (
        <View style={styles.container}>
            <Modal ifLogin={true} selectedTab="login">
                <Text style={styles.modalTitle}>Раді тебе знову бачити!</Text>

                <View style={styles.formContainer}>
                    <View style={styles.formFields}>
                    <Controller
                        name="email"
                        control={control}
                        render={({field, fieldState}) => {
                            
                            return <Input
                                onChangeText={field.onChange}
                                placeholder="you@example.com"
                                inputMode="email"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                label="Електронна пошта"
                                {...field}
                            />
                        }}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                placeholder="Введи пароль"
                                label="Пароль"
                                isPassword
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                </View>
                </View>

                <Button
                    variant={"purple"}
                    text="Увійти"
                    style={[styles.button, styles.purple]}
                    onPress={handleSubmit(onSubmit)}
                />
                
                <View style={styles.modalQRtextContainer}>
                    <View style={styles.line} />
                    
                    <Text style={styles.text}>
                        або увійдіть за допомогою QR-коду
                    </Text>
                    
                    <View style={styles.line} />
                </View>

            </Modal>
        </View>
    )
}
