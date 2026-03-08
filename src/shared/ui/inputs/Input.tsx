import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { IInputProps } from "./types";
import { inputStyles } from "./styles"; 
import { PasswordEye } from "../icons/inputs";
import { COLORS } from "shared/constants/colors";
import * as yup from 'yup';

export function Input(props: IInputProps) {
    const { 
        variant = "primary", 
        isPassword, 
        iconLeft, 
        style, 
        label, 
        error: externalError,
        validationSchema,
        onChangeText,
        ...rest 
    } = props;

    const [isSecure, setIsSecure] = useState(!!isPassword);
    const [internalError, setInternalError] = useState<string | null>(null);

    const validate = async (text: string) => {
        if (validationSchema) {
            try {
                await validationSchema.validate(text);
                setInternalError(null);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    setInternalError(err.message);
                }
            }
        }
    };

    const handleChangeText = (text: string) => {
        if (onChangeText) onChangeText(text);
        validate(text);
    };

    const displayError = externalError || internalError;
    const currentVariant = displayError ? "secondary" : variant;

    return (
        <View style={inputStyles.wrapper}>
            {label && <Text style={inputStyles.label}>{label}</Text>}
            
            <View style={[inputStyles.container, inputStyles[currentVariant]]}>
                {iconLeft}
                <TextInput
                    style={[inputStyles.input, style]}
                    secureTextEntry={isPassword ? isSecure : false}
                    onChangeText={handleChangeText}
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

            {displayError && <Text style={inputStyles.errorText}>{displayError}</Text>}
        </View>
    );
}