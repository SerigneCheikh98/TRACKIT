import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './TopBar';
import ToggleChoice from './ToggleChoice';
import Sliders from './Slider';
import { useState, useCallback } from 'react';
import Calendar from './Calendar1';
import UsersList from './UsersList';
import BottomBar from './BottomBar';
import { Button, TextInput } from 'react-native-paper';
import InputForm from './InputForm';
import { DatePickerModal } from 'react-native-paper-dates';

const HomePage = ({ navigation, route }) => {
  const static_users = [{
    userId: 1,
    name: 'Liam',
    lastname: 'Carter',
    rating: 4,
    distance: 0.5
  },
  {
    userId: 2,
    name: 'Sophia',
    lastname: 'Chang',
    rating: 3,
    distance: 0.8
  },
  {
    userId: 3,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 12
  },
  {
    userId: 4,
    name: 'Gianni',
    lastname: ' ',
    rating: 5,
    distance: 15
  },
  {
    userId: 5,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 12
  },
  {
    userId: 6,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 12
  },
  {
    userId: 7,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 12
  },
  {
    userId: 8,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 12
  }
  ]
  const [users, setUsers] = useState([])

  const applyChange = () => {
    setUsers(static_users)
  }

  return (
    <SafeAreaProvider>
      <TopBar />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <ToggleChoice />
          <InputForm applyChange={applyChange}/>

          <UsersList users={users}/>
          {/* <Sliders /> */}
        </SafeAreaView>
      </ScrollView>
      <BottomBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});

export default HomePage


