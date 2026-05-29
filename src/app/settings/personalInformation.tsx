import { Layout } from "@shared/ui/layout/Layout";
import { UserContext, useUserContext } from "@modules/auth/context/user-context";
import { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";
import { Redirect } from "expo-router";
import { getAvatar } from "@shared/utils/avatar";

export default function PersonalInformationScreen() {
    const {user} = useUserContext()!

    // if (!context?.user) return <Redirect href="/login" />;

    const avatar = getAvatar(user.profile_app_profile.avatar) 

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarWrapper}>
                    <Image source={{
                        uri: avatar
                        }} style={styles.avatar} />
                    <View style={styles.onlineIndicator} />
                </View>

                {!!fullName && <Text style={styles.name}>{fullName}</Text>}
                {!!user.username && (
                    <Text style={styles.username}>@{user.username}</Text>
                )}
                {!!user.profile_app_profile.pseudonym && (
                    <Text style={styles.alias}>{user.profile_app_profile.pseudonym}</Text>
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