import { Layout } from "@shared/ui/layout/Layout";
import { UserContext } from "@modules/auth/context/user-context";
import { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { Redirect } from "expo-router";

export default function PersonalInformationScreen() {
    const context = useContext(UserContext);

    // if (!context?.user) return <Redirect href="/login" />;

    const user = context?.user ?? {
	    id: 1,
	    email: "test@gmail.com",
	    firstname: "Lina",
	    lastname: "Li",
	    nickname: "thelili",
	    alias: null,
	    avatars: [],
	    signature: null,
	    birthDate: null,
	};

    const lastAvatar = user.avatars?.[user.avatars.length - 1];
    const avatar = lastAvatar
        ? { uri: `http://192.168.0.104:8000/media/thumb/${lastAvatar.filename}` }
        : require("../../assets/defaultAvatar.png")

    const fullName = [user.firstname, user.lastname].filter(Boolean).join(" ");

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarWrapper}>
                    <Image source={avatar} style={styles.avatar} />
                    <View style={styles.onlineIndicator} />
                </View>

                {!!fullName && <Text style={styles.name}>{fullName}</Text>}
                {!!user.nickname && (
                    <Text style={styles.username}>@{user.nickname}</Text>
                )}
                {!!user.alias && (
                    <Text style={styles.alias}>{user.alias}</Text>
                )}
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    avatarWrapper: {
        position: "relative",
        marginBottom: 12,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.lightestGray,
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: COLORS.green,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 2,
    },
    username: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 4,
    },
    alias: {
        fontSize: 13,
        color: COLORS.lightGray,
        marginBottom: 20,
    },
});