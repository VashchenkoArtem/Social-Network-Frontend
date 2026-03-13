import { ReactNode } from "react";
import { TextInputProps } from "react-native";
import * as yup from "yup";

export interface IInputProps extends TextInputProps {
	name?: string;
	variant?: "primary" | "secondary";
	isPassword?: boolean;
	iconLeft?: ReactNode;
	label?: string;
	error?: string;
	validationSchema?: yup.AnySchema;
}
