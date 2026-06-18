import { Pressable, Text, Image, View } from "react-native";
import { IPressableProps } from "./types";
import { buttonStyles } from "./styles";
import { usePathname } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "@shared/constants/colors";

export function Button(props: IPressableProps) {
	const { variant, text, iconLeft, iconRight, href, isSettings, buttonStyle, isLoadingAfter } =
		props;

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
				buttonStyle,
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
						ellipsizeMode="tail"
						numberOfLines={1}
						style={[
							buttonStyles.buttonText,
							buttonStyles[`${variant}ButtonText`],
							{ opacity: isLoadingAfter ? 0 : 1 },
						]}
					>
						{text}
					</Text>
				)}

				{isLoadingAfter && (
					<View style={{
						position: "absolute",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%"
					}}>
						<ActivityIndicator animating color={COLORS.foggy} />
					</View>
				)}
				{iconRight}
			</View>
		</Pressable>
	);
}
