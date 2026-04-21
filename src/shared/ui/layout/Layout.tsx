import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import { Header } from "../header";
import { SingleInput } from "../singleInput";
import { Footer } from "../footer";
import { usePathname } from "expo-router";
import { ReactNode } from "react";

export function Layout(props: { children?: ReactNode }) {
	const { children } = props;
	return (
		<SafeAreaView style={styles.container}>
			<Text>sadsadada</Text>
			{children}
			<Footer></Footer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		flex: 1,
		flexGrow: 1,
		justifyContent: "flex-end",
	},
});
