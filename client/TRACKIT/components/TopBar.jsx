import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TopBar = () => (
  <Appbar.Header style={{mode: 'center-aligned'}}>
    <Appbar.Content title="TRACKIT"/>
    <Appbar.Action icon="bell"></Appbar.Action>
  </Appbar.Header>
);

const styles = StyleSheet.create({

});

export default TopBar;