import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { View } from 'react-native';


const ToggleChoice = (props) => {


  return (
    <View style={styles.container}>
        <Button icon="calendar" buttonColor={ props.bookingType == 'left' ? '#1F1937' : 'grey' } mode="contained" style={styles.buttonLeftStyle} onPress={() => props.handleToggle('left')}>
          By Time
          
        </Button>
        <Button icon="car" buttonColor={ props.bookingType == 'left' ? 'gray' : '#1F1937' } mode="contained" style={styles.buttonRightStyle} onPress={() => props.handleToggle('right')}>
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