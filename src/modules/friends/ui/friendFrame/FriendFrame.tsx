import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";
import { IProps } from "./types";
import { IUser } from "@shared/types/user.types";
import { getOtherUser } from "@shared/utils/friends";



export function FriendFrame({
    frameName,
    data,
    buttonText,
    setChosenTab,
    messageIfNull,
    toDetailPage,
    isFetching, 
    isLoading
}: IProps) {
    const { user } = useContext(UserContext)!;

    if (!user) return null;

    return (
        <View style={styles.friendCards}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {frameName}
                </Text>
                { toDetailPage && (
                    <Text
                        style={styles.cardLink}
                        onPress={() => setChosenTab(frameName)}
                    >
                        Дивитись всі
                    </Text>
                )}
            </View>
            <View style={{ gap: 10 }}>
                {(isLoading || isFetching) ? (
                    <ActivityIndicator size="small" />
                ) : data ? (
                    data.length > 0 ? (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => String(item.user.id)}
                            renderItem={({ item }) => (
                                <FriendCard
                                    buttonText={buttonText}
                                    user={item.user}
                                    requestId={item.id}
                                />
                            )}
                        />
                    ) : (
                        <Text style={styles.nullMessage}>
                            {messageIfNull}
                        </Text>
                    )
                ) : null}
            </View>
        </View>
    );
}