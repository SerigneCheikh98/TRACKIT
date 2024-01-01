import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from 'react-native-paper'
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";

const UserItem = (props) => {
  return (
    <TouchableOpacity
    onPress={()=>{
        props.navigation.navigate('BookingPage')
    }}
    style={styles.button}
    >
    
    <View style={styles.container} >
      <View style={styles.icon}>
        <Avatar.Text size={35} style={styles.avatar} color={'white'} label={props.user.name[0] + props.user.lastname[0]}/>
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 20}}>{props.user.name + ' ' + props.user.lastname}</Text>
        <Text><Rating num={props.user.rating} /> </Text>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text>{props.user.distance + ' Kms away'}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}

const Rating = (props) => {
  const stars = [];
  let i;
  for (i = 0; i < props.num; i++) {
    stars.push(<Icon key={i} name='star' type="material" size={15}/>);
  }
  while( i < 5 ) {
    stars.push(<Icon key={i} name='star-border' color='black' type="material" size={15}/>);
    i++
  }

  return (
    <>
      {stars}
    </>
  );
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 6,
      padding: '2%',
      marginVertical: '1%',
      borderWidth: 1,
      borderRadius: 10
    },
    icon: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center'
    },
    avatar: {
      backgroundColor: '#1F1937'
    }
  });

export default UserItem;