import React, { useContext, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Props } from "./types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "@modules/auth/context/user-context";

interface detailsFormData {
	alias: string | null;
	nickname: string | null;
}

export function WelcomeDetailsModal({ isVisible, onClose }: Props) {
	const { user } = useContext(UserContext)!;
	const { handleSubmit, control } = useForm<detailsFormData>();
	const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

	const handleConfirm = async (data: detailsFormData) => {
		const cleanAlias = data.alias?.trim();
		let cleanNickname = data.nickname?.trim();
		if (cleanNickname?.startsWith("@")) {
			cleanNickname = cleanNickname.split("@")[1];
		}
		try {
			await updateUser({
				alias: cleanAlias,
				nickname: cleanNickname,
			}).unwrap();
			console.log("asdasdada");
			onClose();
		} catch (err) {
			console.log(err);
			onClose();
		}
	};
	if (!user?.alias || !user?.nickname) {
		return (
			<Modal
				visible={isVisible}
				transparent={true}
				animationType="fade"
				statusBarTranslucent
			>
				<View style={styles.overlay}>
					<KeyboardAwareScrollView
						contentContainerStyle={styles.scrollContainer}
						keyboardShouldPersistTaps="handled"
					>
						<View style={styles.modalCard}>
							<Text style={styles.title}>Додай деталі про себе</Text>

							<View style={styles.inputGap}>
								<Controller
									name="alias"
									control={control}
									defaultValue={user?.alias ?? ""}
									render={({ field }) => (
										<Input
											label="Псевдонім автора"
											placeholder="Введіть Псевдонім автора"
											onChangeText={field.onChange}
										/>
									)}
								/>

								<Controller
									name="nickname"
									control={control}
									defaultValue={user?.nickname ?? ""}
									render={({ field }) => (
										<Input
											label="Ім’я користувача"
											placeholder="@"
											onChangeText={field.onChange}
										/>
									)}
								/>
							</View>

							<Text style={styles.hint}>
								Або оберіть:{" "}
								<Text style={styles.highlight}>
									(Запропоновані варіанти відповідно до Ім’я та Прізвища)
								</Text>
							</Text>

							<View style={styles.footer}>
								<Button
									variant="purple"
									text={isLoading ? "..." : "Продовжити"}
									onPress={handleSubmit(handleConfirm)}
									disabled={isLoading}
									style={styles.button}
								/>
							</View>
						</View>
					</KeyboardAwareScrollView>
				</View>
			</Modal>
		);
	}
}
