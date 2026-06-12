import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator } from 'react-native-paper'
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { styles } from "./styles";
import {
	useCreateAlbumMutation,
	useUpdateAlbumMutation,
} from "@modules/settings/api/albumApi";
import { Controller, useForm } from "react-hook-form";
import { ErrorIcon } from "../icons/urls/ErrorIcon";
import { COLORS } from "@shared/constants/colors";

interface AlbumsModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: (data: {
		id: number;
		name: string;
		theme: string;
		year: string;
	}) => void;
	initialData?: {
		id: number;
		name: string;
		theme: string;
		year: string;
	} | null;
	isEdit?: boolean;
}
type Form = {
	name: string;
	theme: string;
	year: string;
};
export const AlbumsModal = ({
	visible,
	onClose,
	initialData,
}: AlbumsModalProps) => {
	const [createAlbum] = useCreateAlbumMutation();
	const [updateAlbum, {isLoading}] = useUpdateAlbumMutation();
	const {
		control,
		handleSubmit,
		reset,
		setError,
		formState: { isValid, errors },
	} = useForm<Form>({
		defaultValues: {
			name: "",
			theme: "",
			year: "",
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (!visible) reset({ name: "", theme: "", year: "" });

		reset({
			name: initialData?.name ?? "",
			theme: initialData?.theme ?? "",
			year: initialData?.year ?? "",
		});
	}, [visible]);
	const handleFormSubmit = async (data: Form) => {
		const payload = {
			name: data.name,
			theme: data.theme!,
			year: data.year!,
		};
		try {
			if (initialData) {
				console.log();
				await updateAlbum({
					id: initialData.id,
					data: payload,
				});
			} else {
				await createAlbum(payload);
			}
			onClose();
		} catch (error: any) {
			setError('root', {
				type: 'server',
				message: error?.data?.message || 'Не вдалося оновити альбом. Спробуйте ще раз.'
			})
		}
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>
							{initialData ? "Редагувати альбом" : "Створити альбом"}
						</Text>
						<TouchableOpacity onPress={onClose} hitSlop={15}>
							<Text style={styles.closeIcon}>✕</Text>
						</TouchableOpacity>
					</View>

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						<Controller
							control={control}
							name="name"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input 
									label="Назва альбому"
									value={value}
									onChangeText={onChange}
									placeholder="Настрій"
									error={errors.name?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name="theme"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input
									label="Тема альбому"
									value={value}
									defaultValue={value}
									onChangeText={onChange}
									placeholder="Природа"
									error={errors.theme?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name="year"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input
									label="Рік альбому"
									value={value}
									defaultValue={value}
									onChangeText={onChange}
									placeholder="2026"
									keyboardType="numeric"
									error={errors.year?.message}
								/>
							)}
						/>
						<View style={styles.modalFooter}>
							<Button
								variant="white"
								text="Скасувати"
								onPress={onClose}
								style={[styles.button, styles.white]}
							/>
							<Button
								variant="purple"
								text={isLoading ? '' : "Зберегти"}
								onPress={handleSubmit(handleFormSubmit)}
								disabled={!isValid}
								style={[
									styles.button,
									styles.purple,
									{ opacity: isValid ? 1 : 0.5 },
								]}
								iconLeft={ isLoading && <ActivityIndicator animating={true} color={COLORS.foggy}/> }
							/>

							{errors.root && (
								<View style={styles.errorContainer}>
									<ErrorIcon color={COLORS.red} width={14} height={14}/>
									<Text style={styles.errorMessage}>{errors.root.message}</Text>
								</View>
							)}
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};