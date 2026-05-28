import { View, Text } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest } from "@modules/friends/api/api.types";
import { IProps } from "./types";
import { IUser } from "@shared/types/user.types";



export function FriendFrame({
    frameName,
    data,
    buttonText,
    setChosenTab,
    messageIfNull,
    type
}: IProps) {
    const { user } = useContext(UserContext)!;

    if (!user) return null;

    const getOtherUser = (
        friendship: FriendRequest,
        userId: number
    ) => {
        const from =
            friendship.user_app_user_user_app_friendship_from_user_idTouser_app_user;

        const to =
            friendship.user_app_user_user_app_friendship_to_user_idTouser_app_user;

        return from.id === userId ? to : from;
    };

    return (
        <View style={styles.friendCards}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {frameName}
                </Text>

                <Text
                    style={styles.cardLink}
                    onPress={() => setChosenTab(frameName)}
                >
                    Дивитись всі
                </Text>
            </View>

            <View>
                {!data?.length ? (
                    <Text style={styles.nullMessage}>
                        {messageIfNull}
                    </Text>
                ) : type === "requests" ? (
                    data.map((friendRequest) => {
                        const friend = getOtherUser(
                            friendRequest,
                            user.id
                        );

                        return (
                            <FriendCard
                                key={friendRequest.id}
                                buttonText={buttonText}
                                user={friend}
                                requestId={friendRequest.id}
                            />
                        );
                    })
                ) : (
                    data.map((profile) => (
                        <FriendCard
                            key={profile.id}
                            buttonText={buttonText}
                            user={profile}
                        />
                    ))
                )}
            </View>
        </View>
    );
}