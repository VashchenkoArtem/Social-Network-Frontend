import { View, Text } from "react-native";
import { AdditionalUrlProps } from "./types";
import { Link, usePathname } from "expo-router";
import { styles } from "./styles"
import { useFonts } from "expo-font";

export function AdditionalUrl(props: AdditionalUrlProps){
    const [fontsLoaded] = useFonts({
        "GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
    });
    const pathName = usePathname()
    if (!fontsLoaded) {
        return null;
    }
    const { text, href } = props
    return (
        <Link href={href} style={pathName === href?styles.selectedAdditionalUrl:null}>
            <Text style = {[styles.additionalUrlText, pathName === href?styles.selectedAdditionalUrlText:null]}>{text}</Text>
        </Link>
    )
}