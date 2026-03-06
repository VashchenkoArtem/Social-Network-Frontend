import { TextInputProps } from "react-native";

export interface IInputProps extends TextInputProps {
    variant: 'primary' | 'secondary';
    isPassword?: boolean;
    iconLeft?: React.ReactNode;
    label?: string;
    error?: string;
}