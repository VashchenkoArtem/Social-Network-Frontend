import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import * as yup from 'yup';
import { IInputProps } from "./types";
import { inputStyles } from "./styles"; 
import { PasswordEyeClose, PasswordEyeOpen } from "../icons/inputs";
import { COLORS } from "@shared/constants/colors";

export function Input(props: IInputProps) {
    const { 
        variant = "primary", 
        isPassword, 
        iconLeft, 
        style, 
        label, 
        name,
        error: externalError,
        validationSchema,
        onChangeText,
        ...rest 
    } = props;

    const [isSecure, setIsSecure] = useState(!!isPassword);
    const [internalError, setInternalError] = useState<string | null>(null);

    const validate = async (text: string): Promise<void> => {
        if (validationSchema && name) {
            try {
                const fieldSchema = yup.reach(validationSchema, name) as yup.AnySchema;
                await fieldSchema.validate(text, { abortEarly: false });
                
                setInternalError(null);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    setInternalError(err.errors[0]); 
                }
            }
        }
    };

    const handleChangeText = (text: string): void => {
        if (onChangeText) {
            onChangeText(text);
        }
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
                    placeholderTextColor={COLORS.gray}
                    autoCapitalize="none"
                    onBlur={() => validate(rest.value || '')}
                    {...rest}
                />
                
                {isPassword && (
                    <Pressable 
                        onPress={() => setIsSecure(!isSecure)} 
                        style={inputStyles.eyeIcon}
                    >
                        {isSecure ? (
                            <PasswordEyeClose 
                                color={COLORS.gray} 
                            />
                        ) : (
                            <PasswordEyeOpen 
                                color={COLORS.gray} 
                            />
                        )}
                    </Pressable>
                )}
            </View>

            {displayError && (
                <Text style={inputStyles.errorText}>
                    {displayError}
                </Text>
            )}
        </View>
    );
}