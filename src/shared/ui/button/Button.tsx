import { Pressable, Text, Image } from "react-native"
import { IPressableProps } from "./types"
import { buttonStyles } from "./styles"

export function Button(props: IPressableProps) {
    const {variant, icon, text, iconAlign} = props

    return (
        <Pressable style={[buttonStyles.button, buttonStyles[variant]]} {...props}>
            <Text style={[buttonStyles.buttonText, buttonStyles[`${variant}ButtonText`]]}>
                {text}
            </Text>
            <Image source={{uri: icon}} style={buttonStyles.buttonImage}></Image>
        </Pressable>
    )
}