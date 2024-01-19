import * as React from 'react';
import { Appbar, Badge, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';





const TopBar = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.topbar}>
      <Text style={styles.title}>TrackIT</Text>
      <TouchableOpacity onPress={() => {
      navigation.navigate('NotificationPage')
    }} style={styles.iconContainer}>
      <Appbar.Action icon="bell" size={30} color='white' style={styles.bell} />
      <Badge size={9} style={styles.badge} />
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: '27%',
    right: '30%',
  },

  topbar: {
    flexDirection: 'row',
    height: '12%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '32%', // Adjust padding as needed
    backgroundColor: "#1F1937",
    paddingTop: '5%'
    
  },

  title: {
    fontSize: 40,
    color: 'white'
  },

  bell:{
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default TopBar;