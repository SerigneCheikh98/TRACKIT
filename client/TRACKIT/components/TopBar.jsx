import * as React from 'react';
import { Appbar, Badge, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

const TopBar = (props) => {
  const navigation = useNavigation();

  const [notification, setNotification] = useContext(NotificationContext)
  const goBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.topbar}>
      <Icon name= {'arrow-back-ios'} type="material-icons" color={props.back ? 'white' : '#1F1937'} size={30} style={styles.arrow_left} onPress={props.back ? goBack : () => 0}/>

      <Text style={styles.title}>TRACKIT</Text>
      <TouchableOpacity onPress={() => {
        setNotification(false)
        navigation.navigate('NotificationPage')
    }} style={styles.iconContainer}>
      <Appbar.Action icon="bell" size={30} color='white' style={styles.bell} />
      { 
        notification == true &&
        <Badge size={9} style={styles.badge} />
      }
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 17,
    right: 17,
  },

  topbar: {
    flexDirection: 'row',
    height: '14%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#1F1937",
    paddingTop: '10%'
    
  },

  title: {
    fontFamily: 'roboto',
    fontSize: 32,
    color: 'white'
  },

  bell:{
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrow_left:{
    marginLeft: '7%'
  }
});


export default TopBar;