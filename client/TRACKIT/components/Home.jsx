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

import { ActivityIndicator } from 'react-native';
import Badge from 'react-native-paper';
import NotificationPage from './NotificationPage';

const HomePage = ({ navigation, route }) => {


  const [logging, setLogging] = useState(false)

  const [users, setUsers] = useState([])
  const [inUseFilter, setInUseFilter] = useState(0) // 0 none - 1 distance - 2 rating
  const [available, setAvailable] = useState(true)
  const [noAvailability, setNoAvailability] = useState(false)

  const [badgeOn, setBadgeOn] = useState(false);
  const [page, setPage] = useState('home'); // home OR notification

  const applyChange = () => {
    const paramsObj = {
      "location": params.location,
      "date": params.date,
      "time": params.time,
      "duration": params.duration,
      "timeUnit": params.timeUnit
    }         
    setNoAvailability(false)

    API.searchRide(paramsObj)
      .then( resp => {
        if(resp.length > 0) {
          setUsers(resp)
          setAvailable(true)
        }
        else {
          const tmp_params = {
            ...paramsObj,
            "time": "00:00"
          }
          API.searchRide(tmp_params)
            .then( resp => {

              setAvailable(false)
              if(resp.length > 0) {
                setUsers(resp)
              }
              else {
                setNoAvailability(true)
                setUsers([])
              }
            })
            .catch( err => {
              console.log(err)
            })
        }
      })
      .catch( err => {
        console.log(err)
      })
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

  const [time, setTime] = useState('12:00')
  const [date, setDate] = useState('17/02/2024');
  const [location, setLocation] = useState("Torino");

  const [duration, setDuration] = useState("30");
  const [timeUnit, setTimeUnit] = useState('min');


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
      .then( resp => {
        closePopup()
      })
      .catch( err => console.log(err) )
  } 

  useEffect( () => {
    if(users.length == 0 && available == false) {
      setAvailable(true)
    }
  }, [params.time, params.date, params.location, params.duration, params.timeUnit])

  return (
    <SafeAreaProvider>
      <TopBar navigation={navigation} />
      <ScrollView style={{backgroundColor: "#FFFFFF"}}>
        {/* <SafeAreaView style={{backgroundColor: "#FFFFFF"}}> */}
          {modalVisible && <View style={styles.overlay} />}
         <View style={{flex: 1}}>
          <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} text={popupText} buttons={popupFn} />
          {page == 'notification' && <NotificationPage throwPopup={throwPopup} closePopup={closePopup}/>}
          {page == 'home' &&
          <View style={styles.container}>
              <InputForm params={params} applyChange={applyChange} logging={logging} setLogging={setLogging} />
             <ActivityIndicator animating={logging}/>
              {
                available == false &&
                <View style={{backgroundColor:"#ffffff"}}>
                
                  <RequestCard params={params}   handleInsertRequest={handleInsertRequest} throwPopup={throwPopup} closePopup={closePopup} badgeOn={badgeOn} text={'We are sorry, currently no drivers are available at this time :\'('} setBadgeOn={setBadgeOn} />
                  {
                    noAvailability == false && 
                    <Separator text={'OR'} />
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
        borderRadius:5,
        backgroundColor:"#FFFFFF",
        height:"100%"
       
    },
});

export default HomePage


