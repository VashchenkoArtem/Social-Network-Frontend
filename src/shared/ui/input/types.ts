import { ReactNode } from "react"
import { TextInputProps, TextStyle, ViewStyle } from "react-native"

export interface InputProps extends TextInputProps {
    iconRight?: ReactNode,
    iconLeft?: ReactNode,

    label?: string,
    labelStyle?: TextStyle,
    
    inputContainerStyle?: ViewStyle,
    error?: string | null
}

