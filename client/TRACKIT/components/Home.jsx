import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import UsersList from './UsersList';
import BottomBar from './BottomBar';
import RequestCard from './RequestCard';
import InputForm from './InputForm';
import API from '../API';
import Separator from './Separator';
import Popup from './Popup';
import TopBar from './TopBar';
import { Modal, Pressable } from 'react-native';
import { NotificationContext } from './NotificationContext';

import { ActivityIndicator } from 'react-native';
import Badge from 'react-native-paper';
import NotificationPage from './NotificationPage';
import { useFocusEffect } from '@react-navigation/native';


const HomePage = ({ navigation, route }) => {


  const [logging, setLogging] = useState(false)
  const [notification, setNotification] = useContext(NotificationContext)


  const [users, setUsers] = useState([])
  const [inUseFilter, setInUseFilter] = useState(0) // 0 time - 1 distance - 2 rating
  const [available, setAvailable] = useState(true)
  const [noAvailability, setNoAvailability] = useState(false)

  const [badgeOn, setBadgeOn] = useState(false);
  const [page, setPage] = useState('home'); // home OR notification
  const [alarmInput, setAlarmInput] = useState([false, false, false, false, false])

  let distances = useRef([]);

  function generateDist() {
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100));
    }

    distances.current = randomNumbers
  }

  function handleSetFilter(choice) {
   setInUseFilter(choice)
   console.log(choice)
    
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

  // params

  const [time, setTime] = useState('')
  const [date, setDate] = useState('');
  const [location, setLocation] = useState("");
  const [lastLocation, setLastLocation] = useState("")

  const [duration, setDuration] = useState("duration");
  const [timeUnit, setTimeUnit] = useState('min');

  const [dirty, setDirty] = useState(false)
  const [dirtySearch, setDirtySearch] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setDirtySearch(false);
      setDirty(false);
      setTimeUnit('min');
      setDuration("duration");
      setLocation("");
      setDate('');
      setTime('');
      setModalVisible(false);
      setAlarmInput([false, false, false, false, false]);
      setUsers([])
      setInUseFilter(0) // 0 none - 1 distance - 2 rating
      setAvailable(true)
      setNoAvailability(false)
    }, [])
  );

  const params = {
    time: time,
    setTime: setTime,
    date: date,
    setDate: setDate,
    location: location,
    setLocation: setLocation,
    duration: duration,
    setDuration: setDuration,
    timeUnit: timeUnit,
    setTimeUnit: setTimeUnit
  }

  function handleInsertRequest() {
    API.addRequestRide(params)
      .then(resp => {
        setNotification(true)
        closePopup()
      })
      .catch(err => {
        throwPopup(err.message, [{
          name: 'Close',
          fn: closePopup
        }])
      })
  }

  useEffect(() => {
    API.getNotification()
      .then(resp => {
        if (resp.length > 0 && resp.some(n => n.seen == 0)) {
          setNotification(true)
        }
        else setNotification(false)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (users.length == 0 && available == false) {
      setAvailable(true)
    }
  }, [params.time, params.date, params.location, params.duration, params.timeUnit])

  useEffect(() => {
    if (dirtySearch == true) {
      setUsers([])
      setAvailable(true)
      setDirtySearch(false)
    }
  }, [dirtySearch])

  const applyChange = () => {
    const paramsObj = {
      "location": params.location,
      "date": params.date,
      "time": params.time,
      "duration": params.duration,
      "timeUnit": params.timeUnit
    }

    // form checks
    setNoAvailability(false)
    let tmp
    tmp = alarmInput
    if (params.location.trim() === '') {
      tmp[0] = true
    } else tmp[0] = false
    if (params.date === '') {
      tmp[1] = true
    } else tmp[1] = false
    if (params.time === '') {
      tmp[2] = true
    } else tmp[2] = false
    if (params.duration === '' || params.duration == undefined) {
      tmp[3] = true
    } else tmp[3] = false
    if (params.timeUnit === '') {
      tmp[4] = true
    } else tmp[4] = false
    if (alarmInput.some(item => item === true)) {
      setDirty(true)
      return
    }
    setAlarmInput([false, false, false, false, false])
    setDirty(false)
    // ===============

    if (lastLocation !== location || lastLocation === '') {
      generateDist()
    }

    if(duration === 'duration')
      return

    API.searchRide(paramsObj)
      .then(resp => {
        console.log(resp)
        if (resp.length > 0) {
          resp = resp.map((item, index) => {
            return {
              ...item,
              distance: distances.current[index % 10]
            }
          })
          setUsers(resp)
          setAvailable(true)
          setLastLocation(location)
        }
        else {
          const tmp_params = {
            "location": params.location,
            "date": params.date
          }
          API.getDailyRide(tmp_params)
            .then(resp => {
              setAvailable(false)
              if (resp.length > 0) {
                resp = resp.map((item, index) => {
                  return {
                    ...item,
                    distance: distances.current[index % 10]
                  }
                })
                setUsers(resp)
                setLastLocation(location)
              }
              else {
                
                setLastLocation(location)
                setNoAvailability(true)
                setUsers([])
              }
            })
            .catch(err => {
              throwPopup('Network request failed', [{
                name: 'Close',
                fn: closePopup
              }])
            })
        }
      })
      .catch(err => {
        throwPopup('Network request failed', [{
          name: 'Close',
          fn: closePopup
        }])
      })
  }

  return (
    <SafeAreaProvider>
      <TopBar navigation={navigation} />
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
        {/* <SafeAreaView style={{backgroundColor: "#FFFFFF"}}> */}
        <View style={{ flex: 1 }}>
          <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text={popupText} buttons={popupFn} />
          {page == 'notification' && <NotificationPage throwPopup={throwPopup} closePopup={closePopup} />}
          {page == 'home' &&
            <View style={styles.container}>
              <InputForm params={params} throwPopup={throwPopup} closePopup={closePopup} applyChange={applyChange} logging={logging} setLogging={setLogging} alarmInput={alarmInput} dirty={dirty} setDirtySearch={setDirtySearch} />
             { logging && <View style={{ flex:1 ,justifyContent:'center', alignContent:'center', alignItems:'center'}}>
             <Text style={{fontWeight:'bold', marginTop:'2%', marginBottom:'1%'}}>Locating you</Text>
              <Text style={{ marginBottom:'1%'}}>This might take few seconds</Text>
              <ActivityIndicator size='large' animating={logging} />
              </View>}
              {
              !available && !dirtySearch &&
                <View style={{ backgroundColor: "#ffffff" }}>

                  <RequestCard params={params} handleInsertRequest={handleInsertRequest} throwPopup={throwPopup} closePopup={closePopup} badgeOn={badgeOn} text={'We are sorry! No drivers are available for the specified time or duration'} setBadgeOn={setBadgeOn} />
                  {
                    (noAvailability == false && UsersList.length) &&
                    <View style={{
                      alignContent:'center',
                      alignItems:'center',
                      justifyContent:'center'
                    }} >
                    <Separator text={'OR'} />
                    <Text style={{
                      
                      fontWeight:'400',
                      marginLeft:'7%'
                    }}>Chooose from available slots in the same day:</Text>
                    </View>
                  }
                </View>
              }
              <UsersList users={users} params={params} inUseFilter={inUseFilter} handleSetFilter={handleSetFilter} available={available} throwPopup={throwPopup} closePopup={closePopup} />
            </View>
          }
        </View>
        {/* </SafeAreaView> */}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    height: "100%"

  },
});

export default HomePage


