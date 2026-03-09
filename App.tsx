import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "shared/ui/header";
import { Urls } from "shared/ui/urls/Urls";


export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style = {styles.container}>
				<Header></Header>
				<Urls></Urls>
				<StatusBar style="auto" />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		flex: 1,
		flexGrow: 1,
		justifyContent: 'space-between',
	},
});
