import { SafeAreaProvider } from "react-native-safe-area-context"
import { Card, Avatar } from 'react-native-paper';
import { Text } from 'react-native';


const ProfilePage = ({ navigation, route }) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb" color='yellow' />

    return (
        <SafeAreaProvider >
            <Card mode='elevated'>
                <Card.Title title="THIS IS PROFILE PAGE" titleVariant='titleLarge' left={LeftContent} />
                <Card.Content>
                    <Text variant="bodyLarge"> Put 'logout' and 'Register as experienced driver' here!  </Text>
                </Card.Content>
            </Card>
        </SafeAreaProvider>
    )
}

export default ProfilePage