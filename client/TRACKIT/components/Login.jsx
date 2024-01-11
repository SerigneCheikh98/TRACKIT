import { Button, TextInput, Text} from 'react-native-paper'
import { Image, Linking, ScrollView } from 'react-native'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'
import { Link, useNavigation } from '@react-navigation/native';

const Login = ({setIsLoggedIn}) =>{
    const navigate = useNavigation();

    return (
        <ScrollView>
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
        
        label="Email"
        //value={}
        //onChangeText={text => }
        mode='outlined'
        outlineColor='#1F1937'
        activeOutlineColor='#1F1937'
        style={styles.input}
        />
        <TextInput
        label='Password'
        //value={}
        //onChangeText={text => }
        mode='outlined'
        
        activeOutlineColor='#1F1937'
        style={styles.input}
        
        secureTextEntry
        />
        </View> 

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={()=>{
            setIsLoggedIn(true);
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