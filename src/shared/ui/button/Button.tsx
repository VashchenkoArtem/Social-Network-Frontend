import { Pressable, Text, Image, View } from "react-native";
import { IPressableProps } from "./types";
import { buttonStyles } from "./styles";
import { usePathname } from "expo-router";

export function Button(props: IPressableProps) {
	const { variant, text, iconLeft, iconRight, href } = props;
	let pathName = ""
	if (href)  {
		pathName = usePathname() 
	}

	return (
		<Pressable
			style={[
				buttonStyles.button,
				buttonStyles[variant],
				text && buttonStyles.buttonWithBigPadding,
				pathName === href ? buttonStyles.selectedButton: null
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
