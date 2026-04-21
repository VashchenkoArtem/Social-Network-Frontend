import React, { useRef } from "react";
import { View, Text } from "react-native";
import SignatureScreen, {
	SignatureViewRef,
} from "react-native-signature-canvas";
import { Button } from "@shared/ui/button";
import { Props } from "./types";
import { styles } from "./styles";

export function SignatureEditor({ onOK, setIsDriwing }: Props) {
	const ref = useRef<SignatureViewRef>(null);

	return (
		<View style={styles.container}>
			<View style={styles.canvasWrapper}>
				<SignatureScreen
					ref={ref}
					onOK={onOK}
					onBegin={() => setIsDriwing(true)}
					onEnd={() => setIsDriwing(false)}
					style={{ height: 65 }}
					webStyle={`.m-signature-pad--footer { display: none; }`}
					autoClear={false}
					imageType="image/png"
				/>
			</View>

			<View style={styles.row}>
				<Button
					text="Редагувати підпис"
					variant="white"
					onPress={() => ref.current?.readSignature()}
				>
					<Text style={styles.textConfirm}>Редагувати підпис</Text>
				</Button>
			</View>
		</View>
	);
}
