import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useUpdateUserInfoMutation } from "@modules/auth/api/userApi";
import { Props } from "./types";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";


export function WelcomeDetailsModal({ isVisible, onClose }: Props) {
    const [firstname, setFirstname] = useState("");
    const [nickname, setNickname] = useState("");
    const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

    const handleConfirm = async () => {
      const cleanFirstname = firstname.trim();
      let cleanNickname = nickname.trim();
      if (!cleanFirstname || !cleanNickname) {
          onClose();
          return;
      }
      if (!cleanNickname.startsWith('@')) {
          cleanNickname = `@${cleanNickname}`;
      }
      try {
          await updateUser({ 
              firstname: cleanFirstname, 
              nickname: cleanNickname 
          }).unwrap();
          onClose();
      } catch (err) {
          onClose();
      }
  };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.modalCard}>
                        <Text style={styles.title}>Додай деталі про себе</Text>

                        <View style={styles.inputGap}>
                            <Input
                                label="Псевдонім автора"
                                placeholder="Введіть Псевдонім автора"
                                value={firstname}
                                onChangeText={setFirstname}
                            />

                            <Input
                                label="Ім’я користувача"
                                placeholder="@"
                                value={nickname}
                                onChangeText={setNickname}
                                autoCapitalize="none"
                            />
                        </View>

                        <Text style={styles.hint}>
                            Або оберіть: <Text style={styles.highlight}>(Запропоновані варіанти відповідно до Ім’я та Прізвища)</Text>
                        </Text>

                        <View style={styles.footer}>
                            <Button
                                variant="purple"
                                text={isLoading ? "..." : "Продовжити"}
                                onPress={handleConfirm}
                                disabled={isLoading} 
                                style={styles.button}
                                isBackgroundColor="preWhite"
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
}