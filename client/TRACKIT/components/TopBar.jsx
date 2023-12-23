import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TopBar = () => (
  <Appbar.Header style={{mode: 'center-aligned'}}>
    <Appbar.Content title="TRACKIT" style={styles.titleContainer}/>
    <Appbar.Action icon="bell"></Appbar.Action>
  </Appbar.Header>
);

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16, // Adjust padding as needed
      }
  });

export default TopBar;