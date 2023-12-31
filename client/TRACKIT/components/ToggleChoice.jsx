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
        <Button icon="calendar" buttonColor={ value == 'left' ? '#1F1937' : 'grey' } mode="contained" style={styles.buttonLeftStyle} onPress={() => handleToggle('left')}>
          By Time
          
        </Button>
        <Button icon="car" buttonColor={ value == 'left' ? 'gray' : '#1F1937' } mode="contained" style={styles.buttonRightStyle} onPress={() => handleToggle('right')}>
          By Driver
        </Button>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: '5%',
      backgroundColor: '#fff'
    },
    buttonLeftStyle: {
        borderRadius: 0,
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flex: 1
    },
    buttonRightStyle: {
        borderRadius: 0,
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1
    }
  });
export default ToggleChoice;