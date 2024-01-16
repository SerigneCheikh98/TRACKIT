import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const RequestCard = (props) => {
    const msg = 'Your request has been sent, check on the notification page'
    return (
        <Card elevation={3} mode='elevated' style={{ paddingHorizontal: '2%' }}>
            <Card.Content>
                <Text variant="bodyLarge">{props.text}</Text>
            </Card.Content>
            <View style={styles.container}>
                <Button style={styles.submitButton} buttonColor='#00c89e' mode="contained" onPress={() => {
                    props.setBadgeOn(true)
                    props.throwPopup(msg, [
                    {
                        name: 'Insert',
                        fn: props.handleInsertRequest
                    },
                    {
                        name: 'Close',
                        fn: props.closePopup
                    }])}}>
                    Request a practice for this time
                </Button>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    submitButton: {
        borderRadius: 10
    },
});
export default RequestCard;