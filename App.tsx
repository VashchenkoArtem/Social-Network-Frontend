import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './src/shared/ui/button';

export default function App() {
  return (
    <View style={styles.container}>
      <Button variant='white' text='Публікація'></Button>
      <Button variant='purple' text='Надіслати'></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
