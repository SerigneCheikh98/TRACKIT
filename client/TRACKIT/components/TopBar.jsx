import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TopBar = () => (
  <Appbar.Header style={{mode: 'center-aligned', backgroundColor:"#1F1937"}}>
    <Appbar.Content title="TRACKIT" titleStyle={{color: "white"}}/>
    <Appbar.Action icon="bell" color='white' />
  </Appbar.Header>
);

const styles = StyleSheet.create({

});

export default TopBar;