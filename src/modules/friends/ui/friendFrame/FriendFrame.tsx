import { View, Text } from "react-native";
import { FriendCard } from "../friendCard";
import { styles } from "./friendFrame.styles";
import { useContext } from "react";
import { UserContext } from "@modules/auth/context/user-context";
import { FriendRequest, Profile } from "@modules/friends/api/api.types";
import { IProps } from "./types";



export function FriendFrame({ frameName, data, buttonText, setChosenTab, messageIfNull }: IProps) {
    const isFriendRequests = (
        items: FriendRequest[] | Profile[]
    ): items is FriendRequest[] => {
        return items.length > 0 && "from_profile" in items[0]
    }

    return (
        <View style={styles.friendCards}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{frameName}</Text>
                <Text style={styles.cardLink} onPress={() => setChosenTab(frameName)}>Дивитись всі</Text>
            </View>

            <View>
                {!data?.length ? <Text style={styles.nullMessage}>{messageIfNull}</Text> : isFriendRequests(data)
                    ? data.map((friendRequest) => (
                        <FriendCard
                            buttonText={buttonText}
                            key={friendRequest.id}
                            user={friendRequest.from_profile}
                            requestId={friendRequest.id}
                        />
                    ))
                    : data.map((profile) => (
                        <FriendCard
                            buttonText={buttonText}
                            key={profile.id}
                            user={profile}
                        />
                    ))}
            </View>
        </View>
    )
}