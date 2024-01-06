import * as React from 'react';
import { Appbar, Badge } from 'react-native-paper';
import { StyleSheet } from 'react-native';




const TopBar = ({navigation}) => (
  <Appbar.Header style={{mode: 'center-aligned', backgroundColor:"#1F1937"}}>
    <Appbar.Content title="TRACKIT" titleStyle={{color: "white"}}/>
    <Badge  size={9} style={{ position: 'absolute', top: 22, right: 24 }}/><Appbar.Action icon="bell" color='white' style={{position:'absolute', right:10, top: 10}}  onPress={()=>{
      navigation.navigate(NotificationPage)
    }} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  Badge: {
    position: 'absolute',
    right: 10,
    top: 5
    


    
  }
});


export default TopBar;