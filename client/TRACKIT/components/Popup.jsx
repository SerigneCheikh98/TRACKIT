import React, { useState } from 'react';
import {  Modal, StyleSheet, Text, Pressable, View } from 'react-native';
/**
 * buttons: [ 
 * {
 *  fn: function
 *  name: name
 * },
 * ...
 * ]
 * 
 */
const Popup = (props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.setModalVisible(!props.modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{props.text}</Text>
                        <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
                            {
                                props.buttons != undefined && (
                                        props.buttons.map( (item, index) => {
                                        return <Pressable
                                            key={index}
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => item.fn()}>
                                            <Text style={styles.textStyle}>{item.name}</Text>
                                        </Pressable>
                                    })
                                )
                            }
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    submitButton: {
        borderRadius: 10,
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '5%',
        elevation: 2,
        flex: 1,
        backgroundColor: '#F9C977',
        textAlign: "center",
        justifyContent: 'center'
    },
    buttonOpen: {
        backgroundColor: '#F9C977',
    },
    buttonClose: {
        backgroundColor: '#F9C977',
        textAlign: "center",
        justifyContent: 'center'

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default Popup;