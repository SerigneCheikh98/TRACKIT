import { SafeAreaProvider } from "react-native-safe-area-context"
import { Card } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import TopBar from "./TopBar";
import { useNavigation } from '@react-navigation/native';
import { Icon, Avatar } from '@rneui/themed';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

import React, { useState,useEffect } from 'react';
import * as Font from 'expo-font';
import API from "../API";



const ProfilePage = ({ route, setIsLoggedIn }) => {
 
    const navigation = useNavigation();
    const CircleView = ({dimensione}) => {
        const { width, height } = Dimensions.get('window');
        const circleSize = Math.min(width, height) * dimensione; // Adjust the multiplier as needed
      
        return <View style={[styles.profilePic, { width: circleSize, height: circleSize }]} >
                <Avatar
                    rounded
                    size={64}
                    source={{uri : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                />
            </View>;
      };

      const CircleIcon= ({dimensione, tipo, fonte, size = 32}) => {
        const { width, height } = Dimensions.get('window');
        const circleSize = Math.min(width, height) * dimensione; // Adjust the multiplier as needed
      
        return  <View style={[ styles.iconCircle, { width: circleSize, height: circleSize }]} >
                    <Icon name= {tipo} type= {fonte} color={'#1F1937'} size={size}/>
                </View>;
      };

      

      
    

    return (<>
        <TopBar navigation={navigation} />

        <View style={styles.prova}>
            <View style={styles.topBar}>
                {/* <CircleView dimensione={0.165}/>  */}
                <Avatar
                containerStyle={[debug, styles.profilePic]}
                    rounded
                    size={'medium'}
                    source={{uri : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                />

                <View style={[styles.textContainer, {width : '53%'}]}>
                    <Text style={styles.textName}>Mario Rossi </Text>
                </View>
                <Icon name='edit' color={'white'} size={28} style={debug}/>
            </View>

            <View style={styles.centerContent}>

                <View style={styles.item}>

                    <CircleIcon dimensione={0.14} tipo={'user'} fonte={"font-awesome-5"}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>My Account </Text>
                        <Text style={[styles.iconTitle, styles.iconDescription]}>Make changes to your account</Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>

                </View>


                <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('Registration', {source: "2"})}>
                    <CircleIcon dimensione={0.14} tipo={'chalkboard-teacher'} fonte={"font-awesome-5"}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>Upgrade to Driver </Text>
                        <Text style={[styles.iconTitle, styles.iconDescription]}>Start teaching and become a millionaire!</Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>
                </TouchableOpacity>
                
                <View style={styles.item}>
                    <CircleIcon dimensione={0.14} tipo={'shield-alt'} fonte={"font-awesome-5"}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>Security </Text>
                        <Text style={[styles.iconTitle, styles.iconDescription]}>Manage your account security for safety</Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>
                </View>

                <TouchableOpacity style={styles.item} onPress={()=>{
                    
                    API.logout()
                        .then( resp => {
                            setIsLoggedIn(false)
                        })
                        .catch( err => console.log(err) )    
                }}>
                    <CircleIcon dimensione={0.14} tipo={'exit'} fonte={"ionicon"} size={36}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>Log out</Text>
                        <Text style={[styles.iconTitle, styles.iconDescription]}>See you soon!</Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>
                </TouchableOpacity>
            </View>


            <Text style={styles.more}>More</Text>

            <View style={styles.bottomContent}>
                <View style={[styles.item, styles.item_bottom]}>
                    <CircleIcon dimensione={0.14} tipo={'bell-o'} fonte={"font-awesome"}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>Help & Support </Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>
                </View>

                <View style={[styles.item, styles.item_bottom]}>
                    <CircleIcon dimensione={0.14} tipo={'heart-o'} fonte={"font-awesome"}/>
                    <View style={styles.textContainerItem}>
                        <Text style={styles.iconTitle}>About App </Text>
                    </View>
                    <Icon name= {'chevron-right'} type="font-awesome" color={'#1F1937'} size={20} style={styles.arrow_right}/>
                </View>
            </View>

            {/* <View>
                <Text>prova</Text>
            </View> */}

            
            {  /* <View style={styles.container}>
             <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Registration', {source: "2"})}>
                     <Text>Register as an experienced driver</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.button} onPress={()=>{setIsLoggedIn(false)}}>
                     <Text>Log out</Text>
                 </TouchableOpacity>
             </View> */
            /* <Appbar.Action icon="power" color='white' accessibilityLabel='Log out' onPress={()=>{navigation.navigate("LoginPage")}}></Appbar.Action> */}
        </View>
        </>
    )
}

const commonTextStyles = {
    fontFamily: 'roboto',
  };

const debug = {
    borderWidth: 0,
    borderColor: 'red',

};

const commonBoxContent = {
    width : '94%',
    borderRadius: 10,
    alignSelf: 'center',
};

const styles = StyleSheet.create({
    prova:{
        ...debug,
        flex: 1,
        justifyContent: 'space-around'
    },
    
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

    topBar: {
        ...debug,
        ...commonBoxContent,
        height : '12%',
        backgroundColor : '#1F1937',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // This is for Android to show the shadow
    },

    profilePic : {
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        marginLeft: '3%'
    },

    iconCircle : {
        ...debug,
        backgroundColor: 'rgba(249,201,119, 0.7)', 
        borderRadius: 50,
        
        justifyContent: 'center',
        marginLeft: '3%'
    },

    textName : {
        ...debug,
        ...commonTextStyles,
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'roboto-semiBold',
    },

    textUsername : {
        fontSize: 10,
        fontFamily: 'roboto',

        
    },

    iconTitle :{
        ...debug,
        ...commonTextStyles,
        fontSize: 20,
        fontFamily: 'roboto-semiBold',


    },

    iconDescription : {
        ...debug,
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.3)',
        fontFamily: 'roboto',
    },

    textContainer: {
        ...debug,
        margin: '5%',
        width: '63%',
        height: '70%',
        justifyContent: 'space-around',
        
    },

    textContainerItem: {
        ...debug,
        margin: '5%',
        width: '63%',
        height: '80%',
        justifyContent: 'space-around',
        
    },

    centerContent: {
        ...debug,
        ...commonBoxContent,
        height: '45%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
    },

    bottomContent:{
        ...debug,
        ...commonBoxContent,
        backgroundColor: '#FFFFFF',
        height: '25%',
        justifyContent: 'space-around',

    },

    more:{
        ...debug,
        ...commonTextStyles,
        marginLeft: '5%',
        fontSize: 17,
        fontFamily: 'roboto-semiBold'
    },

    item:{
        ...debug,
        ...commonBoxContent,
        height: '20%',
        width: '100%',
        borderRadius: 0,
        flexDirection:'row',
        alignItems: 'center',


    },

    item_bottom:{
        ...debug,
        height: '40%'
    },

    arrow_right:{
        ...debug,
        justifyContent: 'flex-end',
    }
    
});
  
export default ProfilePage