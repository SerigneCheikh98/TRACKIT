import { SafeAreaProvider } from "react-native-safe-area-context"
import { Card, Avatar } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "./TopBar";


const ProfilePage = ({ navigation, route, setIsLoggedIn }) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb" color='yellow' />

    return (
        <SafeAreaProvider >
            <TopBar navigation={navigation} />
            <Card mode='elevated'>
                <Card.Title title="THIS IS PROFILE PAGE" titleVariant='titleLarge' left={LeftContent} />
                <Card.Content>
                    <Text variant="bodyLarge"> Put 'logout' and 'Register as experienced driver' here!  </Text>
                </Card.Content>
            </Card>
            <View style={styles.container}>
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
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
});
  
export default ProfilePage