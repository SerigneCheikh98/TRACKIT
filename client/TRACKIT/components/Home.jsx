import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './TopBar';
import ToggleChoice from './ToggleChoice';
import Sliders from './Slider';
import { useState } from 'react';
import Calendar from './Calendar1';



const HomePage = ({navigation,route}) => {
    const [text, setText] = useState("");
    return(
  <SafeAreaProvider>
          
          <TopBar />
          
          <SafeAreaView style={styles.container}>
           
            <ToggleChoice />
            <View >
              <Text>Location: </Text>
              <TextInput
                label="Location"
                value={text}
                onChangeText={text => setText(text)}
              />
             <Calendar/>
            
            </View>
            <Sliders />
            <Text>Si proprio tu</Text>
          </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
  });

export default HomePage


  