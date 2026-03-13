import type { InputProps } from "./types";
import { styles } from "./styles";
import { View, Text, TextInput } from "react-native";

export function SingleInput(props: InputProps) {
	const {
		iconLeft,
		iconRight,

		label,
		labelStyle,
		inputContainerStyle,
		error,
		style,
		value,
		...restProps
	} = props;

	return (
		<View>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

			<View style={[styles.inputContainer, inputContainerStyle]}>
				<TextInput
					style={[styles.input, style]}
					maxLength={1}
					value={value}
					keyboardType="number-pad"
					{...restProps}
				/>

				{!value && <View style={styles.underline} />}
			</View>
		</View>
	);
}
