import { View, StyleSheet, Pressable } from "react-native";
import { Text } from 'react-native-paper'
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";

function getDurationMin(from, to) {
  const min_from = from.split(':').map(val => parseInt(val))
  const min_to = to.split(':').map(val => parseInt(val))

  const diffInMinutes = (min_to[0]*60+min_to[1])-(min_from[0]*60+min_from[1])
  return diffInMinutes
}

function parseDuration(value, type) {
  if (type == 'min')
    return value
  else return value * 60
}
const UserItem = (props) => {
  const msg = `Attention\nYour chosen time slot is not fully covered`
  const danger = parseDuration(props.duration.value, props.timeUnit.value) > getDurationMin(props.user.from, props.user.to)
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => {
      if (danger) {
        props.throwPopup(msg, [{
          name: 'Close',
          fn: props.closePopup
        }])
      }
      else{
        navigation.navigate('BookingPage')

      } //link to the other page

    }}>
      <View style={styles.container} pointerEvents="none">
        <View style={styles.icon}>
          <Avatar.Text size={35} style={styles.avatar} color={'white'} label={props.user.name[0] + props.user.lastname[0]} />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 20 }}>{props.user.name + ' ' + props.user.lastname}</Text>
          <Text><Rating num={props.user.rating} /> </Text>
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text>{props.user.distance + ' Kms away'}</Text>
          {
            (props.available === false) && (
              <Text style={{ color: danger == true ? "#D50000" : 'black' }}> {props.user.from + ':' + props.user.to} </Text>
            )
          }
        </View>
      </View>
    </Pressable>
  )
}

const Rating = (props) => {
  const stars = [];
  let i;
  for (i = 0; i < props.num; i++) {
    stars.push(<Icon key={i} name='star' type="material" size={15} />);
  }
  while (i < 5) {
    stars.push(<Icon key={i} name='star-border' color='black' type="material" size={15} />);
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