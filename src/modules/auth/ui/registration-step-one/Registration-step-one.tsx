import { View, Text, Alert } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Modal } from "@shared/ui/modal";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { RegForm } from "@modules/auth/models/types/registration.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { regValidator } from "@modules/auth/models/lib/registration.validation";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useContext } from "react";
import { useSendCodeMutation } from "@modules/auth/api/userApi";
import { UserContext } from "@modules/auth/context/user-context";
import { COLORS } from "@shared/constants/colors";
import { ErrorIcon } from "@shared/ui/icons/urls/ErrorIcon";
import { ActivityIndicator } from "react-native-paper";

export function RegistrationStepOne() {

	const router = useRouter();
	const [sendCode, { isLoading }] = useSendCodeMutation();
	const { user } = useContext(UserContext)!;
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<RegForm>({
		resolver: yupResolver(regValidator),
	});

	const onSubmit = async (data: RegForm) => {
		try {
			await sendCode({
				email: data.email,
				message: "Код підтвердження",
			}).unwrap();
			router.push({
				pathname: "/verify",
				params: { email: data.email, password: data.password },
			});
		} catch (error: any) {
			setError('root', {
				type: 'server',
				message: error?.data?.message || 'Не вдалося надіслати код. Спробуйте ще раз.'
			})
		}
	};
	if (user) {
		return <Redirect href="/(tabs)/home" />;
	}
	return (
		<KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
			<View style={styles.container}>
				<Modal ifLogin={true} selectedTab="registration">
					<Text style={styles.modalTitle}>Приєднуйся до World IT</Text>

					<View style={{ width: "100%", gap: 15 }}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="you@example.com"
									error={errors.email?.message}
									label="Електронна пошта"
									keyboardType="email-address"
									autoCapitalize="none"
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
									placeholder="Введи пароль"
									error={errors.password?.message}
									label="Пароль"
									isPassword={true}
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
									placeholder="Повтори пароль"
									error={errors.confirmPassword?.message}
									label="Підтверди пароль"
									isPassword={true}
									value={field.value}
									onChangeText={field.onChange}
								/>
							)}
						/>
					</View>

					<Button
						variant={"purple"}
						text={ isLoading ? '' : "Створити акаунт"}
						style={[styles.button, styles.purple]}
						onPress={handleSubmit(onSubmit)}
						iconLeft={ isLoading && <ActivityIndicator animating={true} color={COLORS.foggy}/> }
					/>

					{errors.root && (
						<View style={styles.errorContainer}>
							<ErrorIcon color={COLORS.red} width={14} height={14}/>
							<Text style={styles.errorMessage}>{errors.root.message}</Text>
						</View>
					)}
				</Modal>
			</View>
		</KeyboardAwareScrollView>
	);
}
