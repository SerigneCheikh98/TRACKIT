import { Button, TextInput, Text} from 'react-native-paper'
import { Image, Linking, ScrollView } from 'react-native'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'
import { Link, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import API from '../API';

const Login = ({setIsLoggedIn}) =>{
    const navigate = useNavigation();
    const [email,setEmail] = useState("mariorossi@hotmail.com");
    const [password, setPassword] = useState("password1234");

    const [onFocus, setOnFocus] = useState(false);
    const [passIcon, setPassIcon] = useState("eye-off");
    const [hidePass, setHidePass] = useState(true);

    
    return (
        <ScrollView style={{backgroundColor:'white'}}>
        <View
        style={styles.container}
        behavior='padding'
        >
        
        <View>
        <Image source={require('./../assets/newapplogo.png')}
         style={{width: 200, height:180}}
        />
        
        </View>
        <View>
        <TextInput
        keyboardType='email-address'
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text) }
        mode='outlined'
        outlineColor='#1F1937'
        activeOutlineColor='#1F1937'
        style={styles.input}
        onFocus={()=>{setOnFocus(false)}}
        />
        <TextInput
        label='Password'
        value={password}
        onChangeText={(text) => setPassword(text) }
        mode='outlined'
        onFocus={()=>{setOnFocus(false)
            setOnFocus(true)}}
        right={
            onFocus &&
            <TextInput.Icon
            style={{screenLeft: 0, color: "#1F1937", size:20}}
              icon={passIcon}
              color= "#1F1937"
              onPress={() => {
                
                if(hidePass)
                {
                    setPassIcon("eye");
                    setHidePass(false)
                }
                else{
                    setPassIcon("eye-off");
                    setHidePass(true)
                }
            }}
            />
        
          }
        activeOutlineColor='#1F1937'
        style={styles.input}
        
        secureTextEntry={hidePass}
        />
        </View> 

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={()=>{

            const username = email.toLowerCase()
            const credentials = {username, password}
            API.login(credentials)
                .then( () => {
                    setIsLoggedIn(true)
                })
                .catch( err => {
                    console.log(err)
                })
            // if(email.toLocaleLowerCase()=="mariorossi@hotmail.com" && password=="123123") 
            // {

            //     setIsLoggedIn(true);
            // }
            // console.log(email.toLocaleLowerCase())
            // console.log(password)

           
            //navigate.navigate('HomePage')
        }}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
           
               
            
        }}
        style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        </View>
        <Text variant="labelSmall" style={{ marginTop: '7%' }} >Want to help others learn how to drive?</Text>
        
       
         <Text variant="labelSmall" style={{ color: 'grey', textDecorationLine: 'underline', }}
         onPress={()=>{ //setIsLoggedIn(true); 
            navigate.navigate('RegistrationPage')/* navigate to Registration */     
        }}
         >Register as an experienced driver</Text>
         
       
    
       
       
        </View>
        </ScrollView>
        
    )
}



const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20%'
    },
    inputContainer:
    {
        width: '100%',
    

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: '1%',
       
        marginTop: "3%",
        width: 300,
    
    },
    buttonContainer:{
        width:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    button:
    {
        backgroundColor: "#1F1937",
        width: '100%',
        padding: '4%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '20%',
        width: 200,

    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#1F1937',
        borderWidth:2,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonContainer:{
        color: '#782F9',
        fontWeight: '700',
        fontSize: 16,
    }
})

export default Login