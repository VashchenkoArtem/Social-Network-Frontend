import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Header } from '@shared/ui/header';
import { COLORS } from '@shared/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name = "(friends)"/>
      </Stack>
    </SafeAreaProvider>
  );
}