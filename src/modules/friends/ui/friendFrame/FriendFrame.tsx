import { View, Text } from "react-native";
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
}: IProps) {
    const { user } = useContext(UserContext)!;

    if (!user) return null;

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

            <View style={{gap: 10}}>
                {!data?.length ? (
                    <Text style={styles.nullMessage}>
                        {messageIfNull}
                    </Text>
                    )
                    : (data.map((friendRequest) => {
                        return (
                            <FriendCard
                                key={friendRequest.id}
                                buttonText={buttonText}
                                user={friendRequest.user}
                                requestId={friendRequest.id}
                            />
                        );
                    }))}
            </View>
        </View>
    );
}