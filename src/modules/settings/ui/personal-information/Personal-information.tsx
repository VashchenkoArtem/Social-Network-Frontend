import { Text, View } from "react-native";
import { useContext, useState } from "react";
import { Button } from "@shared/ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { EditIcon, PlusIcon } from "@shared/ui/icons/buttons";
import { COLORS } from "@shared/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { ScrollView } from "react-native";
import { SignatureEditor } from "@shared/ui/signatureEditor";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
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


type FormData = {
	firstname: string;
	lastname: string;
	nickname: string;
	birthDate: string;
	email: string;
	password: string;
	newPassword?: string;
	confirmPassword?: string;
	avatar?: string;
};

interface PhotoFile {
    uri: string;
    name: string;
    type: string;
}

export function PersonalInformation() {
	const [isEditingSignature, setIsEditingSignature] = useState(false);
	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);
	const [ updateUserSignature ] = useUpdateUserSignatureMutation()
	const [sendCode] = useSendCodeMutation();
	const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
	const { user, token } = useContext(UserContext)!;
	const [isVisible, setIsVisible] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const [updateUserInfo] = useUpdateUserInfoMutation();
	const [selectedType, setSelectedType] = useState<"alias" | "signature">(
		user?.profile.signature ? "signature" : "alias",
	);
	const {
		control,
		handleSubmit,
		reset,
		watch,

		formState: { isDirty },
	} = useForm<FormData>({
		// defaultValues: {
		// 	birthDate: user?.birthDate
		// 	? formatDate(user.birthDate)
		// 	: "",
		// },
	});
	if (!user) {
		return <Redirect href={"/login"}></Redirect>;
	}
	console.log(user)
	const passwordValue = watch("password");
	const handleSaveSignature = async (base64: string) => {
		await updateUserSignature({ signature: base64 }).unwrap();
		setSelectedType("signature");
		setIsEditingSignature(false);
	}
	const onSubmit = async (data: FormData) => {
		try {
			const payload: ProfileData = {
				firstname: data.firstname,
				lastname: data.lastname,
				nickname: data.nickname,
				birthDate: data.birthDate,
			};

			if (data.avatar) {
				const isLocalUri = data.avatar.startsWith('file') || data.avatar.startsWith('ph');
				
				if (isLocalUri) {
					payload.avatar = {
						uri: data.avatar,
						name: 'avatar.jpg',
						type: 'image/jpeg',
					} as any;
				}
			}

			await updateUserInfo(payload).unwrap();
			
			reset(data); 
			setIsEditingProfile(false);
			setIsEditingPersonalInfo(false);
			
			console.log("Дані успішно збережено");
		} catch (error) {
			console.error("Помилка оновлення:", error);
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
			mediaTypes: ImagePicker.MediaTypeOptions.Images, 
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
				<View style={styles.personalInformationContainer}>

					<View style={styles.profileCardBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.headerBlockText}>Картка профілю</Text>

							<Button
								variant={"white"}
								iconLeft={<EditIcon color={COLORS.plum} />}
								text={isEditingProfile ? "Зберегти" : ""}
								onPress={handleEditProfilePress}
								isSettings={true}
							/>
						</View>

						<View style={styles.profileCardAvatarBlock}>
							{isEditingProfile && (
								<Text>Оберіть або завантажте фото профілю</Text>
							)}

							<View style={styles.userAvatarContainer}>
								<Controller
									name="avatar"
									control={control}
									render={({ field: { onChange, value } }) => (
										<>
											<View style={styles.userAvatarContainer}>
												<AvatarField
													value={value}
													onChange={() => pickImage(onChange)}
													avatar={user.profile.avatar}
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
										</>
									)}
								/>
							</View>


							<Text style={styles.name}>{user.profile.pseudonym}</Text>

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
										/>
									)}
								/>
							)}
						</View>
					</View>

					<View style={styles.personalInformationBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.headerBlockText}>Особиста інформація</Text>

							<Button
								variant={"white"}
								iconLeft={<EditIcon color={COLORS.plum} />}
								text={isEditingPersonalInfo ? "Зберегти" : ""}
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
									name="firstname"
									control={control}
									render={({ field }) => (
										<Input
											label="Ім'я"
											placeholder=""
											editable={isEditingPersonalInfo}
											defaultValue={user.firstname ? user.firstname : ""}
											onChangeText={field.onChange}
										/>
									)}
								/>
								<Controller
									name="lastname"
									control={control}
									render={({ field }) => (
										<Input
											label="Прізвище"
											placeholder=""
											editable={isEditingPersonalInfo}
											defaultValue={user.lastname ? user.lastname : ""}
											onChangeText={field.onChange}
										/>
									)}
								/>
								<Controller
									name="birthDate"
									control={control}
									render={({ field }) => (
										<Input
											inputType="date"
											label="Дата народження"
											placeholder=""
											defaultValue={
												user.profile.birth_date
													? new Date(user.profile.birth_date).toLocaleDateString("ua-UA")
													: ""
											}
											value={field.value || ""}
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
										/>
									)}
								/>
							</View>
						</View>
						<View style={styles.inputButtons}>
							<Text style={styles.headerBlockText}>Пароль</Text>
							<Button
								variant={"white"}
								iconLeft={<EditIcon color={COLORS.plum} />}
								text={isEditingPassword ? "Зберегти" : ""}
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
										/>
									</View>
								)}
							/>
						</View>
					</View>

					<View style={styles.signatureBlock}>
						<View style={styles.headerBlock}>
							<Text style={styles.signatureTitle}>Варіанти підпису</Text>

							<Button
								variant="white"
								iconLeft={<EditIcon color={COLORS.plum} />}
								isSettings={true}
								text={isEditingSignature ? "Зберегти" : ""}
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
								{user?.profile.pseudonym}
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
							(user?.profile.signature ? (
								<View style={styles.signatureImageWrapper}>
									<Image
										source={{  uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${user?.profile.signature}` }}
										style={styles.signatureImage}
									/>
								</View>
							) : (
								<Text style={{ marginLeft: 34 }}>Підпис не додано</Text>
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
