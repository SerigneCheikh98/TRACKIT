import { Button, TextInput, Text, Appbar, Divider,} from 'react-native-paper'
import { Image, Linking, ScrollView } from 'react-native'
import {Icon} from '@rneui/themed'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import PhoneInput from 'react-native-international-phone-number';
const genders = [
    {label: "Female", value: '1'},
    {label: "Male", value: '2'},
]



const RegisterScreen = ({navigation}) =>{
    let [step, setStep] = useState("1");
    let [hidePassp, setHidePassp] = useState(true);
    let [hidePasscp, setHidePasscp] = useState(true);
    let [passIconp, setPassIconp] = useState("eye-off");
    let [passIconcp, setPassIconcp] = useState("eye-off");
    let [onFocusp, setOnFocusp] = useState(false);
    let [onFocuscp, setOnFocuscp] = useState(false);

    let  [gender, setGender] = useState(null);
    let  [onFocusg, setOnFocusg] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [inputValue, setInputValue] = useState('');


    const [checked, setChecked] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
   
    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }



    let [phoneNumber, setPhoneNumber] = useState('')

    return(

       <View>
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
          
            <KeyboardAvoidingView
            behavior='padding'>
                <ScrollView>
           
            {(step == 1) && 
                    <View style={styles.TextContainer}>
                     <TextInput  
                    label='Name'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    
                    />
                   
                    <TextInput  
                    label='Last Name'
                    //value={}
                    //onChangeText={text => }
                    mode='outlined'
                    outlineColor='#1F1937'
                    activeOutlineColor='#1F1937'
                    style={styles.input}
                    
                    />
                    <TextInput  keyboardType='email-address'
                    label='Email'
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
                    label='Password'
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
                    label='Confirm password'
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
{(step != "1") && 
    
  
    <View style={styles.TextContainer}>
                 
                  <Text variant="titleSmall" style={{marginTop:"7%", textAlign: 'left', alignItems: 'baseline'}} textColor="#1F1937">Personal Information</Text>
                 
                    <Dropdown 
                    style={styles.dropdown}
                    data={genders}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    activeColor='#1F1937'
                    
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Gender"
                    onChange={(item)=>{
                        setGender(item.value);
                        setOnFocusg(false);
                    }}
                    onFocus={()=>{
                    setOnFocusg(true);
                    }}
                    onBlur={()=>{setOnFocusg(false)}}
                    

                    />
                  
                    <View style={{width:"100%", height:"15%", marginLeft:"15%", marginBottom:"7sd%"}}>
                    <Text variant="titleSmall" style={{marginTop:"7%", marginLeft:"3%"}} textColor="#1F1937">Birth Date</Text>
                     <DateTimePicker  mode="date" display='spinner' value={new Date()}  style={{width:"80%", height:"100%"}} />
                     </View>
                    <View style={styles.phoneNumberCont}>
                    <PhoneInput 
                    value={inputValue}
                    onChangePhoneNumber={handleInputValue}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                    modalHeight="40%"
                    defaultCountry="IT"
                    customMask={[ '### ### ####','#### ####']}
                    placeholder="Phone Number"
                    excludedCountries={['IL']}
                     />
                     <Text variant="titleSmall" style={{marginTop:"7%"}} textColor="#1F1937">Upload Driving License</Text>
                     <View style={{ flexDirection: 'row' }}>
      <Button icon="camera" mode="contained" onPress={pickImage} style={[styles.buttonImport, { marginRight: 10 }]}>
        Front
      </Button>
      <Button icon="camera" mode="contained" onPress={pickImage} style={styles.buttonOutlineImport} textColor='#1F1937'>
        Back
      </Button>
    </View>
    <Text variant="titleSmall" style={{marginTop:"7%"}} textColor="#1F1937">Upload Identity Card</Text>
     <View style={{ flexDirection: 'row' }}>
      <Button icon="camera" mode="contained" onPress={pickImage} style={[styles.buttonImport, { marginRight: 10 }]}>
        Front
      </Button>
      <Button icon="camera" mode="contained" onPress={pickImage} style={styles.buttonOutlineImport} textColor='#1F1937'>
        Back
      </Button>
    </View>
   
                     </View>
                     <View>
                    
                     <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
                     </View>
    </View>
   


   }
            </ScrollView>
            </KeyboardAvoidingView>
          
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
    buttonImport:{
        backgroundColor: "#1F1937",
        width: '35%',
        borderColor: '#1F1937',
        borderWidth:2,
        borderRadius: 10,
        alignItems: 'center',

        marginTop: '3%',
    },
    buttonOutlineImport:{
        backgroundColor: 'white',
        marginTop: 5,
        width: '35%',
        borderColor: '#1F1937',
        borderColor: '#1F1937',
        borderWidth:2,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '3%',
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "80%",
        marginTop: "5%"
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      phoneNumberCont: {
        
        width: '93%', flex: 1, padding: 24,
        
      }

})

export default RegisterScreen;