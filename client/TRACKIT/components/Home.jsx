import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react';
import UsersList from './UsersList';
import BottomBar from './BottomBar';
import RequestCard from './RequestCard';
import InputForm from './InputForm';
import API from '../API';
import Separator from './Separator';
import Popup from './Popup';
import TopBar from './TopBar';
import { Modal, Pressable } from 'react-native';

import Badge from 'react-native-paper';
import NotificationPage from './NotificationPage';

const HomePage = ({ navigation, route }) => {

  const static_users = [{
    userId: 1,
    name: 'Liam',
    lastname: 'Carter',
    rating: 4,
    distance: 0.5,
    from: '09:00',
    to: '12:00'
  },
  {
    userId: 2,
    name: 'Sophia',
    lastname: 'Chang',
    rating: 3,
    distance: 120,
    from: '13:00',
    to: '16:00'
  },
  {
    userId: 3,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 5,
    distance: 200,
    from: '17:00',
    to: '18:00'
  },
  {
    userId: 4,
    name: 'Gianni',
    lastname: ' ',
    rating: 2,
    distance: 15,
    from: '17:00',
    to: '20:00'
  },
  {
    userId: 5,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 1,
    distance: 150,
    from: '19:00',
    to: '22:00'
  },
  {
    userId: 6,
    name: 'Oliver',
    lastname: 'Patel',
    rating: 0,
    distance: 24,
    from: '21:00',
    to: '22:30'
  }
  ]
  const [users, setUsers] = useState([])
  const [inUseFilter, setInUseFilter] = useState(0) // 0 none - 1 distance - 2 rating
  const [available, setAvailable] = useState(true)

  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState('min');

  const [badgeOn, setBadgeOn] = useState(false);
  const [page, setPage] = useState('home'); // home OR notification

  const applyChange = () => {
    // API call for precise search
    // found => setUsers(results)
    // not found
    setAvailable(false)
    // API call for the day
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


  function handleSetFilter(choice) {
    if (inUseFilter == 1 && choice != 1) {
      setInUseFilter(2)
    }
    else if (inUseFilter == 2 && choice != 2) {
      setInUseFilter(1)
    }
    else if (inUseFilter == 0) {
      setInUseFilter(choice)
    }
    else {
      setInUseFilter(0)
    }
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [popupText, setPopupText] = useState('')
  const [popupFn, setPopupFn] = useState([{
    name: '',
    fn: () => { }
  }])

  function throwPopup(text, buttons) {
    setModalVisible(true)
    setPopupText(text)
    setPopupFn(buttons)
  }

  function closePopup() {
    setModalVisible(false)
  }
  return (
    <SafeAreaProvider>
      <TopBar navigation={navigation} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {modalVisible && <View style={styles.overlay} />}
          <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text={popupText} buttons={popupFn} />
          {page == 'notification' && <NotificationPage throwPopup={throwPopup} closePopup={closePopup}/>}
          {page == 'home' &&
            <>
              <InputForm duration={duration} setDuration={setDuration} timeUnit={timeUnit} setTimeUnit={setTimeUnit} applyChange={applyChange} />
              {
                available == false &&
                <>
                  <RequestCard throwPopup={throwPopup} closePopup={closePopup} badgeOn={badgeOn} setBadgeOn={setBadgeOn} />
                  <Separator text={'OR'} />
                </>
              }
              <UsersList users={users} inUseFilter={inUseFilter} handleSetFilter={handleSetFilter} available={available} duration={duration} timeUnit={timeUnit} throwPopup={throwPopup} closePopup={closePopup} />
            </>
          }
        </SafeAreaView>
      </ScrollView>
      {/* <BottomBar /> */}
      {/* <BottomBar /> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default HomePage


