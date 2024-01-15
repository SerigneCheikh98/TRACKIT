import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button, TextInput, Text, IconButton } from 'react-native-paper';
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
    { label: "15", value: 15 },
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

  //TIME PICKER
  const [visible, setVisible] = useState(false)

  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
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
    console.log(JSON.parse(text))
    API.getCity(JSON.parse(text).coords.latitude, JSON.parse(text).coords.longitude)
      .then(res => {
          props.params.setLocation(`${res.address.city} ${res.address.road}`)
      })
      .catch(err => console.log(err))
    console.log(location)
  }



  // DATE PICKER
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      props.params.setDate(dayjs(params.date).format('DD/MM/YYYY').toString());
    },
    [setOpen, props.params.setDate]
  );
  return (
    <>
      <View style={styles.container}>

        {/* LOCATION */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ flex: 1 }}
            mode='outlined'
            label="Location"
            outlineColor='#1F1937'
            activeOutlineColor='#1F1937'
            value={props.params.location}
            onChangeText={location => props.params.setLocation(location)}
          />
          <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton style={styles.submitButton} size={25} iconColor="white" backgroundColor="#00c89e" icon='crosshairs-gps' buttonColor='black' mode="contained" onPress={() => { handleGetLocation() }} />
          </View>
        </View>

        {/* DATE TIME*/}
        <View style={{ ...styles.textInputContainer, alignItems: 'center' }}>
          {/* DATE */}
          <View style={{ flex: 2, paddingRight: '2%' }}>

            <Pressable onPress={() => {props.params.setDate(undefined);setOpen(true)}}>
              <View pointerEvents="none">
                <TextInput
                  mode='outlined'
                  label="DD/MM/YYYY"
                  outlineColor='#1F1937'
                  activeOutlineColor='#1F1937'
                  value={props.params.date}
                  labelStyle={{ color: '#1F1937' }}
                />
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={props.params.date}
                  onConfirm={onConfirmSingle}
                />
              </View>
            </Pressable>
          </View>

          {/* TIME */}
          <View style={{ flex: 1, paddingRight: '2%' }} >

            <Pressable onPress={() => setVisible(true)}>
              <View pointerEvents="none">
                <TextInput
                  mode='outlined'
                  label="Time"
                  outlineColor='#1F1937'
                  activeOutlineColor='#1F1937'
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
          <View style={{ flex: 2, paddingRight: '2%' }}>
            <Dropdown
              style={styles.dropdown}
              data={time_value[props.params.timeUnit]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              activeColor='#00c89e'
              placeholder={"Duration"}

              maxHeight={300}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                props.params.setDuration(item);
                setOnFocusg(false);
              }}
              onFocus={() => {
                setOnFocusg(true);
              }}
              onBlur={() => { setOnFocusg(false) }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              style={styles.dropdown}
              data={slots}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              activeColor='#00c89e'

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={props.params.timeUnit}
              onChange={(item) => {
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
    backgroundColor: 'white',
  },
  submitButton: {
    // flex: 1,
    borderRadius: 10
  },
  dropdown: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
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