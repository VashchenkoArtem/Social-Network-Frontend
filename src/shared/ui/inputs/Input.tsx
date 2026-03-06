import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { IInputProps } from "./types";
import { inputStyles } from "./styles"; 
import { PasswordEye } from "../icons/inputs";
import { COLORS } from "shared/constants/colors";


export function Input(props: IInputProps) {
    const { variant, isPassword, iconLeft, style, label, error, ...rest } = props;
    const [isSecure, setIsSecure] = useState(!!isPassword);

    return (
        <View style={inputStyles.wrapper}>
            {label && <Text style={inputStyles.label}>{label}</Text>}
            
            <View style={[inputStyles.container, inputStyles[variant]]}>
                {iconLeft}
                <TextInput
                    style={[inputStyles.input, style]}
                    secureTextEntry={isPassword ? isSecure : false}
                    {...rest}
                />
                {isPassword && (
                    <Pressable 
                        onPress={() => setIsSecure(!isSecure)} 
                        style={inputStyles.eyeIcon}
                    >
                        <PasswordEye color={isSecure ? COLORS.gray : COLORS.black} />
                    </Pressable>
                )}
            </View>

            {error && <Text style={inputStyles.errorText}>{error}</Text>}
        </View>
    );
}