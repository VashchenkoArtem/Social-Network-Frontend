import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { COLORS } from "@shared/constants/colors";
import { styles } from "./styles";
import { Props } from "./types";



export function SignatureEditor({ onOK, onClear, onBegin, onEnd }: Props) {
  const ref = useRef<SignatureViewRef>(null);

  const handleConfirm = () => {
    ref.current?.readSignature();
  };

  const handleClear = () => {
    ref.current?.clearSignature();
    onClear();
  };

  const webStyle = `
    .m-signature-pad--footer { display: none; margin: 0px; }
    body, html { background-color: transparent; }
    .m-signature-pad { border: none; background-color: transparent; }
  `;

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <SignatureScreen
          ref={ref}
          onOK={onOK}
          webStyle={webStyle}
          autoClear={false}
          imageType="image/png"
          scrollable={false}
          onBegin={onBegin}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.miniBtn, styles.btnClear]} 
          onPress={handleClear}
          activeOpacity={0.7}
        >
          <Text style={styles.textClear}>Очистити</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.miniBtn, styles.btnConfirm]} 
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.textConfirm}>Підтвердити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}