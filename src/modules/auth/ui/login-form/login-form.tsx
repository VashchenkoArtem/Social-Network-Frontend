import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "@modules/auth/models/lib/login.validation";
import { Modal } from "@shared/ui/modal";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ILoginForm } from "@modules/auth/models/types/login.types";
import { useContext } from "react";
import { UserContext } from "@shared/context/user-context";

export function LoginForm() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: yupResolver(loginValidator),
	});

	const { loginUser } = useContext(UserContext)!;
	const router = useRouter();

	async function onSubmit(data: ILoginForm) {
		loginUser(data);
		router.push({ pathname: "/(tabs)/home", params: { name: data.email } });
	}

	return (
		<KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
			<View style={styles.container}>
				<Modal ifLogin={true} selectedTab="login">
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
		</KeyboardAwareScrollView>
	);
}
