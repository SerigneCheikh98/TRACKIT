import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native"
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
  const { name, lastname, rating, from, to, date, location, time } = route.params;

  const CircleView = ({ dimensione, name, type }) => {
    const { width, height } = Dimensions.get('window');
    const circleSize = Math.min(width, height) * dimensione; // Adjust the multiplier as needed

    return <View style={[styles.cerchioIcona, { width: circleSize, height: circleSize }]} >
      <Icon name={name} type={type} color={'#1F1937'} size={30} />

    </View>;
  };
  
  const generateRandomNumber = (numDigits) => {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate a random number with specified number of digits
  const confirmationNumber = generateRandomNumber(10);
  const pin = generateRandomNumber(4);




  return (
    <View>
      <TopBar />
      <View style={styles.bigContainer} >
        <View style={styles.confimationBookingContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.textStyle, { color: 'green', fontSize: 20 }]} >Confirmed</Text>
            <Text style={[{ fontFamily: 'roboto-semiBold', fontSize: 30 }]}>Your lesson booking</Text>
            <Text style={[styles.textStyle, { fontSize: 16 }]} >You're all set! We sent your confirmation email to <Text style={{ fontFamily: 'roboto-semiBold' }}>{email}</Text></Text>
          </View>
          <View style={styles.confirmationNumberContainer}>
            <View style={styles.firstContainer}>
              <Text style={[styles.textStyle, { fontSize: 16, marginBottom: '2%' }]}>Confirmation number:</Text>
              <Text style={[{ fontFamily: 'roboto-semiBold', fontSize: 16, marginBottom: '2%' }]}>{confirmationNumber}</Text>
            </View>
            <View style={styles.secondContainer}>
              <Text style={[styles.textStyle, { fontSize: 16 }]}>PIN:</Text>
              <Text style={[{ fontFamily: 'roboto-semiBold', fontSize: 16 }]}>{pin}</Text>
            </View>
          </View>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.contenitorePddingDriver}>
            <View style={styles.driverInternalContainer}>
              <Text style={[{ fontFamily: 'roboto-semiBold', fontSize: 25, marginBottom: '2%', color: '#1F1937' }]}>{name + " " + lastname}</Text>
              <Text ><Rating num={rating} /> </Text>
            </View>
            <View style={styles.iconContactContainer}>
              <CircleView dimensione={0.1} type='material-community-icons' name='phone' />
              <CircleView dimensione={0.1} type='material-community-icons' name='email' />
            </View>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationInterno}>
            <View style={styles.locationSopra}>
              <Icon name={'location-outline'} type={'ionicon'} color={'#1F1937'} size={30} />
              <Text>{location}</Text>
            </View>
            <View style={styles.locationSopra}>
              <Icon name={'calendar'} type={'font-awesome'} color={'#1F1937'} size={30} />
              <Text>{date}</Text>
            </View>
            <View style={styles.locationSopra}>
              <Icon name={'clock-outline'} type={'material-community'} color={'#1F1937'} size={30} />
              <Text>{from + "-" + to}</Text>
            </View>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          
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

const Rating = (props) => {
  const stars = [];
  let i;
  for (i = 0; i < props.num; i++) {
    stars.push(<Icon key={i} name='star' type="material" color='#febb00' size={25}
    />);
  }
  while (i < 5) {
    stars.push(<Icon key={i} name='star-border' color='#febb00' type="material" size={25} style={{ margin: '0 2px' }} // Adjust the margin as needed
    />);
    i++
  }

  return (
    <>
      {stars}
    </>
  );
}

const debug = {
  borderWidth: 0,
  borderColor: 'red',

};


const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'roboto'
  },
  confimationBookingContainer: {
    ...debug,
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: '1%',
    justifyContent: 'space-evenly'
  },
  bigContainer: {
    ...debug,
    height: '86%',
    alignItems: 'center',

  },
  driverContainer: {
    ...debug,
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
    marginBottom: '1%',
    alignItems: 'center',

  },

  locationContainer: {
    ...debug,
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%'
  },
  confirmationNumberContainer: {
    ...debug,
    height: '35%',
    width: '90%',
    backgroundColor: '#e7fceb',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    ...debug,
    height: '50%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  firstContainer: {
    ...debug,
    marginLeft: '5%'
  },
  secondContainer: {
    ...debug,
    alignItems: 'flex-end',
    marginRight: '5%'
  },
  driverInternalContainer: {
    ...debug,
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
  },
  iconContactContainer: {
    ...debug,
    flexDirection: 'row',
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cerchioIcona: {
    ...debug,
    borderWidth: 2,
    borderColor: '#1F1937',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contenitorePddingDriver: {
    ...debug,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '90%'
  },
  locationInterno: {
    ...debug,
    flexDirection: 'row',
    height: '100%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  locationInterno2: {
    ...debug,
    flexDirection: 'row',
    height: '50%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'

  },
  locationSopra: {
    ...debug,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
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

  bottomContainer:{
    ...debug,
    height:'100%',
    width: '100%',
    backgroundColor: 'white'
  }



});



export default BookingConfirmation