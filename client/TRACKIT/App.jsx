import { useState } from 'react';
import Calendar from './components/Calendar1';
import Login from './components/Login';
import HomePage from './components/Home';
import RegisterScreen from './components/Registration';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ToggleChoice from './components/ToggleChoice';
import Sliders from './components/Slider';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
      name="LoginPage"
      component={Login}
      options={{ headerShown: false} }

      />
      <Stack.Screen 
      name = "HomePage"
      component={HomePage}
      options={{ headerShown: false} }
      />
      <Stack.Screen 
      name = "RegistrationPage"
      component={RegisterScreen}
      options={{ headerShown: false} }
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
