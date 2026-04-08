import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WelcomeDetailsModal } from "@shared/ui/modalUIU/ModalUIU";

export default function HomePage() {
    const { isNewUser } = useLocalSearchParams<{ isNewUser?: string }>();
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(isNewUser === "true");

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Головна сторінка</Text>
            <WelcomeDetailsModal 
                isVisible={isWelcomeVisible} 
                onClose={() => setIsWelcomeVisible(false)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 18,
    }
});