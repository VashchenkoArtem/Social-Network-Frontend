import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostData, Photo } from "@modules/posts/api/api.types";
import { useCreatePostMutation } from "@modules/posts/api/postsApi";
import { createPostValidator } from "@modules/posts/models/lib/create-post.validation";
import { ICreatePostForm } from "@modules/posts/models/types/create-post.types";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { styles } from "./styles";
import { View, Text, Image } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { ICONS } from "@shared/ui";
import { COLORS } from "@shared/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { UserContext } from "@modules/auth/context/user-context";

export function CreatePostForm() {
	const { handleSubmit, control, formState: { errors } } = useForm<ICreatePostForm>({
        resolver: yupResolver(createPostValidator)
    })

    const [ createPost ] = useCreatePostMutation()
    const [postImage, setPostImage] = useState<string | null>(null)
    const { user } = useContext(UserContext)!;

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.8,
        })

        if (result.canceled) return

        const uri = result.assets[0].uri

        setPostImage(uri)
    }

    const handleCreatePost = async (data: ICreatePostForm) => {
        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("topic", data.topic)
        formData.append("content", data.content)
        formData.append("authorId", String(user?.id))

        if (postImage) {
            formData.append("file", {
                uri: postImage,
                name: "photo.jpg",
                type: "image/jpeg",
            } as any)
        }

        await createPost(formData).unwrap()
    }

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
                    <Text style={styles.formTitle}>Створення публікації </Text>
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
                        name="content"
                        control={control}
                        render={({ field }) => (
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
                        )}                    
                    />
                </View>

                {postImage && (
                    <Image
                        source={{ uri: postImage }}
                        style={styles.postImage}
                    />
                )}

                <View style={styles.formActions}>
                    <Button
                        onPress={pickImage}
                        variant="white"
                        iconLeft={<ICONS.MyPostsPageIcon color={COLORS.plum} />}
                    />

                    <Button
                        variant="white"
                        iconLeft={<ICONS.stickersIcon color={COLORS.plum} />}
                    />

                    <Button
                        onPress={handleSubmit(handleCreatePost)}
                        variant="purple"
                        text="Публікація"
                        iconRight={<ICONS.ArrowIcon color={COLORS.white} />}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
