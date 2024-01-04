import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
    distance: 120
  },
  {
    userId: 3,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 200
  },
  {
    userId: 4,
    name: 'Gianni',
    lastname: ' ',
    rating: 2,
    distance: 15
  },
  {
    userId: 5,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 1,
    distance: 150
  },
  {
    userId: 6,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 0,
    distance: 24
  }
  ]
  const [users, setUsers] = useState([])
  const [bookingType, setBookingType] = useState('left')
  const [inUseFilter, setInUseFilter] = useState(0) // 0 none - 1 distance - 2 rating

  const applyChange = () => {
    setUsers(static_users)
  }

  function handleToggle(pos) {
    if(bookingType == 'left' && pos != 'left') {
      setBookingType('right')
      setUsers([])
    }
    else if(bookingType == 'right' && pos != 'right') {
      setBookingType('left')
      setUsers([])
    }
  }

  function handleSetFilter(choice) {
    if(inUseFilter == 1 && choice != 1) {
      setInUseFilter(2)
    }
    else if(inUseFilter == 2 && choice != 2) {
      setInUseFilter(1)
    }
    else if(inUseFilter == 0) {
      setInUseFilter(choice)
    }
    else {
      setInUseFilter(0)
    }
  }

  return (
    <SafeAreaProvider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <ToggleChoice bookingType={bookingType} handleToggle={handleToggle} />
          <InputForm bookingType={bookingType} applyChange={applyChange}/>

          <UsersList users={users} inUseFilter={inUseFilter} handleSetFilter={handleSetFilter}/>
          {/* <Sliders /> */}
        </SafeAreaView>
      </ScrollView>
      {/* <BottomBar /> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  }
});

export default HomePage


