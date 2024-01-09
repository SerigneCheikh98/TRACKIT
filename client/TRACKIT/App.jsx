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
      <HomeStack.Screen name="LoginPage" component={Login} />
      <HomeStack.Screen name="HomePage" component={HomePage} />
      <HomeStack.Screen name="RegistrationPage" component={RegisterScreen} />
      <HomeStack.Screen name="NotificationPage" component={NotificationPage} />
    </HomeStack.Navigator>
  );
}

const ReportStack = createNativeStackNavigator();

function ReportStackScreen() {
  return (
    <ReportStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <ReportStack.Screen name="ReportPage" component={ReportScreen} />
      <ReportStack.Screen name="HomePage" component={HomePage} />
      <ReportStack.Screen name="NotificationPage" component={NotificationPage} />
    </ReportStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <ProfileStack.Screen name="Profile" component={ReportScreen} />
      <ProfileStack.Screen name="HomePage" component={HomePage} />
      <ProfileStack.Screen name="NotificationPage" component={NotificationPage} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
          
            return <TopBar navigation={navigation} />;
          },
          //tabBarShowLabel: false,
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
        <Tab.Screen name="profile" component={ProfilePage} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
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
