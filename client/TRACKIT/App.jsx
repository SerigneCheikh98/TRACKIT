import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ToggleChoice from './components/ToggleChoice';
import Sliders from './components/Slider';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState("");
  return (
    <SafeAreaProvider>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <ToggleChoice />
        <View >
          <Text>Location: </Text>
          <TextInput
            label="Location"
            value={text}
            onChangeText={text => setText(text)}
          />
        </View>
        <Sliders />
        <Text>Si proprio tu</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
