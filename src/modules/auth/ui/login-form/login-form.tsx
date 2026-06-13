import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "@modules/auth/models/lib/login.validation";
import { Modal } from "@shared/ui/modal";
import { Redirect, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ILoginForm } from "@modules/auth/models/types/login.types";
import { useContext } from "react";
import { useLoginMutation } from "@modules/auth/api/userApi";
import { UserContext } from "@modules/auth/context/user-context";
import { ErrorIcon } from "@shared/ui/icons/urls/ErrorIcon";
import { COLORS } from "@shared/constants/colors";
import { ActivityIndicator } from "react-native-paper";

export function LoginForm() {
	const { user } = useContext(UserContext)!;
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: yupResolver(loginValidator),
	});
	const { setUpdatedToken } = useContext(UserContext)!;
	const [login, { isLoading }] = useLoginMutation();
	const router = useRouter();
	async function onSubmit(formData: ILoginForm) {
		try {
			// const { data } = await login(formData);
			const data = await login(formData).unwrap()
			if (data && data.token) {
				setUpdatedToken(data.token);
				router.push({ pathname: "/(tabs)/home" });
			}
		} catch (error: any) {
			setError('root', {
				type: 'server',
				message: error?.data?.message || 'Невірна пошта або пароль. Спробуйте ще раз.'
			})
		}
	}
	if (user) {
		return <Redirect href="/(tabs)/home" />;
	}
	return (
		<KeyboardAwareScrollView
			bottomOffset={120}
			extraKeyboardSpace={20}
			style={styles.container}
			contentContainerStyle={{ justifyContent: "center" }}
		>
			<Modal style={{ paddingTop: 115 }} ifLogin={true} selectedTab="login">
				<Text style={styles.modalTitle}>Раді тебе знову бачити!</Text>

				<View style={styles.formContainer}>
					<View style={styles.formFields}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="you@example.com"
									inputMode="email"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									label="Електронна пошта"
									value={field.value}
									onChangeText={field.onChange}
									error={errors.email?.message}
								/>
							)}
						/>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="Введи пароль"
									label="Пароль"
									isPassword
									value={field.value}
									onChangeText={field.onChange}
									error={errors.password?.message}
								/>
							)}
						/>
					</View>
				</View>

				<Button
					variant={"purple"}
					text={isLoading ? '' : "Увійти"}
					style={[styles.button, styles.purple]}
					onPress={handleSubmit(onSubmit)}
					disabled={isLoading}
					iconLeft={ isLoading && <ActivityIndicator animating={true} color={COLORS.foggy}/> }
				/>

				{errors.root && (
					<View style={styles.errorContainer}>
						<ErrorIcon color={COLORS.red} width={14} height={14}/>
						<Text style={styles.errorMessage}>{errors.root.message}</Text>
					</View>
				)}
			</Modal>
		</KeyboardAwareScrollView>
	);
}
