import { View, StyleSheet } from "react-native";
import { Button,  Text, Icon } from 'react-native-paper';
import { Pressable } from "react-native";

const Filters = (props) => {
  return (
    <>
   
        <Text style={{paddingRight:'20%', marginLeft:'6%', fontWeight:'bold', marginTop:"4%" }}>Sort by </Text>
      <View style={styles.container}>
        <Pressable mode="outlined"  style={[styles.buttons, {
          backgroundColor:props.inUseFilter === 1 ? '#1F1937' : 'white',
          borderColor:'#1F1937',
          borderWidth:2,
          justifyContent:'center'
          }]} onPress={() => props.handleSetFilter(1)}>
          <Icon source='map-marker-distance' color={props.inUseFilter === 1 ? 'white' : '#1F1937'} size={20} style={{paddingLeft:'30%'}}></Icon>
          <Text style={{fontSize:18, color:props.inUseFilter === 1 ? 'white' : '#1F1937'}}>Distance</Text>
        </Pressable>
        <Pressable   mode="outlined" style={[styles.buttons, {
          backgroundColor:props.inUseFilter === 2 ? '#1F1937' : 'white',
          borderColor:'#1F1937',
          borderWidth:2,
          justifyContent:'center'
          }]} onPress={() => props.handleSetFilter(2)}>
          <Icon source='star' color={props.inUseFilter === 2 ? 'white' : '#1F1937'} size={20}></Icon>
          <Text style={{fontSize:18, color:props.inUseFilter === 2 ? 'white' : '#1F1937'}}>Rating</Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: '2%',
    alignContent:'center',
    justifyContent:'center',
    marginBottom:'2%',
    columnGap:'4%',
    paddingRight:'6%',
    paddingLeft:'6%'
  },
  buttons: {
    
   
    width: '50%',
    height:'100%',
    borderRadius: 10,
    flex: 1,
    
    fontSize: 8, 
    flexDirection:'row', 
    columnGap:'10%', 
    alignContent:'flex-start', 
    alignItems:'flex-start', 
    justifyContent:'flex-start', 
    padding:'2%',
    paddingBottom:'2%',
    
    width: '100%',
    
   
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '2%',



  }
});

export default Filters;