import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet

 } from "react-native";
import { Header } from "../header";
import { SingleInput } from "../singleInput";
import { Footer } from "../footer";
export function Layout(){
    return (
        <SafeAreaView style = {styles.container}>
            <Footer></Footer>
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