import { Button, TextInput, Text, Appbar} from 'react-native-paper'
import { Image, Linking, ScrollView } from 'react-native'
import {Icon} from '@rneui/themed'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';


const RegisterScreen = ({navigation}) =>{
    let [step, setStep] = useState("1");
    let [hidePassp, setHidePassp] = useState(true);
    let [hidePasscp, setHidePasscp] = useState(true);
    let [passIconp, setPassIconp] = useState("eye-off")
    let [passIconcp, setPassIconcp] = useState("eye-off")
    let [onFocusp, setOnFocusp] = useState(false)
    let [onFocuscp, setOnFocuscp] = useState(false)
    return(
        <SafeAreaProvider>
            <Appbar.Header style={{mode: 'center-aligned', backgroundColor:"#1F1937"}}>
            <Appbar.BackAction color='white' onPress={()=>{
                if(step == 1){
                navigation.navigate('LoginPage')}
            
                else{
                    setStep("1");
                }
                }}/>
            <Appbar.Content  title="Registration" titleStyle={{color: "white"}}/>
            </Appbar.Header>
            <SafeAreaView>
            <ScrollView>
            {(step == 1) && 
                    <View style={styles.TextContainer}>
                    <TextInput  keyboardType='email-address'
                    placeholder='Email'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    onFocus={()=>{setOnFocuscp(false)
                    setOnFocusp(false)}}
                    />
                    <TextInput  
                    placeholder='Password'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    onFocus={()=>{setOnFocusp(true)
                    setOnFocuscp(false)}}
                    
                    
                    right={
                        onFocusp &&
                        <TextInput.Icon
                        style={{screenLeft: 0, color: "#1F1937", size:20}}
                          icon={passIconp}
                          color= "#1F1937"
                          onPress={() => {
                            
                            if(hidePassp)
                            {
                                setPassIconp("eye");
                                setHidePassp(false)
                            }
                            else{
                                setPassIconp("eye-off");
                                setHidePassp(true)
                            }
                        }}
                        />
                      }
                      secureTextEntry={hidePassp}
                    />
                  
                    <TextInput  
                    placeholder='Confirm password'
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    onFocus={()=>{setOnFocusp(false)
                        setOnFocuscp(true)}}
                    right={
                        onFocuscp &&
                        <TextInput.Icon
                        style={{screenLeft: 0, color: "#1F1937", size:20}}
                          icon={passIconcp}
                          color= "#1F1937"
                          onPress={() => {
                            
                            if(hidePasscp)
                            {
                                setPassIconcp("eye");
                                setHidePasscp(false)
                            }
                            else{
                                setPassIconcp("eye-off");
                                setHidePasscp(true)
                            }
                        }}
                        />
                      }
                    secureTextEntry={hidePasscp}
                    />
                    <TouchableOpacity
        onPress={()=>{
            setStep('2');
        }}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text variant="labelSmall" style={{ marginTop: '7%' }} >Already Registered?</Text>
        
       
        <Text variant="labelSmall" style={{ color: 'grey', textDecorationLine: 'underline', justifyContent: 'center',
        alignItems: 'center', flex:1 }}
        onPress={()=>{ navigation.navigate('LoginPage')/* navigate to Registration */     }}
        >Login</Text>
        </View>
            
}
{(step != "1") && <View>




    </View>}
            </ScrollView>
            </SafeAreaView>
            </SafeAreaProvider>
    )
}




const RegsitrationStep1 = ({navigation}) => {


    return(
<ScrollView>
            <Appbar.Header style={{mode: 'center-aligned', backgroundColor:"#1F1937"}}>
            <Appbar.BackAction color='white' onPress={()=>{navigation.navigate('LoginPage')}}/>
            <Appbar.Content  title="Registration" titleStyle={{color: "white"}}/>
            </Appbar.Header>
            <SafeAreaView>
                    <View style={styles.TextContainer}>
                    <TextInput  keyboardType='email-address'
                    placeholder='Email'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    
                    />
                    <TextInput  secureTextEntry={true}
                    placeholder='Password'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    right = {<TextInput.Icon icon="eye" color= "#1F1937"/>}
                    />
                    <TextInput  secureTextEntry={true}
                    placeholder='Confirm password'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    right={
                        
                        <TextInput.Icon
                        style={{screenLeft: 0, color: "#1F1937", size:20}}
                          name="eye"
                          color= "#1F1937"
                          onPress={() => setHidePass(!hidePass)}
                        />
                      }
                    />
                    <TouchableOpacity
        onPress={()=>{
            navigation.navigate('HomePage')
        }}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text variant="labelSmall" style={{ marginTop: '7%' }} >Already Registered?</Text>
        
       
        <Text variant="labelSmall" style={{ color: 'grey', textDecorationLine: 'underline', justifyContent: 'center',
        alignItems: 'center', flex:1 }}
        onPress={()=>{ navigation.navigate('LoginPage')/* navigate to Registration */     }}
        >Login</Text>
        </View>
            
            </SafeAreaView>
            </ScrollView>

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
    TextContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        
        
    },
    button:
    {
        backgroundColor: "#1F1937",
        width: '100%',
        padding: '4%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10%',
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

export default RegisterScreen;