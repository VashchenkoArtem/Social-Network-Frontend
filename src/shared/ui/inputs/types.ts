import { TextInputProps } from "react-native";
import * as yup from 'yup';

export interface IInputProps extends TextInputProps {
    variant?: 'primary' | 'secondary';
    isPassword?: boolean;
    iconLeft?: React.ReactNode;
    label?: string;
    error?: string;
    validationSchema?: yup.AnySchema;
}