import { Text, TextInput, View } from "react-native";
import { InputProps } from "./input.types";
import { styles } from "./input.styles";

export function Input(props: InputProps) {
	const {
		iconLeft,
		iconRight,

		label,
		labelStyle,

		inputContainerStyle,
		error,
		style,
		...restProps
	} = props

	return (
		<View>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

			<View style={[styles.inputContainer, inputContainerStyle]}>
				{iconLeft}
				<TextInput style={[styles.input, style]} {...restProps} />
				{iconRight}
			</View>
		</View>
	)
}