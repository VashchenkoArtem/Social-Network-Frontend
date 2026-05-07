import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation, useUpdatePostMutation } from "@modules/posts/api/postsApi";
import { createPostValidator } from "@modules/posts/models/lib/create-post.validation";
import { ICreatePostForm } from "@modules/posts/models/types/create-post.types";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { PostTags } from "@modules/tabs/ui/postTags/postTags";
import { PostLinks } from "@modules/tabs/ui/postLinks/postLinks";
import { Post } from "@modules/posts/api/api.types";
import { SERVER } from "@shared/constants/server";
import { useGetTagsQuery } from "@modules/tabs/api/tagsApi";


interface ReactNativeFile {
    uri: string;
    name: string;
    type: string;
}


export function CreatePostForm(props: {
	setIsCreatePostModalOpen: (type: boolean) => void;
    editData?: Post;
}) {
	const { setIsCreatePostModalOpen, editData } = props;
	const { data: allTags } = useGetTagsQuery();
	const {
		handleSubmit,
		control,
		reset,
		watch,
		formState: { errors },
	} = useForm<ICreatePostForm>({
		defaultValues: {
			title: "",
			topic: "",
			content: "",
			tags: [],
			links: [],
		},
		resolver: yupResolver(createPostValidator),
	});
	const watchedTags = watch("tags");
	const tagsMap = allTags?.reduce((acc, tag) => {
		acc[tag.id] = tag.name;
		return acc;
	}, {} as Record<number, string>);
	useEffect(() => {
		if (editData) {
			reset({
				title: editData.title,
				topic: editData.topic || "",
				content: editData.content,
				tags: editData.tags?.map(t => t.tag.id) || [],
				links: editData.urls?.map(u => u.href) || [],
			});
			
			if (editData.photos) {
				const existingUris = editData.photos.map(p => 
					`http://${SERVER.host}:${SERVER.port}/media/thumb/${p.filename}`
				);
				setPostImages(existingUris); 
			}
		}
	}, [editData, reset]);

	const [createPost, { isError }] = useCreatePostMutation();

	const [postImages, setPostImages] = useState<string[]>([]);

	const [updatePost] = useUpdatePostMutation();

	const { user } = useContext(UserContext)!;

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8,
			allowsMultipleSelection: true,
		});

		if (result.canceled || !result.assets?.length) return;

		const uris = result.assets.map((asset) => asset.uri);

		setPostImages((prev) => [...prev, ...uris]);
	};

	const removeImage = (index: number) => {
		setPostImages((prev) =>
			prev.filter((_, i) => i !== index)
		);
	};

	const handleSave = async (data: ICreatePostForm) => {
		const formData = new FormData();

		formData.append("title", data.title);
		formData.append("content", data.content);
		formData.append("topic", data.topic || "");
		formData.append("authorId", String(user?.id));

		postImages.forEach((uri: string, index: number) => {
			if (uri.startsWith('file://') || uri.startsWith('content://')) {
				const fileToUpload = {
					uri,
					name: `photo_${Date.now()}_${index}.jpg`,
					type: "image/jpeg",
				};
				formData.append("images", fileToUpload as unknown as Blob);
			} else {
				formData.append("existingPhotos", uri);
			}
		});

		data.tags?.forEach((tagId: number) => {
			formData.append("tags", String(tagId));
		});

		data.links?.forEach((link: string) => {
			if (link.trim()) {
				formData.append("urls", link);
			}
		});

		try {
			if (editData) {
				await updatePost({ id: editData.id, formData }).unwrap();
			} else {
				await createPost(formData).unwrap();
			}
			
			reset();
			setPostImages([]);
			setIsCreatePostModalOpen(false);
		} catch (error) {
			console.error("Помилка збереження:", error);
		}
	};


	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "center",
			}}
		>
			<View style={styles.formContainer}>
				<View style={styles.formHeader}>
					<Text style={styles.formTitle}>
						{editData ? "Редагування публікації" : "Створення публікації"}
					</Text>
				</View>

				<View style={styles.formFields}>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<Input
								placeholder="Введіть назву публікації"
								label="Назва публікації"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								value={field.value}
								onChangeText={field.onChange}
								error={errors.title?.message}
							/>
						)}
					/>

					<Controller
						name="topic"
						control={control}
						render={({ field }) => (
							<Input
								placeholder="Введіть тему публікації"
								label="Тема публікації"
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								value={field.value}
								onChangeText={field.onChange}
								error={errors.topic?.message}
							/>
						)}
					/>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <PostTags
                            selectedTags={field.value ?? []}
                            onToggleTag={(tagId) => {
                                const current = field.value ?? [];

                                if (current.includes(tagId)) {
                                    field.onChange(current.filter(id => id !== tagId));
                                } else {
                                    field.onChange([...current, tagId]);
                                }
                            }}
                        />
                    )}
                />
					<Controller
						name="content"
						control={control}
						render={({ field }) => (
							<View>
								<Input
									placeholder="Введіть опис публікації"
									label="Опис публікації"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									value={field.value}
									onChangeText={field.onChange}
									error={errors.content?.message}
								/>

								{!!watchedTags?.length && (
									<View
										style={{
											flexDirection: "row",
											flexWrap: "wrap",
											gap: 6,
											marginTop: 8,
										}}
									>
										{watchedTags.map((tagId: number) => (
											<Text
												key={tagId}
												style={{
													color: COLORS.plum,
													fontSize: 14,
													fontWeight: "600",
												}}
											>
												#{tagsMap?.[tagId] ?? tagId}
											</Text>
										))}
									</View>
								)}
							</View>
						)}
					/>
                    <Controller
                    name="links"
                    control={control}
                    render={({ field }) => (
                        <PostLinks
                        links={field.value || []}
                        setLinks={field.onChange}
                        />
                    )}
                    />
				</View>

				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						gap: 10,
						marginTop: 15,
					}}
				>
					{postImages.map((uri, index) => (
                        <View key={index} style = {{width: "100%", height: 260}}>
                            <TouchableOpacity
                                onPress={() => removeImage(index)}
                                style = {styles.deleteBtn}
                            >
                                <ICONS.DeleteIcon color = {COLORS.black} width={20} height={20}></ICONS.DeleteIcon>
                            </TouchableOpacity>
                                <Image
                                    source={{ uri: uri }}
                                    style={styles.postImage}
                                />
                        </View>
					))}
				</View>

				<View style={styles.formActions}>
					<Button
						onPress={pickImage}
						variant="white"
						iconLeft={
							<ICONS.MyPostsPageIcon
								color={COLORS.plum}
							/>
						}
					/>

					<Button
						variant="white"
						iconLeft={
							<ICONS.stickersIcon
								color={COLORS.plum}
							/>
						}
					/>

					<Button
						onPress={handleSubmit(handleSave)}
						variant="purple"
						text={editData ? "Зберегти" : "Публікація"}
						iconRight={
							<ICONS.ArrowIcon
								color={COLORS.white}
							/>
						}
					/>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}