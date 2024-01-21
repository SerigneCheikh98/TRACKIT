import * as React from 'react';
import Login from './components/Login';
import HomePage from './components/Home';
import RegisterScreen from './components/Registration';
import ReportScreen from './components/Report';
import TopBar from './components/TopBar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationPage from './components/NotificationPage';
import ProfilePage from './components/Profile';
import Booking from './components/BookingPage';
import BookingConfirmation from './components/BookingConfirmationPage';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';



const Stack = createNativeStackNavigator();

registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
})

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={() => ({ headerShown: false })}>
      {/* <HomeStack.Screen name="LoginPage" component={Login} /> */}
      <HomeStack.Screen name="HomePage" component={HomePage} />
      <HomeStack.Screen name="BookingPage" component={Booking} />
      <HomeStack.Screen name="BookingConfirmationPage" component={BookingConfirmation} />
      {/* <HomeStack.Screen name="RegistrationPage" component={RegisterScreen} /> */}
      <HomeStack.Screen name="NotificationPage" component={NotificationPage} />
    </HomeStack.Navigator>
  );
}

const ReportStack = createNativeStackNavigator();

function ReportStackScreen() {
  return (
    <ReportStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <ReportStack.Screen name="ReportPage" component={ReportScreen} />
      {/* <ReportStack.Screen name="NotificationPage" component={NotificationPage} /> */}
    </ReportStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen({ setIsLoggedIn }) {
  return (
    <ProfileStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <ProfileStack.Screen name="ProfilePage" >
        {(props) => <ProfilePage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </ProfileStack.Screen>
      {/* <ProfileStack.Screen name="NotificationPage" component={NotificationPage} /> */}
      <ProfileStack.Screen name="Registration" component={RegisterScreen} />
    </ProfileStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();
function AuthStackScreen({ setIsLoggedIn }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginPage">
        {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="RegistrationPage" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'roboto-semiBold' : require('./assets/fonts/Roboto/Roboto-Medium.ttf')
      });

    }

    loadFont();
  }, []);

  return(
    <NavigationContainer>
      {!isLoggedIn ? <AuthStackScreen setIsLoggedIn={setIsLoggedIn} /> : 
    (<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          // header: ({ navigation, route, options }) => {
          //   const title = getHeaderTitle(options, route.name);
          //   if (title != 'Home'){
          //     return <TopBar navigation={navigation} />;
          //   }
            
          // },
          //tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Report" component={ReportStackScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-arc" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Profile" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}>
          {(props) => <ProfileStackScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      </Tab.Navigator>)
    }
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
