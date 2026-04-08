import React, { useRef } from "react";
import { View, Text } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { Button } from "@shared/ui/button";
import { Props } from "./types";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native";


export function SignatureEditor({ onOK, onClear }: Props) {
  const ref = useRef<SignatureViewRef>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Намалюйте ваш підпис:</Text>
      
      <View style={styles.canvasWrapper}>
        <SignatureScreen
          ref={ref}
          onOK={onOK}
          webStyle={`.m-signature-pad--footer { display: none; }`}
          autoClear={false}
          imageType="image/png"
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.miniBtn, styles.btnClear]} 
          onPress={() => {
            ref.current?.clearSignature();
            onClear();
          }}
        >
          <Text style={styles.textClear}>Очистити</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.miniBtn, styles.btnConfirm]} 
          onPress={() => ref.current?.readSignature()}
        >
          <Text style={styles.textConfirm}>Підтвердити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
