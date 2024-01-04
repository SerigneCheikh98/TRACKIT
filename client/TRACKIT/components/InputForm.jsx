import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text, IconButton } from 'react-native-paper';
import { useState, useCallback } from "react";
import { DatePickerModal } from 'react-native-paper-dates';
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location'
import API from "../API";

const slots = [
  { label: "min", value: 'min' },
  { label: "hours", value: 'hours' },
]

const time_value = {
  'min': [
    {label: "15", value: 15},
    {label: "30", value: 30},
    {label: "45", value: 45}
  ],
  'hours': [
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "3", value: 3},
    {label: "4", value: 4}
  ]
}

const InputForm = (props) => {
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState('min');
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [onFocusg, setOnFocusg] = useState(false);
  const [location, setLocation] = useState("");

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation('error')
      return;
    }

    let text = await Location.getCurrentPositionAsync({});
    text = JSON.stringify(text);
    console.log(JSON.parse(text))
    API.getCity(JSON.parse(text).coords.latitude, JSON.parse(text).coords.longitude)
      .then(res => {
        setLocation(`${res.address.city} ${res.address.road}`)
      })
      .catch(err => console.log(err))
      console.log(location)
  }
  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date)
    },
    [setOpen, setDate]
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ flex: 1 }}
            mode='outlined'
            label="Location"
            outlineColor='#1F1937'
            activeOutlineColor='#1F1937'
            value={location}
            onChangeText={location => setLocation(location)}
          />
          <View style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
            <IconButton style={styles.submitButton} size={25} iconColor="white" backgroundColor="black" icon='map-marker' buttonColor='black' mode="contained" onPress={() => { handleGetLocation() }} />
          </View>
        </View>
        <View style={{...styles.textInputContainer, alignItems: 'center'}}>
          {
            props.bookingType == 'left' && <>
            <View style={{ flex: 1, paddingRight: '2%' }}>
              <Dropdown
                style={styles.dropdown}
                data={time_value[timeUnit]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                activeColor='#1F1937'

                maxHeight={300}
                labelField="label"
                valueField="value"
                onChange={(item) => {
                  setDuration(item);
                  setOnFocusg(false);
                }}
                onFocus={() => {
                  setOnFocusg(true);
                }}
                onBlur={() => { setOnFocusg(false) }}
              />
              {/* <TextInput
                mode='outlined'
                label="Duration"
                outlineColor='#1F1937'
                activeOutlineColor='#1F1937'
                value={duration}
                onChangeText={duration => setDuration(duration)}
              />               */}
            </View>
            <View style={{flex: 1}}>
              <Dropdown
                style={styles.dropdown}
                data={slots}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                activeColor='#1F1937'

                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={timeUnit}
                onChange={(item) => {
                  setTimeUnit(item.value);
                  setOnFocusg(false);
                }}
                onFocus={() => {
                  setOnFocusg(true);
                }}
                onBlur={() => { setOnFocusg(false) }}
              />
            </View>
            </>
          }
        </View>
        <View style={{...styles.textInputContainer, alignItems: 'center'}}>
          {
            props.bookingType == 'left' && <>
            <View style={{ flex: 1, paddingRight: '2%' }}>
              <TextInput
                mode='outlined'
                label="DD/MM/YYYY"
                outlineColor='#1F1937'
                activeOutlineColor='#1F1937'
                value={date}
                labelStyle={{ color: '#1F1937' }}
              />              
            </View>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-start' }}>
              {
                props.bookingType == 'left' &&
                <Button style={{ borderRadius: 10, width: '100%' }} labelStyle={{ color: '#1F1937' }} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                  Pick a date
                </Button>
              }
              <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
              />
            </View>
            </>
          }
        </View>
        <View style={styles.textInputContainer}>
          <View style={{ flex: 2 }}>
            
          </View>
          <Button style={styles.submitButton} buttonColor='black' mode="contained" onPress={props.applyChange}>
            Apply changes
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  textInputContainer: {
    flexDirection: 'row',
    paddingBottom: '4%',
    backgroundColor: 'white',
  },
  submitButton: {
    // flex: 1,
    borderRadius: 10
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
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