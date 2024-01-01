import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from 'react-native-paper';
import { useState, useCallback } from "react";
import { DatePickerModal } from 'react-native-paper-dates';
import { Dropdown } from 'react-native-element-dropdown';

const slots = [
  { label: "min", value: 'min' },
  { label: "hours", value: 'hours' },
]

const InputForm = (props) => {
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState('min');
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [onFocusg, setOnFocusg] = useState(false);

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
        </View>
        <View style={{...styles.textInputContainer, alignItems: 'center'}}>
          {
            props.bookingType == 'left' && <>
            <View style={{ flex: 1, paddingRight: '2%' }}>
              <TextInput
                mode='outlined'
                label="Duration"
                outlineColor='#1F1937'
                activeOutlineColor='#1F1937'
                value={duration}
                onChangeText={duration => setDuration(duration)}
              />              
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
    flex: 1,
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