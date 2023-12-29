import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './TopBar';
import ToggleChoice from './ToggleChoice';
import Sliders from './Slider';
import { useState } from 'react';
import Calendar from './Calendar1';
import UsersList from './UsersList';
import BottomBar from './BottomBar';
import { Button, TextInput } from 'react-native-paper';
import InputForm from './InputForm';


const HomePage = ({navigation,route}) => {
    return(
      <SafeAreaProvider>
        <TopBar />
        <SafeAreaView style={styles.container}>
          <ToggleChoice />
          <InputForm />
          {/* <UsersList /> */}
          {/* <Sliders /> */}
        </SafeAreaView>
        {/* <BottomBar /> */}
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default HomePage


  