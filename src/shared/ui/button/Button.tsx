import { Pressable, Text, Image, View } from "react-native";
import { IPressableProps } from "./types";
import { buttonStyles } from "./styles";

export function Button(props: IPressableProps) {
	const { variant, text, iconLeft, iconRight } = props;

	return (
		<Pressable
			style={[
				buttonStyles.button,
				buttonStyles[variant],
				text && buttonStyles.buttonWithBigPadding,
			]}
			{...props}
		>
			<View style={buttonStyles.buttonContent}>
				{iconLeft}
				{text && (
					<Text
						style={[
							buttonStyles.buttonText,
							buttonStyles[`${variant}ButtonText`],
						]}
					>
						{text}
					</Text>
				)}
				{iconRight}
			</View>
		</Pressable>
	);
}
