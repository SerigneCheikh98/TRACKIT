import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native"
import TopBar from "./TopBar"
import React from 'react';
import UserItem from "./UserItem"
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";
import DriverBar from "./DriverBar";
import DriverDescription from "./DriverDescription";
import Topics from "./LessonTopics";
import { color } from "@rneui/base";



const BookingConfirmation = ({ navigation, route }) => {

    const email = "mariorossi@hotmail.com"


    return (
    <View>
        <TopBar />
        <View style={styles.bigContainer} >
            <View style = {styles.confimationBookingContainer}>
                <Text style = {[styles.textStyle, {color : 'green', fontSize: 20} ]} >Confirmed</Text>
                <Text style = {[ {fontFamily: 'roboto-semiBold', fontSize: 30}]}>Your lesson booking</Text>
                <View style = {styles.confirmationNumberContainer}>

                </View>
            </View>

            <View style = {styles.driverContainer}>

            </View>

            <View style = {styles.locationContainer}>

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
    textStyle: {
        fontFamily : 'roboto'
    },
    confimationBookingContainer: {
        ...debug,
        width : '100%',
        height : '30%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: '1%'

    },
    bigContainer: {
        ...debug,
        height: '86%',
        alignItems: 'center',
    
      },
      driverContainer: {
        ...debug,
        width: '100%',
        height: '20%',
        backgroundColor: 'white',
        marginBottom: '1%'
      },

      locationContainer: {
        ...debug,
        height: '10%',
        width : '100%',
        backgroundColor: 'white'
      },
      confirmationNumberContainer : {
        ...debug,
        height: '50%',
        width: '90%',
        backgroundColor: '#e7fceb'
      }


});



export default BookingConfirmation