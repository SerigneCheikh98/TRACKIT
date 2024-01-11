import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DriverDescription = () => {
    const [count, setCount] = useState(0);
    const onPress = () => setCount(1 - count);
    const text = "I am a highly qualified driver with extensive experience in the transportation sector. My passion for safe driving and excellent customer service has made me a reliable professional in my field. With a proactive approach and a thorough understanding of road regulations, I can ensure a comfortable and safe journey for passengers."

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                <Text style={styles.buttonTextTitle}>About Liam</Text>
                    {count === 0 ? (
                        <Text style={styles.buttonText} numberOfLines={2}>{text}</Text>) : (
                        <Text style={styles.buttonText}>{text} </Text>
                    )}
                </View>
            </TouchableOpacity>


            <Text style= {styles.selectText}>Choose main topics you want to practice:</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',  
        paddingHorizontal: '4%'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: '10%'

    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: 16, // Adjust the fontSize as needed
        padding: '2%',
    },
    selectText: {
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 16, // Adjust the fontSize as needed
        padding: '2%',
    },
    buttonTextTitle: {
        justifyContent: 'center',
        color: 'black',
        fontSize: 16, // Adjust the fontSize as needed
        padding: '2%',
        fontWeight: 'bold'
    },
    countContainer: {
        alignItems: 'center',
    },
    countText: {
        color: 'red',
    },
});

export default DriverDescription;


