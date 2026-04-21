import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { OtpInput } from "@shared/ui/OptInput";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useVerification } from "@shared/hooks/useVerification";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useRegistrationMutation } from "@modules/auth/api/userApi";
import { SerializedError } from "@reduxjs/toolkit/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserContext } from "@modules/auth/context/user-context";

export function RegistrationStepTwo() {
	const router = useRouter();
	const { setUpdatedToken } = useContext(UserContext)!;
	const { email, password } = useLocalSearchParams<{
		email: string;
		password: string;
	}>();
	const [fullCode, setFullCode] = useState("");
	const [register, { isLoading: isVerifying }] = useRegistrationMutation();
	const handleConfirm = async () => {
		if (fullCode.length < 6) {
			Alert.alert("Помилка", "Будь ласка, введіть повний код");
			return;
		}

		try {
			const result = await register({
				email,
				code: fullCode,
				password,
			}).unwrap();
			setUpdatedToken(result.token);
			router.replace({
				pathname: "/(tabs)/home",
				params: { isNewUser: "true" },
			});
		} catch (err) {
			const error = err as FetchBaseQueryError | SerializedError;
			let message = "Невірний код або користувач вже існує";

			if (error && "data" in error && typeof error.data === "string") {
				message = error.data;
			}

			Alert.alert("Помилка реєстрації", message);
		}
	};

	return (
		<KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
			<View style={styles.screen}>
				<View style={styles.card}>
					<Text style={styles.title}>Підтвердження пошти</Text>
					<Text style={styles.subtitle}>
						Ми надіслали код на{" "}
						<Text style={{ fontWeight: "bold" }}>{email}</Text>
					</Text>

					<OtpInput onCodeFilled={setFullCode} />

					<TouchableOpacity
						style={[styles.confirmButton, isVerifying && { opacity: 0.7 }]}
						onPress={handleConfirm}
						disabled={isVerifying}
					>
						<Text style={styles.buttonText}>
							{isVerifying ? "Перевірка..." : "Підтвердити"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.back()}>
						<Text style={styles.backText}>Назад</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
