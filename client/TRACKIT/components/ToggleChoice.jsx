import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { useState } from 'react';


const ToggleChoice = () => {
  const [value, setValue] = useState('left');

  function handleToggle(pos) {
    if(value == 'left' && pos != 'left') 
        setValue('right')
    else if(value == 'right' && pos != 'right')
        setValue('left')
  }

  return (
    <View onValueChange={value => setValue(value)} value={value} style={styles.container}>
        <Button icon="calendar" buttonColor={ value == 'left' ? 'blue' : 'grey' } mode="contained" style={styles.buttonStyle} onPress={() => handleToggle('left')}>
          By Time
          
        </Button>
        <View style={{ flex: 0.3 }}/>
        <Button icon="car" buttonColor={ value == 'left' ? 'gray' : 'blue' } mode="contained" style={styles.buttonStyle} onPress={() => handleToggle('right')}>
          By Driver
        </Button>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    buttonStyle: {
        borderRadius: 10
    }
  });
export default ToggleChoice;