import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./src/shared/ui/button";
import { Input } from "./src/shared/ui/inputs";
import {
	ArrowIcon,
	LogoIcon,
	ManageIcon,
	PlusIcon,
} from "shared/ui/icons/buttons";
import { ExitIcon } from "shared/ui/icons/buttons/ExitIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "shared/constants/colors";
import { loginSchema } from "shared/ui/inputs/validation"; 



export default function App() {
	return (
		<SafeAreaView>
			<View>
				<View style={styles.header}>
					<LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
					<View style={styles.buttons}>
						<Button
							variant="white"
							iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
						></Button>
						<Button
							variant="white"
							iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
						></Button>
						<Button
							variant="white"
							iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
						></Button>
					</View>
				</View>
				<View style={styles.buttons}>
					<Button variant="purple" text="Button" />
					<Button
						variant="purple"
						text="Button"
						iconRight={<ArrowIcon color={COLORS.white} />}
					/>
					<Button
						variant="purple"
						text="Button"
						iconLeft={<ExitIcon color={COLORS.white} />}
					/>
				</View>
				
				<View style={styles.inputs}>
                    <Input 
                        name="email"
                        label="Email" 
                        placeholder="you@example.com"
                        validationSchema={loginSchema} 
                        keyboardType="email-address"
                        autoComplete="email"
                    />

                    <Input 
                        name="password"
                        label="Password" 
                        isPassword={true}
                        placeholder="Мінімум 6 символів"
                        validationSchema={loginSchema}
                    />
                </View>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		width: 20,
		height: 20,
		zIndex: 2,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 16,
		height: 56,
	},
	buttons: {
		flexDirection: "row",
		gap: 10,
	},
	inputs: {
		flexDirection: "column",
		gap: 10,
	},
});
