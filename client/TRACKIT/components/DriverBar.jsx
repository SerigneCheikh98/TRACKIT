import { View, StyleSheet, Text } from "react-native"
import TopBar from "./TopBar"
import UserItem from "./UserItem"
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";

const DriverBar = (props) => {
    return (
                <View style={styles.container} >

                    <View style={styles.icon}>
                        <Avatar.Text size={80} style={styles.avatar} color={'white'} label={props.name[0] +props.lastname[0]}/>
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={{fontSize: 30}}>{props.name + " " + props.lastname}</Text>
                        <Text><Rating num={props.rating} /> </Text>
                    </View>

                </View>
    )
}

const Rating = (props) => {
    const stars = [];
    let i;
    for (i = 0; i < props.num; i++) {
      stars.push(<Icon key={i} name='star' type="material" size={30}/>);
    }
    while( i < 5 ) {
      stars.push(<Icon key={i} name='star-border' color='black' type="material" size={30}/>);
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
        paddingTop: '0%',
        padding: '4%',
        paddingBottom: '5%',
        alignItems: 'center'
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


export default DriverBar