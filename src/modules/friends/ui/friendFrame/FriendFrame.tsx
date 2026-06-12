import { View, Text, FlatList, RefreshControl } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";
import { IProps } from "./types";
import { IUser } from "@shared/types/user.types";
import { COLORS } from "@shared/constants/colors";
import { ActivityIndicator } from "react-native-paper";

export function FriendFrame({
    frameName,
    data,
    buttonText,
    setChosenTab,
    messageIfNull,
    toDetailPage,
    isFetching, 
    isLoading,
    onlineUserIds,
    refreshing,
    onEndReached,
    onRefresh
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
                    <ActivityIndicator animating={true} color={COLORS.gray} style={{ marginTop: 20 }}/>
                ) : data ? (
                    data.length > 0 ? (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => String(item.user.id)}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            renderItem={({ item }) => (
                                <FriendCard
                                    isOnline={onlineUserIds?.includes(item.user.id)}
                                    buttonText={buttonText}
                                    user={item.user}
                                    requestId={item.id}
                                />
                            )}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.5}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing ?? false}
                                    onRefresh={onRefresh}
                                />
                            }
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