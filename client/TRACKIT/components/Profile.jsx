import { SafeAreaProvider } from "react-native-safe-area-context"
import { Card, Avatar } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "./TopBar";
import { useNavigation } from '@react-navigation/native';



const ProfilePage = ({ route, setIsLoggedIn }) => {
    const navigation = useNavigation();


    return (
        <SafeAreaProvider >
            <TopBar navigation={navigation} />
            <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Registration', {source: "2"})}>
                    <Text>Register as an experienced driver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{setIsLoggedIn(false)}}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
            {/* <Appbar.Action icon="power" color='white' accessibilityLabel='Log out' onPress={()=>{navigation.navigate("LoginPage")}}></Appbar.Action> */}
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: '10%',
    },
    
});
  
export default ProfilePage