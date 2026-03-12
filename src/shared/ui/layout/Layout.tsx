import { SafeAreaView } from "react-native-safe-area-context";
import { Urls } from "../urls/Urls";
import { StyleSheet

 } from "react-native";
import { Header } from "../header";
export function Layout(){
    return (
        <SafeAreaView style = {styles.container}>
            <Urls></Urls>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		flex: 1,
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
});