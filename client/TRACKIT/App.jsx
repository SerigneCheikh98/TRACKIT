import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ToggleChoice from './components/ToggleChoice';
import Sliders from './components/Slider';
import UsersList from './components/UsersList';
import { useState } from 'react';
import BottomBar from './components/BottomBar';
import { Button, TextInput } from 'react-native-paper';
import InputForm from './components/InputForm';

export default function App() {
  return (
    <SafeAreaProvider>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <ToggleChoice />
        <InputForm />
        <UsersList />
        {/* <Sliders /> */}
      </SafeAreaView>
      <BottomBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
