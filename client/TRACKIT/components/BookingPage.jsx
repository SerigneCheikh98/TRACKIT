import { View, StyleSheet, Text,SafeAreaView,VirtualizedList, TouchableOpacity,Dimensions, PixelRatio } from "react-native"
import TopBar from "./TopBar"
import UserItem from "./UserItem"
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";
import DriverBar from "./DriverBar";
import DriverDescription from "./DriverDescription";
import Topics from "./LessonTopics";
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback, useEffect, React } from 'react';
import API from '../API';




const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 5;
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Booking = ({ route}) => {

  const { name, lastname, rating, description, rideId, from, selectedButtons } = route.params;
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const [disableButton, setDisableButton] = useState(false);

  const [showText, setShowText] = useState(false);

  const handleButtonPressWrong = () => {
    // Display the text when the button is pressed
    setShowText(true);

    // Set a timeout to hide the text after 3 seconds
    setTimeout(() => {
      setShowText(false);
    }, 5000);
  };

  const handleButtonPressRight = () => {
    API.bookRide(rideId, from.split(' - ')[0].trim(), selectedButtons.length)
    .then(resp => {
      navigation.navigate('BookingConfirmationPage', {name : name, lastname: lastname, rating: rating, from : from, to: to, date : date, location : location, time : time})
    })
    .catch(err => {
      console.log(err)
    })
  };



  // Calculate a scaling factor based on the screen dimensions and PixelRatio
  const scaleFactor = PixelRatio.get() / 0.3;

  // Function to calculate the responsive font size
  const getResponsiveFontSize = (baseFontSize) => {
    const responsiveFontSize = baseFontSize * scaleFactor;
    return responsiveFontSize;
  };

  return (
            <View>
                <TopBar back={'HomePage'}/>
                <View style={styles.bigContainer} >
                    <DriverBar name = {name} lastname = {lastname} rating = {rating}/>
                    <DriverDescription name = {name} description = {description}/>
                    <Topics disable = {setDisableButton}/>
                    <View style = {styles.buttonContainer}>
                      {showText && <Text style = {styles.dangerText}>Please select at least one topic</Text>}

                      <TouchableOpacity style={styles.button} onPress={()=> disableButton ? handleButtonPressWrong() : handleButtonPressRight()} >
                      <Text style={[styles.textStyle, { fontSize: getResponsiveFontSize(2) }]}>
                        Book driving lesson
                      </Text>
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
    container: {
    flex: 1    },
    textStyle : {
      color: 'white',
      fontFamily: 'roboto-semiBold',

    },

    button : {
      ...debug,
      backgroundColor: '#1F1937',
      width: '50%',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5, // Android only

      

    },
    buttonContainer: {
      ...debug,
      height: '14%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2%'
      
    },
    dangerText : {
      position: 'absolute',
      color : 'red',
      top: 2
    },
    title: {
      fontSize: 32,
    },
    scroll: {
    },
    bigContainer:{
      marginTop: '3%',
      height: '85%'
    }
  });



export default Booking