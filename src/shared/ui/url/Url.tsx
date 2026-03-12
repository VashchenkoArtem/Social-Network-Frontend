import { View, Text } from "react-native";
import { UrlProps } from "./types";

import { styles } from "./styles";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Link } from "expo-router";


export function Url(props: UrlProps) {
    const [fontsLoaded] = useFonts({
        "GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    const { text, icon, href } = props
    return (
        <Link href = {href}>
            <View  style={styles.url}>
                {icon}
                <Text style={styles.urlText}>{text}</Text>
            </View>
        </Link>
    )
}