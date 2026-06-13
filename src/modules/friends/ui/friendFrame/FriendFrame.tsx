import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";
import { IProps } from "./types";
import { IUser } from "@shared/types/user.types";
import { getOtherUser } from "@shared/utils/friends";
import { Redirect } from "expo-router";



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
    onEndReached,
    isPaginate  
}: IProps) {
    const { user } = useContext(UserContext)!;

    if (!user) return <Redirect href={"/login"}/>;

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
            <View>
                {(isLoading || isFetching) ? (
                    <ActivityIndicator size="small" />
                ) : data ? (
                    data.length > 0 ? (
                        <FlatList
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 10 }} />
                            )}
                            // contentContainerStyle={{gap: 10}}
                            data={data}
                            keyExtractor={(item) => String(item.user.id)}
                            renderItem={({ item }) => {
                                if (item.user){
                                    return <FriendCard
                                        isOnline={onlineUserIds?.includes(item.user.id)}
                                        buttonText={buttonText}
                                        user={item.user}
                                        requestId={item.id}
                                    />
                                }
                                return null
                            }}
                            onEndReached={isPaginate ? onEndReached : undefined}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                isFetching ? (
                                    <ActivityIndicator
                                        style={{ marginVertical: 12 }}
                                    />
                                ) : null
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