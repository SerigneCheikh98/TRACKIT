import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native"
import TopBar from "./TopBar"
import React from 'react';
import UserItem from "./UserItem"
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";
import DriverBar from "./DriverBar";
import DriverDescription from "./DriverDescription";
import Topics from "./LessonTopics";



const BookingConfirmation = ({ navigation, route }) => {



  return (
    <View>
      <TopBar />
      <View style={styles.bigContainer} >
        
          {/* Your other components/content go here */}
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Your request has been sent to the driver</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => { navigation.navigate('HomePage') }} style={styles.button} >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>

      </View>
    </View>
  )
}

const debug = {
  borderWidth: 0,
  borderColor: 'red',

};


const styles = StyleSheet.create({
  buttonContainer: {
    ...debug,
    position: 'absolute',
    bottom: 15,
    width: '100%',
    alignItems: 'center',
    color: '#782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  bigContainer: {
    ...debug,
    height: '86%',
    alignItems: 'center',
    justifyContent: 'center'

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' or 'stretch'
    alignItems: 'center',
    opacity: 0.9, // Adjust the opacity value

  },

  textContainer: {
    marginBottom: '40%',
    height: 130,
    width: 340,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textStyle: {
    fontFamily: 'roboto-semiBold',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 50, // Adjust this value to increase or decrease the line height
    margin: 15
  },

  textButton: {
    fontFamily: 'roboto-semiBold',
    fontSize: 25,
    textAlign: 'center',

  },

  button:
  {
    ...debug,
    backgroundColor: 'rgba( 31, 25, 55, 0.95)',

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

  },

  buttonText: {
    color: 'white',
    fontFamily: 'roboto-semiBold',
    fontSize: 18,
    textAlign: 'center'
  },

});



export default BookingConfirmation