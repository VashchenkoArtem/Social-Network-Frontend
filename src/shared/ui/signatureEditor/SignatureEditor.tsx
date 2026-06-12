import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import { Button } from "@shared/ui/button";
import { Props } from "./types";
import { styles } from "./styles";

export function SignatureEditor({ onOK, setIsDriwing }: Props) {
    const ref = useRef<SignatureViewRef>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        ref.current?.readSignature();
    };

    const handleSave = () => {
        ref.current?.readSignature();
    };

    const handleOK = (signature: string) => {
        setIsEditing(false);
        onOK(signature);
    };

    return (
        <View style={styles.container}>
            <View style={styles.canvasWrapper}>
                <SignatureScreen
                    ref={ref}
                    onOK={handleOK}
                    onBegin={() => setIsDriwing(true)}
                    onEnd={() => setIsDriwing(false)}
                    style={{ height: 65 }}
                    webStyle={`
                        .m-signature-pad--footer { display: none; }
                        .m-signature-pad--body {
                            background-color: white;
                        }
                        canvas {
                            background-color: white;
                        }
                    `}
                    autoClear={false}
                    imageType="image/png"
                />
            </View>

            {!isEditing ? (
                <View style={styles.row}>
                    <Button
                        text="Редагувати підпис"
                        variant="white"
                        onPress={handleEdit}
                    >
                        <Text style={styles.textConfirm}>Редагувати підпис</Text>
                    </Button>
                </View>
            ) : (
                <View style={styles.row}>
                    <Button
                        text="Зберегти"
                        variant="white"
                        onPress={handleSave}
                    >
                        <Text style={styles.textConfirm}>Зберегти</Text>
                    </Button>
                </View>
            )}
        </View>
    );
}