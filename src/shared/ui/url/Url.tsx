import { View, Text } from "react-native";
import { UrlProps } from "./types";

import { styles } from "./styles";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Link, usePathname } from "expo-router";


export function Url(props: UrlProps) {
    const [fontsLoaded] = useFonts({
        "GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
    });
    const pathName = usePathname()
    if (!fontsLoaded) {
        return null;
    }
    const { text, icon, href, isChat } = props
    return (
        <Link href = {href}>
            <View
                style={[
                    styles.url,
                    pathName === href ? styles.urlSelected : null,
                    isChat &&
                    (
                        pathName === "/contacts" ||
                        pathName === "/notifications" ||
                        pathName === "/groupChats"
                    )
                    ? styles.urlSelected
                    : null
                ]}
                >
                {icon}
                <Text style={[styles.urlText]}>{text}</Text>
            </View>
        </Link>
    )
}