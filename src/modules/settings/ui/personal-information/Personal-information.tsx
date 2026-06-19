import { ActivityIndicator, Text, View } from "react-native";
import { useContext, useState } from "react";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { EditIcon, PlusIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { SignatureEditor } from "@shared/ui/signatureEditor";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from 'axios';
import {
	useSendCodeMutation,
	useUpdateUserInfoMutation,
	useUpdateUserSignatureMutation,
} from "./../../../auth/api/userApi";
import { AvatarField } from "../avatar-field/Avatar-Field";
import { MyPostsPageIcon } from "@shared/ui/icons/urls/MyPostsPageIcon";
import { Modal } from "@shared/ui/modal";
import { RecoveryPassword } from "../recovery-password/Recovery-password";
import { UserContext } from "@modules/auth/context/user-context";
import { Redirect } from "expo-router";
import { SERVER } from "@shared/constants/server";
import * as ImagePicker from "expo-image-picker";
import { ProfileData, ReactNativeFile } from "@modules/auth/api/api.types"; 
import { FONTS } from "@shared/constants/fonts";
import { ErrorIcon } from "@shared/ui/icons/urls/ErrorIcon";
import { socket } from "@shared/socket/socket";


type FormData = {
	first_name: string;
	last_name: string;
	nickname: string;
	birthDate: string;
	email: string;
	password: string;
	newPassword?: string;
	confirmPassword?: string;
	avatar?: string;
};

const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    
    return `${day}.${month}.${year}`;
};

export function PersonalInformation() {
	const [isEditingSignature, setIsEditingSignature] = useState(false);
	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);
	const [ updateUserSignature ] = useUpdateUserSignatureMutation()
	const [sendCode] = useSendCodeMutation();
	const { user, token } = useContext(UserContext)!;
	const [isVisible, setIsVisible] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
	const [selectedType, setSelectedType] = useState<"alias" | "signature">(
		user?.profile_app_profile.signature ? "signature" : "alias",
	);
	const {
		control,
		handleSubmit,
		reset,
		watch,
		setError,
		formState: { isDirty, errors },
	} = useForm<FormData>({
		defaultValues: {
			first_name: user?.first_name || "",
			last_name: user?.last_name || "",
			nickname: user?.username || "",
			email: user?.email || "",
			birthDate: formatDateForInput(user?.profile_app_profile?.birth_date),
		},
	});
	if (!user) {
		return <Redirect href={"/login"}></Redirect>;
	}
	const passwordValue = watch("password");
	const handleSaveSignature = async (uri: string) => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();

		formData.append('signature', {
			uri: uri,
			name: 'signature.png',
			type: 'image/png',
		} as any);

		xhr.open('PATCH', `http://${SERVER.host}:${SERVER.port}/signature`);

		xhr.setRequestHeader('Authorization', `Bearer ${token}`);

		xhr.send(formData);
	};

	const onSubmit = async (data: FormData) => {
		try {
			const bodyFormData = new FormData();
			
			if (data.first_name) bodyFormData.append("first_name", data.first_name);
			if (data.last_name) bodyFormData.append("last_name", data.last_name);
			if (data.nickname) bodyFormData.append("username", data.nickname);
			if (data.birthDate) bodyFormData.append("birth_date", data.birthDate);
			if (data.email) bodyFormData.append("email", data.email);

			if (data.avatar) {
				const isLocalUri = data.avatar.startsWith('file') || data.avatar.startsWith('ph');
				if (isLocalUri) {
					bodyFormData.append('avatars', {
						uri: data.avatar,
						name: 'avatar.jpg',
						type: 'image/jpeg',
					} as any);
				}
			}

			await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				
				xhr.open('PATCH', `http://${SERVER.host}:${SERVER.port}/update-user`);
				xhr.setRequestHeader('Authorization', `Bearer ${token}`);
				xhr.onload = () => {
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(xhr.response);
					} else {
						try {
							const errorData = JSON.parse(xhr.responseText);
							reject(errorData);
						} catch {
							reject({ message: 'Помилка сервера' });
						}
					}
				};

				xhr.onerror = () => reject({ message: 'Мережева помилка' });
				
				xhr.send(bodyFormData);
			});

			reset(data); 
			setIsEditingProfile(false);
			setIsEditingPersonalInfo(false);
			console.log("Дані успішно збережено");

		} catch (error: any) {
			setError('root', {
				type: 'server',
				message: error?.message || 'Не вдалося зберегти дані. Спробуйте ще раз.'
			});
		}
	};

	const handleEditProfilePress = () => {
		if (isEditingProfile) {
			if (isDirty) {
				handleSubmit(onSubmit)();
			} else {
				setIsEditingProfile(false);
			}
		} else {
			setIsEditingProfile(true);
		}
	};
	const handleEditPasswordPress = async () => {
		setIsVisible(true);

		await sendCode({
			email: user.email,
			message: "Оновлення паролю",
		});
	};
	const handleEditPersonalInfoPress = () => {
		if (isEditingPersonalInfo) {
			if (isDirty) {
				handleSubmit(onSubmit)();
			} else {
				setIsEditingPersonalInfo(false);
			}
		} else {
			setIsEditingPersonalInfo(true);
		}
	};
	const pickImage = async (onChange: (uri: string) => void) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images", 
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (result.canceled) return;

		const selectedUri = result.assets[0].uri;
		
		onChange(selectedUri);
	};
	return (
		<>
			<KeyboardAwareScrollView
				bottomOffset={120}
				extraKeyboardSpace={20}
				scrollEnabled={!isDrawing}
			>
				{isLoading && (
					<ActivityIndicator style = {{marginTop: 24}} size = {20}/>
				)}
				<View style={styles.personalInformationContainer}>

					<View style={styles.profileCardBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.headerBlockText}>Картка профілю</Text>

							<Button
								variant={"white"}
								iconLeft={isLoading 
									? <ActivityIndicator animating={true} color={COLORS.foggy}/> 
									: <EditIcon color={COLORS.plum} />
								}
								text={isLoading ? '' : isEditingProfile ? "Зберегти" : ""}
								onPress={handleEditProfilePress}
								isSettings={true}
							/>
						</View>

						<View style={styles.profileCardAvatarBlock}>
							{isEditingProfile && (
								<Text style = {{ fontFamily: FONTS.regular}}>Оберіть або завантажте фото профілю</Text>
							)}

							<View style={styles.userAvatarContainer}>
								<Controller
									name="avatar"
									control={control}
									render={({ field: { onChange, value } }) => (
										<View style = {{ alignItems: "center", gap: 9 }}>
											<View style={styles.userAvatarContainer}>
												<AvatarField
													value={value}
													onPress={() => pickImage(onChange)}
													avatar={user.profile_app_profile.avatar}													
												/>
											</View>

											{isEditingProfile && (
												<View style={styles.userAddAvatarButtons}>
													<Button
														variant={"white"}
														iconLeft={<PlusIcon color={COLORS.plum} />}
														text={"Додайте фото"}
														onPress={() => pickImage(onChange)}
														isSettings={true}
														style={{ borderWidth: 0 }}
													/>
													<Button
														variant={"white"}
														iconLeft={<MyPostsPageIcon color={COLORS.plum} />}
														text={"Оберіть фото"}
														onPress={() => pickImage(onChange)}
														isSettings={true}
														style={{ borderWidth: 0 }}
														/>
												</View>
											)}
										</View>
										
									)}
								/>
							</View>
							<Text style={styles.name}>{user.profile_app_profile.pseudonym}</Text>

							{!isEditingProfile && (
								<Text style={styles.username}>@{user.username}</Text>
							)}

							{isEditingProfile && (
								<Controller
									name="nickname"
									control={control}
									render={({ field }) => (
										<Input
											label="Ім'я користувача"
											placeholder=""
											defaultValue={user.username ? user.username : ""}
											onChangeText={field.onChange}
											error={errors.nickname?.message}
										/>
									)}
								/>
							)}

							{errors.root && (
								<View style={styles.errorContainer}>
									<ErrorIcon color={COLORS.red} width={14} height={14}/>
									<Text style={styles.errorMessage}>{errors.root.message}</Text>
								</View>
							)}
						</View>
					</View>

					<View style={styles.personalInformationBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.headerBlockText}>Особиста інформація</Text>

							<Button
								variant={"white"}
								iconLeft={ isLoading 
									? <ActivityIndicator animating={true} color={COLORS.foggy}/>
									: <EditIcon color={COLORS.plum} />
								}
								text={isLoading ? '' : isEditingPersonalInfo ? "Зберегти" : ""}
								onPress={handleEditPersonalInfoPress}
								isSettings={true}
							/>
						</View>

						<View style={[styles.personalInformationFormBlock]}>
							<View
								style={[
									{ opacity: isEditingPersonalInfo ? 1 : 0.5, width: "100%" },
								]}
							>
								<Controller
									name="first_name"
									control={control}
									render={({ field }) => (
										<Input
											label="Ім'я"
											placeholder=""
											editable={isEditingPersonalInfo}
											defaultValue={user.first_name ? user.first_name : ""}
											onChangeText={field.onChange}
											error={errors.first_name?.message}
										/>
									)}
								/>
								<Controller
									name="last_name"
									control={control}
									render={({ field }) => (
										<Input
											label="Прізвище"
											placeholder=""
											editable={isEditingPersonalInfo}
											defaultValue={user.last_name ? user.last_name : ""}
											onChangeText={field.onChange}
											error={errors.last_name?.message}
										/>
									)}
								/>
								<Controller
									name="birthDate"
									control={control}
									rules={{
										pattern: {
											value: /^\d{2}\.\d{2}\.\d{4}$/,
											message: "Введіть дату у форматі ДД.ММ.РРРР"
										}
									}}
									render={({ field }) => (
										<Input
											inputType="date"
											label="Дата народження"
											value={field.value}
											editable={isEditingPersonalInfo}
											onChangeText={(text) => {
												const cleaned = text.replace(/\D/g, "");
												let formatted = cleaned;
												if (cleaned.length > 2 && cleaned.length <= 4) {
													formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
												} else if (cleaned.length > 4) {
													formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4, 8)}`;
												}
												field.onChange(formatted);
											}}
											keyboardType="numeric"
											maxLength={10}
											error={errors.birthDate?.message}
										/>
									)}
								/>

								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											label="Електронна пошта"
											placeholder=""
											keyboardType="email-address"
											editable={isEditingPersonalInfo}
											defaultValue={user.email}
											onChangeText={field.onChange}
											error={errors.email?.message}
										/>
									)}
								/>
							</View>

							{errors.root && (
								<View style={styles.errorContainer}>
									<ErrorIcon color={COLORS.red} width={14} height={14}/>
									<Text style={styles.errorMessage}>{errors.root.message}</Text>
								</View>
							)}
						</View>

						<View style={styles.inputButtons}>
							<Text style={styles.headerBlockText}>Пароль</Text>
							<Button
								variant={"white"}
								iconLeft={ isLoading 
									? <ActivityIndicator animating={true} color={COLORS.foggy}/>
									: <EditIcon color={COLORS.plum} />
								}
								text={isLoading ? '' : isEditingPassword ? "Зберегти" : ""}
								onPress={() => {
									if (isEditingPassword) {
										handleEditPasswordPress();
									} else {
										setIsEditingPassword(true);
									}
								}}
								isSettings={true}
							/>
						</View>
						<View
							style={[{ opacity: isEditingPassword ? 1 : 0.5, width: "100%" }]}
						>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<View>
										<Input
											label="Пароль"
											placeholder="********"
											isPassword={true}
											editable={isEditingPassword}
											onChangeText={field.onChange}
											error={errors.password?.message}
										/>
									</View>
								)}
							/>
						</View>

						{errors.root && (
							<View style={styles.errorContainer}>
								<ErrorIcon color={COLORS.red} width={14} height={14}/>
								<Text style={styles.errorMessage}>{errors.root.message}</Text>
							</View>
						)}
					</View>

					<View style={styles.signatureBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.signatureTitle}>Варіанти підпису</Text>

							<Button
								variant="white"
								iconLeft={ isLoading 
									? <ActivityIndicator animating={true} color={COLORS.foggy}/>
									: <EditIcon color={COLORS.plum} />
								}
								isSettings={true}
								text={isLoading ? '' : isEditingSignature ? "Зберегти" : ""}
								onPress={() => {
									if (isEditingSignature) {
										setIsEditingSignature(false);
									} else {
										setIsEditingSignature(true);
									}
								}}
							/>
						</View>

						<View style={styles.signatureNameContainer}>
							<TouchableOpacity
								style={styles.checkboxRow}
								onPress={() => setSelectedType("alias")}
							>
								<View
									style={
										selectedType === "alias"
											? styles.customCheckboxActive
											: styles.customCheckbox
									}
								>
									{selectedType === "alias" && (
										<View style={styles.checkboxInner} />
									)}
								</View>

								<Text style={styles.checkboxLabel}>Псевдонім автора</Text>
							</TouchableOpacity>
							<Text style={styles.signatureTextPreview}>
								{user?.profile_app_profile.pseudonym}
							</Text>
						</View>

						<TouchableOpacity
							style={styles.checkboxRow}
							onPress={() => setSelectedType("signature")}
						>
							<View
								style={
									selectedType === "signature"
										? styles.customCheckboxActive
										: styles.customCheckbox
								}
							>
								{selectedType === "signature" && (
									<View style={styles.checkboxInner} />
								)}
							</View>

							<Text style={styles.checkboxLabel}>Мій електронний підпис</Text>
						</TouchableOpacity>

						{!isEditingSignature &&
							(user?.profile_app_profile.signature ? (
								<View style={styles.signatureImageWrapper}>
									<Image
										source={{  uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user?.profile_app_profile.signature}` }}
										style={styles.signatureImage}
									/>
								</View>
							) : (
								<View style={styles.errorContainer}>
									{/* <Text style={{ marginLeft: 34 }}></Text> */}
									<ErrorIcon color={COLORS.red} width={14} height={14}/>
									<Text style={styles.errorMessage}>Не вдалося додати підпис. Спробуйте ще раз</Text>
								</View>
							))}
						{isEditingSignature && (
							<View style={{ width: "100%" }}>
								<SignatureEditor
									onOK={handleSaveSignature}
									onClear={() => console.log("Canvas cleared")}
									onBegin={() => {
										setIsDrawing(true);
									}}
									setIsDriwing={setIsDrawing}
									onEnd={() => setIsDrawing(false)}
								/>
							</View>
						)}
					</View>
				</View>
			</KeyboardAwareScrollView>
			<RecoveryPassword
				user={user}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				password={passwordValue}
				setIsEditingPassword = {setIsEditingPassword}
			/>
		</>
	);
}
