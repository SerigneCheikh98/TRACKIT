import { Button, TextInput, Text, Appbar, Divider,  Title, Tooltip, Card, Avatar, IconButton, HelperText} from 'react-native-paper'
import { Image, Linking, ScrollView } from 'react-native'
import {Icon} from '@rneui/themed'
import Checkbox from 'expo-checkbox'
import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import Popup from './Popup'
import { Pressable } from 'react-native'
import PhoneInput from 'react-native-international-phone-number';
import { Tile, color } from '@rneui/base';
import { findLastIndex, pick } from 'lodash'
import Separator from './Separator'
import dayjs from 'dayjs'


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const genders = [
    {label: "Female", value: '1'},
    {label: "Male", value: '2'},
]



const RegisterScreen = ({navigation, route}) =>{
    const {source} =route.params || {};
    const [step, setStep] = useState(source ?? "1");
    const [hidePassp, setHidePassp] = useState(true);
    const [hidePasscp, setHidePasscp] = useState(true);
    const [passIconp, setPassIconp] = useState("eye-off");
    const [passIconcp, setPassIconcp] = useState("eye-off");
    const [onFocusp, setOnFocusp] = useState(false);
    const [onFocuscp, setOnFocuscp] = useState(false);

    
    
    //  input fields --- step 1 ---
    const [uname, setUname] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setConfPassword] = useState("");
    
    // submit
    const [submit, setSubmit] = useState(false);
    const [submitfinal, setSubmitfinal] = useState(false);
    
    // input fields --- step 2 ---

    const  [gender, setGender] = useState(null);
    const  [onFocusg, setOnFocusg] = useState(false);

    const [birthDate, setBirthDate] = useState(null)
    const [idImage, setIdImage] = useState(null);
    const [licImage, setLicImage] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null)
    
    


    const [checked, setChecked] = useState(false);
    

    const [requestSent, setRequestSent] = useState(false);
    const [open, setOpen] = useState(false);
    const onDismissSingle =() => {
      setOpen(false);
    };
  
    const onConfirmSingle = 
      () => {
        setOpen(false);
        setBirthDate(dayjs(birthDate).format('DD/MM/YYYY').toString());
      
      };
    

    const hashErrors = () => {
      return !mail.includes('@');
    };

   

    const pickImage = async (licenseImage) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          console.log(result.assets[0].uri);
          if(licenseImage){
            setLicImage(result.assets[0].uri);
          }
          else
          
          {setIdImage(result.assets[0].uri);
          }
          console.log("image lic", licImage);
          console.log("image id:", idImage);
        }
        
      };
   
   
    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }
    
    const [phoneNumber, setPhoneNumber] = useState(null)
    
    
    

    return(
      <SafeAreaProvider>
            <Appbar.Header style={{mode: 'center-aligned', backgroundColor:"#1F1937"}}>
           {  (step == 1 || step== 2 || source) && <Appbar.BackAction color='white' onPress={()=>{
                if(step == 1){
                setSubmit(false);
                navigation.navigate('LoginPage')}
            
                else{
                  
                    source ? navigation.navigate('ProfilePage') :setStep("1");
                }
               }}/>}
            <Appbar.Content  title={step != 3 ?"Registration": "Request Status"} titleStyle={{color: "white"}}/>
            {(step == 3 && source!=2) &&  <Appbar.Action icon="power" color='white' accessibilityLabel='Log out' onPress={()=>{navigation.navigate("LoginPage")}}></Appbar.Action>}
            
            </Appbar.Header>
          
            <ScrollView  >
            <KeyboardAvoidingView
            behavior='position'>
                <SafeAreaView>
           
            {(step == 1) && (requestSent == false) &&
                    <View style={styles.TextContainer}>
                     <TextInput  
                    label='Name'
                    value={uname}
                    //value={}
                    onChangeText={text => 
                      {
                        setSubmit(false)
                        setUname(text)}}
                    mode='outlined'
                    outlineColor = {submit && uname === '' ? 'red' : '#1F1937'}
                    activeOutlineColor = {submit && uname === '' ? 'red' : '#1F1937'}
                    style={styles.input}
                    
                    />
                   
                    <TextInput  
                    label='Last Name'
                    value={lastName}
                    //value={}
                    onChangeText={text => 
                      {setSubmit(false)
                      setLastName(text)
                    } }
                    mode='outlined'
                    outlineColor = {submit=== true && lastName === '' ? 'red' : '#1F1937'}
                    activeOutlineColor = {submit === true && lastName === '' ? 'red' : '#1F1937'}
                    style={styles.input}
                    
                    />
                    <TextInput  keyboardType='email-address'
                    label='Email'
                    value={mail}
                    //value={}
                    onChangeText={text => 
                      {
                        setSubmit(false)
                      setMail(text)
                    }}
                    mode='outlined'
                    outlineColor = {submit && mail === '' ? 'red' : '#1F1937'}
                    activeOutlineColor = {submit && mail === '' ? 'red' : '#1F1937'}
                    style={styles.input}
                    onFocus={()=>{setOnFocuscp(false)
                    setOnFocusp(false)}}
                    />
                    
                    <TextInput  
                    label='Password'
                    value={password}
                    //value={}
                    onChangeText={text => {
                      setSubmit(false)
                      setPassword(text)} }
                    mode='outlined'
                    outlineColor = {submit && password === '' ? 'red' : '#1F1937'}
                    activeOutlineColor = {submit && password === '' ? 'red' : '#1F1937'}
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
                    outlineColor = {(submit && conpassword=== '')||(submit && conpassword!=password)  ? 'red' : '#1F1937'}
                    activeOutlineColor = {(submit && conpassword=== '')||(submit && conpassword!=password)  ? 'red' : '#1F1937'}
                    style={styles.input}
                    onChangeText={text => {
                      setSubmit(false);
                      setConfPassword(text)} }
                    value={conpassword}
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
          setSubmit(true);
          console.log(submit);
          if((uname!="") && (lastName!="") && (mail!="") && (password!="") && (conpassword!="") && (password == conpassword))
           { 
            setStep('2');
            setSubmit(false);
            }
        }}
        style={styles.button}
        >
          
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {(submit===true &&
        ((uname==="") || (lastName==="") || (mail==="") || (password==="") || (conpassword===""))) &&
        <Text variant="labelSmall" style={{ marginTop: '7%', color:"red"}} >Fill in all fields before submitting</Text>}

        {(submit===true &&
        (uname!="") && (lastName!="") && (mail!="") && (password!="") && (conpassword!="") && (password != conpassword)) &&
        <Text variant="labelSmall" style={{ marginTop: '7%', color:"red"}} >Password confirmation is wrong</Text>}
          
        <Text variant="labelSmall" style={{ marginTop: '7%' }} >Already Registered?</Text>
        
       
                  
        <Text variant="labelSmall" style={{ color: 'grey', textDecorationLine: 'underline', justifyContent: 'center',
        alignItems: 'center', flex:1 }}
        onPress={()=>{ navigation.navigate('LoginPage')/* navigate to Registration */     }}
        >Login</Text>

      

        </View>
            
}
{(step == "2")  &&
    
 

    <View style={styles.TextContainer}>
 
<Text variant="titleLarge" style={{ marginBottom:"2%", fontWeight:'bold'}} textColor="#1F1937">Personal Information</Text>
                 
                  <View style={{width:"100%",  marginLeft:"15%", marginBottom:"3%"}}>
                    <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Gender 
                    <Text style={{ color: submitfinal&&gender==null ? 'red' : '#1F1937' }}> *</Text> 
                    </Text>
                    </TouchableOpacity>
                    <Dropdown 
                    style={[styles.dropdown]}
                    data={genders}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    activeColor='#F9C977'

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
                  
                 
                   <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Birth Date
                    <Text style={{ color: submitfinal&&birthDate==null ? 'red' : '#1F1937' }}> *</Text> </Text>
                    </TouchableOpacity>
                     {/* <DateTimePicker  mode="date" display='spinner' value={new Date() }  style={{width:"80%", height:"20%", borderBlockColor:'#1F1937', borderTopColor:"#1F1937"}} onChange={(date)=>{setBirthDate(date)}} /> */}
                     <Pressable onPress={() => {setBirthDate(undefined);setOpen(true)}}>
              <View pointerEvents="none">
                <TextInput
                style={{width:'80%'}}
                  mode='outlined'
                  label="DD/MM/YYYY"
                  outlineColor='#1F1937'
                  activeOutlineColor='#1F1937'
                  value={birthDate}
                  labelStyle={{ color: '#1F1937' }}
                />
                     
                     
                     <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={birthDate}
                  onConfirm={onConfirmSingle}
                />
                </View>
                </Pressable>
                     {/* <Text variant="titleSmall" style={{marginTop:"7%", marginLeft:"3%"}}  textColor="#1F1937">3. Profile Picture</Text>
                     <View style={{ flexDirection: 'row' }}>
      <Button icon="camera" mode="contained" onPress={pickImage} textColor="#1F1937" style={[styles.buttonOutlineImport, { marginRight: "70%", fontSize: 8 }]}>
        Upload photo
      </Button>
      </View>           */}
                    <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Driving License
                    <Text style={{ color: submitfinal&&licImage==null ? 'red' : '#1F1937' }}> *</Text> 
                    </Text>
                    </TouchableOpacity>
                     <View >
     { !licImage  && <Pressable icon="camera"  onPress={()=>pickImage(true)} textColor="#1F1937" style={[styles.buttonOutlineImport, { fontSize: 8, width: '80%', flexDirection:'row', columnGap:'10%', alignContent:'center', alignItems:'center', justifyContent:'center', paddingTop:'2%',paddingBottom:'2%' }]}>
        
        <Icon name='photo'></Icon>
        <Text>Upload photo</Text>
      </Pressable>}
      {licImage  &&  
      
      <View >
        <TouchableOpacity style={{flexBasis: "30%"}} onPress={()=>{}}>
      <Image source={{uri:licImage}}  style={{  width: 140,
        height: 110,
        borderWidth: 1.5, 
        borderColor: '#1F1937',
        marginBottom:10,
        marginTop:10,
        borderRadius:5, }}></Image> 
      </TouchableOpacity>
      
  <View style={{flexDirection: 'column', height: "50%",  width: "100%", marginLeft:"5%"}}>
  <Button
    icon="close"
    mode="contained"
    onPress={() => setLicImage(null)}
    textColor="#1F1937"
   
    style={[styles.buttonOutlineImport, {marginLeft: "7%", marginTop: 10, fontSize: 2, marginBottom: 10, width:"30%",   flexBasis: "50%", alignItems:'center' }]}
  >
    Cancel
  </Button>

  <Button
    icon="sync"
    mode="contained"
    onPress={() => pickImage(true)}
    textColor="#1F1937"
    style={[styles.buttonOutlineImport, { marginLeft: "7%", marginTop: 10, fontSize: 2, marginBottom: 10, width:"30%",   flexBasis: "50%",  alignItems:'center'  }]}
  >
    Change
  </Button>
  </View>
      </View>             }
    </View>
    <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Identity Card
                    <Text style={{ color: submitfinal&&idImage==null ? 'red' : '#1F1937' }}> *</Text> 
                    </Text>
                    </TouchableOpacity>
    <View style={{ flexDirection: 'row' }}>
     { !idImage  && <Pressable icon="camera" mode="contained" onPress={()=>pickImage(false)} textColor="#1F1937" style={[styles.buttonOutlineImport, { fontSize: 8, width: '80%', flexDirection:'row', columnGap:'10%', alignContent:'center', alignItems:'center', justifyContent:'center', paddingTop:'2%',paddingBottom:'2%' }]}>
        <Icon name='photo'/>
        <Text>Upload photo</Text>
      </Pressable>}
      {idImage  &&  
      
      <View style={{
        flexDirection: 'row'}}>
        <TouchableOpacity style={{flexBasis: "30%"}} onPress={()=>{}}>
      <Image source={{uri:idImage}}  style={{  width: 140,
        height: 110,
        borderWidth: 1.5, 
        borderColor: '#1F1937',
        marginBottom:10,
        marginTop:10,
        borderRadius:5, }}></Image> 
      </TouchableOpacity>
      
  <View style={{flexDirection: 'column', height: "50%",  width: "100%", marginLeft:"5%"}}>
  <Button
    icon="close"
    mode="contained"
    onPress={() => setIdImage(null)}
    textColor="#1F1937"
   
    style={[styles.buttonOutlineImport, {marginLeft: "7%", marginTop: 10, fontSize: 2, marginBottom: 10, width:"30%",   flexBasis: "50%", alignItems:'center' }]}
  >
    Cancel
  </Button>

  <Button
    icon="sync"
    mode="contained"
    onPress={() => pickImage(false)}
    textColor="#1F1937"
    style={[styles.buttonOutlineImport, { marginLeft: "7%", marginTop: 10, fontSize: 2, marginBottom: 10, width:"30%",   flexBasis: "50%",  alignItems:'center'  }]}
  >
    Change
  </Button>
  </View>
      </View>             }
    </View>
   
                  <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}> Description
                    <Text style={{ color: submitfinal && description.length== 0 ? 'red' : '#1F1937' }}> *</Text> 
                    </Text>
                    </TouchableOpacity>
                    <TextInput
                    multiline={true}
                    mode='outlined'
                    style={
                      {
                        backgroundColor: 'white',
                        width: '80%',
                        fontSize:12

                      }
                    }
                    placeholder={'Tell us more about yourself....'}
                    textColor='#1F1937'
                    value={description}
                    onChangeText={(text)=>{
                      
                      setDescription(text)
                      console.log(description)
                      
                    }}
                    ></TextInput>
                     
                     <TouchableOpacity style={
                        styles.titledesign        
                    }>
                    <Text  style={{color:'#1F1937', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Phone number
                    <Text style={{ color: submitfinal && phoneNumber.length==0 ? 'red' : '#1F1937' }}> *</Text> 
                    </Text>
                    </TouchableOpacity>
                    <View style={{
                      width:'80%'
                    }}>
                    <PhoneInput 
                    style={
                      {
                        width: '43%',
                        flex:1, 
                       
                        
                        paddingRight:13,
                        paddingLeft: 13,
                        height:"100%",
                        marginBottom: "7%",
                        marginTop:"10%"

                  }
                    }
                    value={phoneNumber}
                    onChangePhoneNumber={(number)=>{setPhoneNumber(number)}}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                    modalHeight="40%"
                    defaultCountry="IT"
                    customMask={[ '### ### ####','#### ####']}
                    placeholder="Phone Number"
                    excludedCountries={['IL']}
                     />
                     </View>
                     <View style={{
                      flex:1
                     }}>
        </View>     

        </View>          
        {((gender == null ||   birthDate == null  || idImage == null || licImage == null || phoneNumber.length ==0 )&& submitfinal)
            && <Text style={{color:'red', marginTop:'7%'}}>Fill in all fields before sending request</Text>}
        <TouchableOpacity    
        onPress={()=>{
          setRequestSent(true);
          setSubmitfinal(true);
          console.log(step);
            if((gender  && birthDate  && idImage && licImage  && phoneNumber )){
            setStep('3');
            }
            else {
              console.log(phoneNumber);
              setRequestSent(false);
              console.log(submitfinal);
              
            }
            console.log(step);
            console.log(description)
        }}
        style={[styles.buttonSubmit, width="100%",  marginRight="20%", marginTop="3%", marginBottom='20%']}
        >
          
            <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

        </View>          
  
   


   }
   {(step == "3") && <View style={{height:"100%", flex:1, alignContent:'center',}}>
   <Card style={{width: "90%", marginLeft:"5%", flex:1, height:"100%"}}>
   <Card.Title
    title="Pending request"
    subtitle=""
    
    left={(props) => <Avatar.Icon {...props} style={{backgroundColor:'#1F1937'}} icon="reflect-vertical"  />}
     />
     <Card.Content>
      <Text variant="bodyMedium">Your request is still being processed by our team. 
      
      </Text>
     
      <Text variant='bodySmall'>Estimated response time: 3-4 working days</Text>
    </Card.Content>
     </Card>
     {source &&  
     <TouchableOpacity
        onPress={()=>{
          setSubmit(true);
          console.log(submit);
          if((uname!="") && (lastName!="") && (mail!="") && (password!="") && (conpassword!="") && (password == conpassword))
           { 
            setStep('2');
            setSubmit(false);
            }
            navigation.navigate('Home');
        }}
        style={styles.buttonHome}
        >
        <Text style={[styles.buttonText,  marginBottom=0]}>Go Back Home</Text>

        </TouchableOpacity>
        }
     
  
    
    </View>}
          </SafeAreaView>
            </KeyboardAvoidingView>
            </ScrollView>
          
          </SafeAreaProvider>
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
        padding: '4%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10%',
        width: "40%",

    },
    buttonSubmit:
    {
        backgroundColor: "#1F1937",
        padding: '4%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '7%',
        width: "40%",
        marginLeft: "35%",
        marginBottom:'7%'

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
        width: '40%',
        borderColor: '#1F1937',
        borderWidth:2,
        borderRadius: 10,
       

        marginTop: '3%',

    },
    buttonOutlineImport:{
        backgroundColor: 'white',
        width: '100%',
        
        borderColor: '#1F1937',
        borderWidth:2,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '2%',
    },
    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 12,
     

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
        
        width: '93%',
        flex:1, 
        paddingRight:13,
        paddingLeft: 13,
        
        marginBottom: "7%",
        marginTop:"10%"
        
        
      },
      buttonHome:
      {
          backgroundColor: "#1F1937",
          padding: '4%',
          borderRadius: 10,
          alignItems: 'center',
          marginTop: '10%',
          width: "40%",
          alignSelf:'center'
      },
      titledesign:
      {
                        borderRadius:25,
                       
                        color:'white',
                        width:130,
                        height:15,
                        alignItems:'flex-start',
                        justifyContent:'flex-start',
                        marginTop:"7%", 
                        marginBottom:"2%"
      }
    

})

export default RegisterScreen;