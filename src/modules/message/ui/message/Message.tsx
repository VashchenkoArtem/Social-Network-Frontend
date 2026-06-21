import { IMessageProps } from "./message.types";
import { styles } from "./styles";
import { View, Text, Image, FlatList } from "react-native";
import { useUserContext } from "@modules/auth/context/user-context";
import { MessageStatusMarkIcon } from "@shared/ui/icons/urls/MessageStatusMark";
import { CLOUDINARY_URL, SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";

export function Message(props: IMessageProps) {
    const { data } = props;
    if (!data) return null;

    const { user } = useUserContext()!;
    const isMyMessage = user?.id === data.sender_id;

    const createdDate = new Date(data.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const images = data.chat_app_messageimage ?? [];
    const neededImages = images.slice(0, 7);
    const hasText = !!data.text;
    const hasImages = neededImages.length > 0;

    const imageMessageRows = [
        neededImages.slice(0, 2),
        neededImages.slice(2, 5),
        neededImages.slice(5, 7),
    ].filter((row) => row.length > 0);

    const imageUri = (image: string) => {
        if (!image) return "";

        if (image.startsWith("data:image")) {
            return image;
        }

        if (image.startsWith("file:///")) {
            return image;
        }

        if (image.startsWith("/9j/") || image.startsWith("iVBOR")) {
            return `data:image/jpeg;base64,${image}`;
        }

        return `${CLOUDINARY_URL}${image}`;
    };
    const MyTimeBlock = () => (
        <View style={styles.messageInfoContainer}>
            <Text style={styles.sendTime}>{createdDate}</Text>
            <View>
                <MessageStatusMarkIcon width={10} height={10} color={COLORS.gray} />
                {data.chat_app_message_readers &&
                    data.chat_app_message_readers.length > 0 && (
                        <View style={{ position: "absolute", right: -5 }}>
                            <MessageStatusMarkIcon
                                width={10}
                                height={10}
                                color={COLORS.gray}
                            />
                        </View>
                    )}
            </View>
        </View>
    );
    const TheirTimeBlock = () => (
        <View style={styles.messageInfoContainer}>
            <Text style={styles.sendTime}>{createdDate}</Text>
        </View>
    );
    if (isMyMessage) {
        return (
            <View style={{ width: "100%", alignItems: "flex-end" }}>
                <View style={styles.myMessage}>
                    {hasText && !hasImages && (
                        <View style={styles.textWithTime}>
                            <Text style={styles.text}>{data.text}</Text>
                            <MyTimeBlock />
                        </View>
                    )}

                    {!hasText && hasImages && (
                        <>
                            <FlatList
                                data={imageMessageRows}
                                keyExtractor={(_, index) => String(index)}
                                renderItem={({ item }) => (
                                    <View style={styles.imageContainer}>
                                        {item.map((imageItem, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: imageUri(imageItem.image) }}
                                                style={styles.imageThumb}
                                            />
                                        ))}
                                    </View>
                                )}
                            />
                            <View style={{ alignItems: "flex-end" }}>
                                <MyTimeBlock />
                            </View>
                        </>
                    )}

                    {hasText && hasImages && (
                        <>
                            <Text style={styles.text}>{data.text}</Text>
                            <FlatList
                                data={imageMessageRows}
                                keyExtractor={(_, index) => String(index)}
                                renderItem={({ item }) => (
                                    <View style={styles.imageContainer}>
                                        {item.map((imageItem, index) => {
                                            return (
                                                <Image
                                                    key={index}
                                                    source={{ uri: imageUri(imageItem.image) }}
                                                    style={styles.imageThumb}
                                                />
                                            )
                                        }
                                        )}
                                    </View>
                                )}
                            />
                            <View style={{ alignItems: "flex-end" }}>
                                <MyTimeBlock />
                            </View>
                        </>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.theirMessageRow}>
            <Image
                source={{
                    uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${data.user_app_user.profile_app_profile.avatar}`,
                }}
                width={46}
                height={46}
                style={styles.avatar}
            />
            <View style={styles.theirMessage}>
                <Text style={styles.username}>
                    {data.user_app_user.profile_app_profile.pseudonym}
                </Text>

                {hasText && !hasImages && (
                    <View style={styles.textWithTime}>
                        <Text style={styles.text}>{data.text}</Text>
                        <TheirTimeBlock />
                    </View>
                )}

                {!hasText && hasImages && (
                    <>
                        <FlatList
                            data={data.chat_app_messageimage}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={({ item }) => {
                                return (
                                        <Image
                                            source={{ uri: imageUri(item.image) }}
                                            style={styles.imageFull}
                                        />
                                )
                            }
                            }
                        />
                        <TheirTimeBlock />
                    </>
                )}

                {hasText && hasImages && (
                    <>
                        <Text style={styles.text}>{data.text}</Text>
                        <FlatList
                            data={data.chat_app_messageimage}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={({ item }) => {
                                return (
                                    <Image
                                        source={{ uri: imageUri(item.image) }}
                                        style={styles.imageFull}
                                    />
                                )    
                            }
                            }
                        />
                        <TheirTimeBlock />
                    </>
                )}
            </View>
        </View>
    );
}
