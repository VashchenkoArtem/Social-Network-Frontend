import { useState } from "react";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();
const SERVER_IP = debuggerHost || "10.0.2.2";
const API_URL = `http://${SERVER_IP}:8000/api`;


export const useVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = async (payload: { email: string; code: string; userData: any }) => {
    setIsVerifying(true);
    try {
      const response = await fetch(`${API_URL}/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || result);

      if (result.token) {
          await AsyncStorage.setItem("userToken", result.token);
      }

      return result;
    } finally {
      setIsVerifying(false);
    }
  };

  return { verify, isVerifying };
};