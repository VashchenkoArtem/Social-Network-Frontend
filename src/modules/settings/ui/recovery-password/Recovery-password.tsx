import { IUser } from "@shared/types/user.types";
import { Modal } from "@shared/ui/modal";
import { OtpInput } from "@shared/ui/OptInput";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useFonts } from "expo-font";
import { Button } from "@shared/ui/button";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import {
	useSendCodeMutation,
	useUpdatePasswordMutation,
} from "@modules/auth/api/userApi";

export function RecoveryPassword(props: {
	user: IUser;
	isVisible: boolean;
	setIsVisible: (type: boolean) => void;
	password: string;
	setIsEditingPassword: (type: boolean) => void
}) {
	const [fullCode, setFullCode] = useState("");
	const [isVerifying, setIsVerifying] = useState();
	const [sendCode] = useSendCodeMutation();
	const [updatePassword] = useUpdatePasswordMutation();
	const { user, isVisible, setIsVisible, password, setIsEditingPassword } = props;
	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Regular": require("../../../../assets/fonts/GTWalsheimPro-Regular.ttf"),
	});
	const updatePasswordFunc = async () => {
		await updatePassword({ password: password });
		setIsVisible(false)
		setIsEditingPassword(false)
	};
	return (
		<View
			style={[
				styles.modalContainer,
				isVisible && { backgroundColor: "rgba(0,0,0,0.5)" },
			]}
		>
			<Modal
				visible={isVisible}
				onClose={() => setIsVisible(false)}
				style={styles.modal}
			>
				<View>
					<Text style={styles.modalTitle}>Підтвердження для зміни паролю</Text>
					<Text style={styles.subtitle}>
						Ми надіслали 6-значний код на вашу пошту ({user.email}). Введіть
						його нижче, щоб підтвердити акаунт
					</Text>
				</View>
				<View style={styles.inputsFrame}>
					<View>
						<Text style={styles.codeTitle}>Код підтвердження</Text>
						<OtpInput onCodeFilled={setFullCode} />
					</View>
					<View style={styles.buttonsContainer}>
						<Button
							variant="white"
							text="Скасувати"
							buttonStyle={{ width: 165, height: 40 }}
						/>
						<Button
							variant="purple"
							text="Підтвердити"
							buttonStyle={{ width: 165, height: 52 }}
							onPress={updatePasswordFunc}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
