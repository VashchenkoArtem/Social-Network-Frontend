import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Modal } from "@shared/ui/modal";
import { styles } from "./styles";
import { useRegistration } from "@modules/useRegistration";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginSchema } from "@shared/ui/input/validation";
import * as yup from "yup";


export function RegistrationStepOne() {
    const router = useRouter();
    const { register, isSubmitting } = useRegistration();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleRegister = async () => {
        setErrors({});
        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Паролі не збігаються" }));
            return;
        }

        try {
            await loginSchema.validate({ email, password }, { abortEarly: false });
            await register({
                email,
                password,
            });
            router.push({
                pathname: "/verify",
                params: { email, password }
            });

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            } else {
                Alert.alert("Помилка", err instanceof Error ? err.message : "Щось пішло не так");
            }
        }
    };

    return (
        <SafeAreaView>
            <View style={[{ paddingTop: 39, paddingHorizontal: 16 }]}>
                <Modal ifLogin={true}>
                    <Text style={styles.modalTitle}>Приєднуйся до World IT</Text>
                    
                    <View style={{ width: '100%', gap: 15 }}>
                        <Input 
                            placeholder="you@example.com" 
                            name="email"
                            error={errors.email}
                            label="Електронна пошта" 
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input 
                            placeholder="Введи пароль"
                            name="password"
                            error={errors.password}
                            label="Пароль" 
                            isPassword={true} 
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Input
                            placeholder="Повтори пароль"
                            name="confirmPassword"
                            error={errors.confirmPassword}
                            label="Підтверди пароль"
                            isPassword={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <Button
                        variant={"purple"}
                        text={isSubmitting ? "Надсилаємо код..." : "Створити акаунт"}
                        style={[styles.button, styles.purple]}
                        onPress={handleRegister}
                        disabled={isSubmitting}
                    />
                </Modal>
            </View>
        </SafeAreaView>
    );
}