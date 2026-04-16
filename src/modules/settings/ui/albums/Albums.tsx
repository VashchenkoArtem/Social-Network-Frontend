import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { Button } from "@shared/ui/button";
import { COLORS } from "@shared/constants/colors";
import { MyPostsPageIcon } from "@shared/ui/icons/urls/MyPostsPageIcon";
import { PasswordEyeClose, PasswordEyeOpen } from "@shared/ui/icons/inputs";
import { BinIcon } from "@shared/ui/icons/buttons";
import { useAlbumVisibilityMutation, useDeletePhotoMutation, useUploadPhotoMutation, useGetAlbumsQuery } from "@modules/auth/api/alumApi";


export function Albums() {
    const { data: albums } = useGetAlbumsQuery()

    const [uploadPhoto] = useUploadPhotoMutation()
    const [deletePhoto] = useDeletePhotoMutation()
    const [albumVisibility] = useAlbumVisibilityMutation()

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        if (result.canceled) return
        const asset = result.assets[0]
        await uploadPhoto({ image: asset.uri }).unwrap()
    }

    async function handleDelete(id: number) {
        try {
            await deletePhoto({ id }).unwrap()
        } catch (error) {
            console.log("Error during delete:", error)
        }
    }

    async function handleVisibility(id: number) {
        try {
            await albumVisibility({ id }).unwrap()
        } catch (error) {
            console.log("Error during visibility change:", error)
        }
    }

    return (
        <KeyboardAwareScrollView bottomOffset={120} extraKeyboardSpace={20}>
            <View style={styles.albumContainer}>
                <View style={styles.albumEditContainer}>

                    <View style={styles.headerBlock}>
                        <Text style={styles.headerBlockText}>Мої фото</Text>

                        <Button
                            variant="white"
                            iconLeft={<MyPostsPageIcon color={COLORS.plum} />}
                            text="Додати фото"
                            onPress={pickImage}
                            isSettings
                        />
                    </View>

                    {albums?.map(album => (
                        <View key={album.id}>

                            {album.photos.map(photo => (
                                <View
                                    key={photo.id}
                                    style={styles.albumAddPhotoContainer}
                                >
                                    <Image
                                        source={{ uri: photo.file }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />

                                    <View style={styles.albumBtnContainer}>

                                        <Button
                                            variant="white"
                                            iconLeft={
                                                // album.isVisible
                                                    <PasswordEyeOpen color={COLORS.plum} />
                                                    // : <PasswordEyeClose color={COLORS.plum} />
                                            }
                                            onPress={() => handleVisibility(album.id)}
                                            isSettings={true}
                                            isBackgroundWhite={true}
                                        />

                                        <Button
                                            variant="white"
                                            iconLeft={<BinIcon color={COLORS.plum} />}
                                            onPress={() => handleDelete(photo.id)}
                                            isSettings={true}
                                            isBackgroundWhite={true}
                                        />

                                    </View>
                                </View>
                            ))}

                        </View>
                    ))}

                    {/* {image && (
                        <View style={styles.albumAddPhotoContainer}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                                // blurRadius={isBlurred ? 13 : 0}
                            />

                            <View style={styles.albumBtnContainer}>
                                <Button
                                    variant={"white"}
                                    iconLeft={
                                        // isBlurred
                                            // ? <PasswordEyeClose color={COLORS.plum} />
                                            <PasswordEyeOpen color={COLORS.plum} />
                                    }
                                    // onPress={() => setIsBlurred(!isBlurred)}
                                    isSettings={true}
                                    isBackgroundWhite={true}
                                />

                                <Button
                                    variant={"white"}
                                    iconLeft={<BinIcon color={COLORS.plum} />}
                                    isSettings={true}
                                    isBackgroundWhite={true}
                                    onPress={handleDelete}
                                />
                            </View>
                        </View>
                    )} */}

                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}