import { Pressable, Text, Image, View } from "react-native";
import { IPressableProps } from "./types";
import { buttonStyles } from "./styles";
import { usePathname } from "expo-router";
import { useFonts } from "expo-font";

export function Button(props: IPressableProps) {
	const { variant, text, iconLeft, iconRight, href, isSettings } = props;

	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Medium": require("../../../assets/fonts/GTWalsheimPro-Medium.ttf"),
	});

	const pathName = usePathname();

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Pressable
			style={[
				buttonStyles.button,
				buttonStyles[variant],
				text && buttonStyles.buttonWithBigPadding,
				href && pathName === href ? buttonStyles.selectedButton : null,
				isSettings &&
					(pathName === "/settings/personalInformation" ||
					pathName === "/settings/albums"
						? buttonStyles.selectedButton
						: null),
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
