import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { OtpInput } from '@shared/ui/OptInput'; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVerification } from '@modules/useVerification'; 
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegistrationStepTwo() {
  const router = useRouter();
  const { email, password } = useLocalSearchParams<{ email: string; password: string }>(); 
  const [fullCode, setFullCode] = useState('');
  const { verify, isVerifying } = useVerification();

  const handleConfirm = async () => {
    try {
      const result = await verify({ email, code: fullCode, userData: { email, password } });
      
      if (result.token) {
          await AsyncStorage.setItem("userToken", result.token);
          setTimeout(() => {
              router.replace("/(tabs)/home");
          }, 100);
        }
    } catch (error: any) {
        Alert.alert("Помилка", error.message || "Невірний код");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Підтвердження пошти</Text>
        <Text style={styles.subtitle}>
          Ми надіслали код на <Text style={{ fontWeight: 'bold' }}>{email}</Text>
        </Text>

        <OtpInput onCodeFilled={setFullCode} />

        <TouchableOpacity 
          style={[styles.confirmButton, isVerifying && { opacity: 0.7 }]} 
          onPress={handleConfirm}
          disabled={isVerifying}
        >
          <Text style={styles.buttonText}>
            {isVerifying ? "Перевірка..." : "Підтвердити"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}