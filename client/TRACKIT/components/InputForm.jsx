import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button, TextInput, Text, IconButton, Icon } from 'react-native-paper';
import { useState, useCallback } from "react";
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location'
import API from "../API";
import dayjs from "dayjs";

const slots = [
  { label: "min", value: 'min' },
  { label: "hours", value: 'hours' },
]

const time_value = {
  'min': [
    { label: "30", value: 30 },
    { label: "45", value: 45 }
  ],
  'hours': [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 }
  ]
}

const InputForm = (props) => {
  const [onFocusg, setOnFocusg] = useState(false);
  const [locationhi ,setLocationhi] = useState('Torino')

  //TIME PICKER
  const [visible, setVisible] = useState(false)

  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      props.setDirtySearch(true)
      setVisible(false);
      props.params.setTime(`${hours}:${minutes}`)
    },
    [setVisible]
  );


  // LOCATION HANDLING
  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      props.params.setLocation('error')
      return;
    }

    let text = await Location.getCurrentPositionAsync({});
    text = JSON.stringify(text);
    // console.log(JSON.parse(text))
    API.getCity(JSON.parse(text).coords.latitude, JSON.parse(text).coords.longitude)
      .then(res => {
          props.params.setLocation(`${res.address.city} ${res.address.road}`)
          props.setLogging(false)
      })
      .catch(err => {
        props.throwPopup('Error while getting your position', [{
          name: 'Close',
          fn: props.closePopup
        }])
      })
    // console.log(location)
  }


  // DATE PICKER
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      props.setDirtySearch(true)
      props.params.setDate(dayjs(params.date).format('DD/MM/YYYY').toString());
    },
    [setOpen, props.params.setDate]
  );

    const [pressSearch, setPressSearch] = useState(false)

  return (
    <>
      <View
      style={{
        backgroundColor:'rgba(31, 25, 55, 0.7)',
        paddingHorizontal:'3%',
        paddingVertical:'10%',
        
        marginHorizontal:'2%',
        borderRadius:20,
        alignContent:'center',
        alignItems:'center'
        
      }}
      >
        <Text
        style={
  
          {
            fontWeight:'bold',
           
            marginBottom:'5%',
          
            fontSize:18,
            color:'white'
  
          }
        }
        >Book your next practice now </Text>
      <View style={styles.container}>

        {/* LOCATION */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ flex: 1, backgroundColor: 'white' }}
            mode='outlined'
            label="Location"
            outlineColor={props.alarmInput[0] == true  ? 'red' : '#1F1937'}
            activeOutlineColor={props.alarmInput[0] == true ? 'red' : '#1F1937'}
            value={props.params.location}
            onChangeText={location => {
              props.setDirtySearch(true)
              props.params.setLocation(location)
            }}
          />
          <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', alignContent:'center',  }}>
            <IconButton style={[styles.submitButton, ]} size={30} iconColor="white" backgroundColor="rgba(31, 25, 55, 0.7)" icon='crosshairs-gps'  mode="contained" onPress={() => { 
             props.setDirtySearch(true)
              handleGetLocation();
            props.setLogging(true);
            
            }} />
          </View>
        </View>

        {/* DATE TIME*/}
        <View style={{ ...styles.textInputContainer, alignItems: 'center' }}>
          {/* DATE */}
          <View style={{ flex: 2, paddingRight: '2%', backgroundColor: 'white' }}>
        
            <Pressable onPress={() => {props.params.setDate(undefined);setOpen(true)}}>
              <View pointerEvents="none">
                <TextInput
                  mode='outlined'
                  label="DD/MM/YYYY"
                  style={{backgroundColor: 'white'}}
                  outlineColor={props.alarmInput[1] == true ? 'red' : '#1F1937'}
                  activeOutlineColor={props.alarmInput[1] == true ? 'red' : '#1F1937'}
                  value={props.params.date}
                  labelStyle={{ color: '#1F1937' }}
                />
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={props.params.date}
                  validRange={{startDate: new Date()}}
                  presentationStyle={'pageSheet'}
                  onConfirm={onConfirmSingle}
                />
              </View>
            </Pressable>
          </View>

          {/* TIME */}
          <View style={{ flex: 1, paddingRight: '2%', backgroundColor: 'white' }} >

            <Pressable onPress={() => setVisible(true)}>
              <View pointerEvents="none">
                <TextInput
                  mode='outlined'
                  label="Time"
                  style={{backgroundColor: 'white'}}
                  outlineColor={props.alarmInput[2] == true ? 'red' : '#1F1937'}
                  activeOutlineColor={props.alarmInput[2] == true ? 'red' : '#1F1937'}
                  value={props.params.time}
                  labelStyle={{ color: '#1F1937' }}
                />
                <TimePickerModal
                  visible={visible}
                  onDismiss={onDismiss}
                  onConfirm={onConfirm}
                  hours={12}
                  minutes={14}
                />
              </View>
            </Pressable>
          </View>
        </View>

        {/* DURATION */}
        <View style={{ ...styles.textInputContainer, alignItems: 'center' }}>
          <View style={{ flex: 2 }}>
            <Dropdown
              style={{...styles.dropdown, borderColor: props.alarmInput[3] == true ? 'red' : '#1F1937'}}
              data={time_value[props.params.timeUnit]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              activeColor='#F9C977'
              placeholder={"Duration"}
              value={""}

              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                props.setDirtySearch(true);
                props.params.setDuration(item);
                setOnFocusg(false);
              }}
              onFocus={() => {
                setOnFocusg(true);
              }}
              onBlur={() => { setOnFocusg(false) }}
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: '2%' }}>
            <Dropdown
              style={{...styles.dropdown, borderColor: props.alarmInput[4] == true ? 'red' : '#1F1937'}}
              data={slots}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              activeColor='#F9C977'

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={props.params.timeUnit}
              onChange={(item) => {
                props.setDirtySearch(true)
                props.params.setTimeUnit(item.value);
                setOnFocusg(false);
              }}
              onFocus={() => {
                setOnFocusg(true);
              }}
              onBlur={() => { setOnFocusg(false) }}
            />
          </View>
        </View>

        {/* SUBMIT */}
        <View style={styles.textInputContainer}>
          <View style={{ flex: 2 }}></View>
          <Pressable  style={[styles.submitButton, {backgroundColor:'#1F1937',paddingHorizontal:'5%',
    paddingVertical:'3%',}]} disabled={props.logging} buttonColor='#1F1937' mode="contained" onPress={()=>{
      props.applyChange();
      setPressSearch(true)
    }}>
            
            <Icon source='magnify' color="white" size={20} style={{
            marginRight:'3%'}}/>
            <Text
             
          
            style={{
              color:'white',
              fontWeight:'bold',
              fontSize:16
            }}
            >Search</Text>
          </Pressable>
        </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    
    
    marginLeft:'3%',
    marginRight:'3%',
    marginBottom:'0.5%',
    borderRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    shadowOpacity:0
  },
  textInputContainer: {
    flexDirection: 'row',
    paddingBottom: '4%',   
  },
  submitButton: {
    borderRadius: 10,
    
    
    size:'100%',
    flexDirection:'row',
    columnGap:'4%'
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default InputForm;