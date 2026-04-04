import { useState, useRef } from "react";
import {
	View,
	TextInput,
	NativeSyntheticEvent,
	TextInputKeyPressEvent,
} from "react-native";
import { SingleInput } from "../singleInput";
import { OtpInputProps } from "./types";
import { styles } from "./styles";

export function OtpInput({ onCodeFilled }: OtpInputProps) {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputs = useRef<Array<TextInput | null>>([]);

	const handleChange = (text: string, index: number) => {
		const cleanText = text.replace(/[^0-9]/g, "");

		const newCode = [...code];
		newCode[index] = cleanText;
		setCode(newCode);

		if (cleanText && index < 5) {
			inputs.current[index + 1]?.focus();
		}

		const finalCode = newCode.join("");
		if (finalCode.length === 6) {
			onCodeFilled(finalCode);
		}
	};

	const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
		if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
			inputs.current[index - 1]?.focus();

			const newCode = [...code];
			newCode[index - 1] = "";
			setCode(newCode);
		}
	};

	return (
		<View style={styles.container}>
			{code.map((digit, index) => (
				<SingleInput
					key={index}
					ref={(ref: TextInput | null) => {
						inputs.current[index] = ref;
					}}
					value={digit}
					onChangeText={(text) => handleChange(text, index)}
					onKeyPress={(e) => handleKeyPress(e, index)}
					keyboardType="number-pad"
					maxLength={1}
					inputContainerStyle={styles.otpSingleContainer}
				/>
			))}
		</View>
	);
}
