import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { IAlbumData } from "./types";
import { styles } from "./styles";
import {
	useCreateAlbumMutation,
	useGetTopicsQuery,
	useGetYearsQuery,
	useUpdateAlbumMutation,
} from "@modules/settings/api/albumApi";
import { Controller, useForm } from "react-hook-form";

interface AlbumsModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: (data: {
		id: number;
		title: string;
		topicId: number;
		yearId: number;
	}) => void;
	initialData?: {
		id: number;
		title: string;
		topicId: number;
		yearId: number;
	} | null;
	isEdit?: boolean;
}
type Form = {
	title: string;
	themeId: number | null;
	yearId: number | null;
};
export const AlbumsModal = ({
	visible,
	onClose,
	onSubmit,
	initialData,
}: AlbumsModalProps) => {
	const [showThemes, setShowThemes] = useState(false);
	const [showYears, setShowYears] = useState(false);
	const { data } = useGetYearsQuery(undefined, {
		pollingInterval: 3000,
	});
	const { data: availableThemes } = useGetTopicsQuery(undefined, {
		pollingInterval: 3000,
	});
	const [createAlbum] = useCreateAlbumMutation();
	const [updateAlbum] = useUpdateAlbumMutation();
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { isValid },
	} = useForm<Form>({
		defaultValues: {
			title: "",
			themeId: null,
			yearId: null,
		},
		mode: "onChange",
	});

	const selectedThemeId = watch("themeId");
	const selectedYearId = watch("yearId");

	const selectedTheme = availableThemes?.find((t) => t.id === selectedThemeId);
	const selectedYear = data?.find((y) => y.id === selectedYearId);

	useEffect(() => {
		if (!visible) return;

		reset({
			title: initialData?.title ?? "",
			themeId: initialData?.topicId ?? null,
			yearId: initialData?.yearId ?? null,
		});

		setShowThemes(false);
		setShowYears(false);
	}, [visible]);

	const handleFormSubmit = async (data: Form) => {
		const payload = {
			title: data.title,
			topicId: data.themeId!,
			yearId: data.yearId!,
		};
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
							name="title"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input
									label="Назва альбому"
									defaultValue={value}
									onChangeText={onChange}
									placeholder="Настрій"
								/>
							)}
						/>

						<Text style={styles.label}>Оберіть тему</Text>
						<TouchableOpacity onPress={() => setShowThemes(!showThemes)}>
							<View pointerEvents="none">
								<Input
									value={selectedTheme?.name ?? ""}
									placeholder="Природа"
									editable={false}
								/>
							</View>
						</TouchableOpacity>

						{showThemes && (
							<View style={styles.dropdown}>
								{availableThemes?.map((topic) => (
									<TouchableOpacity
										key={topic.id}
										style={styles.dropdownItem}
										onPress={() => {
											setValue("themeId", topic.id);
											setShowThemes(false);
										}}
									>
										<Text style={styles.dropdownText}>{topic.name}</Text>
									</TouchableOpacity>
								))}
							</View>
						)}

						<Text style={styles.label}>Рік альбому</Text>
						<TouchableOpacity onPress={() => setShowYears(!showYears)}>
							<View pointerEvents="none">
								<Input
									value={selectedYear?.year?.toString() ?? ""}
									placeholder="Оберіть рік"
									editable={false}
								/>
							</View>
						</TouchableOpacity>

						{showYears && (
							<View style={styles.dropdown}>
								<ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled>
									{data?.map((y) => (
										<TouchableOpacity
											key={y.id}
											style={styles.dropdownItem}
											onPress={() => {
												setValue("yearId", y.id);
												setShowYears(false);
											}}
										>
											<Text style={styles.dropdownText}>{y.year}</Text>
										</TouchableOpacity>
									))}
								</ScrollView>
							</View>
						)}

						<View style={styles.modalFooter}>
							<Button
								variant="white"
								text="Скасувати"
								onPress={onClose}
								style={[styles.button, styles.white]}
							/>
							<Button
								variant="purple"
								text="Зберегти"
								onPress={handleSubmit(handleFormSubmit)}
								disabled={!isValid}
								style={[
									styles.button,
									styles.purple,
									{ opacity: isValid ? 1 : 0.5 },
								]}
							/>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};
