import { Button, TextInput, Text} from 'react-native-paper'
import { Image } from 'react-native'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'


const Login = ({navigation}) =>{
  
    return (
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
        placeholder='Email'
        //value={}
        //onChangeText={text => }
        mode='outlined'
        outlineColor='#1F1937'
        activeOutlineColor='#1F1937'
        style={styles.input}
        />
        <TextInput
        placeholder='Password'
        //value={}
        //onChangeText={text => }
        mode='outlined'
        outlineColor='#1F1937'
        activeOutlineColor='#1F1937'
        style={styles.input}
        
        secureTextEntry
        />
        </View> 

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('HomePage')
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
        </View>
        
    )
}



const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:
    {
        width: '100%',
    

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: '1%',
        paddingVertical: '0.2%',
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
        marginTop: '30%',
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