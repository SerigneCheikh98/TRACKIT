import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const RequestCard = (props) => {

    const msg = `Are you sure you want to request a ride in ${props.params.location} on ${props.params.date} at ${props.params.time} for ${props.params.duration} ${props.params.timeUnit} `
    return (
       
        <Card   style={{ paddingHorizontal: '2%', marginLeft:"3%", marginRight: "3%", marginBottom:"2%", marginTop:'3%'}}>
            <Card.Content>
                <Text variant="bodyLarge">{props.text}</Text>
            </Card.Content>
            <View style={styles.container}>
                <Button style={styles.submitButton} buttonColor='#F9C977' mode="contained" onPress={() => {
                    props.setBadgeOn(true)
                    props.throwPopup(msg, [
                    {
                        name: 'Send Request',
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
        paddingVertical: '5%',
        
    },
    submitButton: {
        borderRadius: 10,
    
        
        
    },
});
export default RequestCard;