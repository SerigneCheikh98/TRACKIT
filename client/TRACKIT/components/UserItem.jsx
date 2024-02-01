import { View, StyleSheet, Pressable } from "react-native";
import { Button, Text } from 'react-native-paper'
import { Avatar, TextInput } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import { TimePickerModal } from 'react-native-paper-dates';
import { useState, useCallback, useEffect } from "react";

function getDurationMin(from, to) {
  const min_from = from.split(':').map(val => parseInt(val))
  const min_to = to.split(':').map(val => parseInt(val))

  const diffInMinutes = (min_to[0] * 60 + min_to[1]) - (min_from[0] * 60 + min_from[1])
  return diffInMinutes
}

function parseDuration(value, type) {
  if (type === 'min')
    return value
  else return value * 60
}
const UserItem = (props) => {
  const navigation = useNavigation();

  // const [showDrop, setShowDrop] = useState(false)
  const [visible, setVisible] = useState(false)
  const [start, setStart] = useState(-1)
  const [end, setEnd] = useState(-1)
  
  const [numSlots, setNumSlots] = useState(null);

  selectedButtons = props.selectedButtons
  setSelectedButtons = props.setSelectedButtons
  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      props.params.setTime(`${hours}:${minutes}`)
    },
    [setVisible]
  );

  const msg = `Attention\nYour chosen time slot is not fully covered`
  const danger = parseDuration(props.params.duration.value, props.params.timeUnit) > getDurationMin(props.user.from, props.user.to)
  
  const startingTime = dayjs(props.user.from).format('HH;mm')

  // const toggleDropdown = () => {
  //   setShowDrop(!showDrop);
  // };

  return (
    <Pressable onPress={() => {
      setSelectedButtons([])
      if (danger) {
        props.throwPopup(msg, [
          {
            name: 'Book anyway',
            fn: () => {
              
          navigation.navigate("BookingPage", { name: props.user.name, lastname: props.user.lastname, rating: props.user.rating, description: props.user.description, rideId : props.user.rideId, from: props.user.from, to: props.user.to, selectedButtons: selectedButtons })
          props.closePopup()
          }
          }
          ,{
            name: 'Close',
            fn: props.closePopup
          }
        ])
      }
      else {

        props.toggleDropdown(props.index)
      }
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
            
          <Text style={{color: danger == true ? "#D50000" : 'black', marginRight:11 }}>{props.user.from + ' - ' + props.user.to} </Text>
            
          }
        </View>
      </View>
      {props.showDrop == props.index && (
        <View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 0.7, borderColor: '#1F1937', borderRadius: 10, marginTop:-3.5, marginBottom:'1%'}}>
          <Text style={{ fontSize: 16, marginTop:'3%' }}>{selectedButtons.length == 0 && numSlots==1 ?"Choose slot" : selectedButtons.length == 0 && numSlots!=1 ? "Pick starting slot": selectedButtons.length==1 && numSlots!=1 ?"Pick ending slot or Confirm" : "Confirm Selection"}</Text>
          <Slots from={props.user.from} to={props.user.to} start={start} end={end} selectedButtons = {selectedButtons} setSelectedButtons = {setSelectedButtons} numSlots={numSlots} setNumSlots={setNumSlots}/>
          <Button mode="outlined" textColor="white" style={[{ flex: 1, width: '90%', borderRadius: 10, marginBottom: '2%', backgroundColor:'#1F1937' }]} onPress={() => 
            
            {
              props.toggleDropdown(-1);
              navigation.navigate("BookingPage", {name : props.user.name, lastname : props.user.lastname, rating : props.user.rating, description : props.user.description, rideId : props.user.rideId, from: props.user.from, to: props.user.to, selectedButtons: selectedButtons}) }}>
            Confirm
          </Button>
        </View>
      )}
      {/* {props.showDrop == props.index && (
        <View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, borderTopWidth: 0}}>
        </View>
      )} */}
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



const Slots = ({ from, to, selectedButtons, setSelectedButtons,numSlots, setNumSlots }) => {
  const min_from = from.split(':').map(val => parseInt(val))
  const min_to = to.split(':').map(val => parseInt(val))
  const label = []
  if (min_from[1] > 30) min_from[0]++

  while ((min_from[0] != min_to[0])) {
    let str = `${min_from[0] < 10 ? '0' + min_from[0] : min_from[0]}:${min_from[1] < 10 ? '0' + min_from[1] : min_from[1]}`
    if (min_from[1] == 30) {
      min_from[0] += 1
      min_from[1] = 0
    }
    else {
      min_from[1] = 30
    }
    str += ` - ${min_from[0] < 10 ? '0' + min_from[0] : min_from[0]}:${min_from[1] < 10 ? '0' + min_from[1] : min_from[1]}`
    label.push(str)
  }
  if (min_to[1] == 30) {
    label.push(`${min_from[0] < 10 ? '0' + min_from[0] : min_from[0]}:${min_from[1] < 10 ? '0' + min_from[1] : min_from[1]} - ${min_to[0] < 10 ? '0' + min_to[0] : min_to[0]}:${min_to[1] < 10 ? '0' + min_to[1] : min_to[1]}`)
  }

  let comp = []
  for (let i = 0; i < label.length; i += 2) {
    comp.push(label[i] + '~' + label[i + 1])

  }
  comp = comp.filter(a => a != 'undefined')

  const [flag, setFlag] = useState(false)

  const handleButtonClick = (index) => {
    if(selectedButtons.length > 1) {
      setSelectedButtons([])
    }
    else if(selectedButtons.length == 0) {
      setSelectedButtons([index])
    }
    else {
      const start = selectedButtons.pop()
      const sel = []
      for(let i = start; i <= index; i++){
        sel.push(i)
      }


    
      setSelectedButtons(sel)
    }
  };

  const getButtonStyle = (index) => {
    return selectedButtons.includes(index) ? { backgroundColor: '#F9C977' } : {};
  };

  setNumSlots(comp.length);

  return (
    <>
{console.log(comp.length)}
      {comp.map((item, index) => {
        const label = item.split('~')
        return (
        <View key={index} style={{flexDirection: 'row', alignContent: 'space-between'}}>
          <View key={index*2} style={{paddingHorizontal: '2%', flex: 1, paddingVertical: '2%'}}>
              <Button
                key={index*2} 
                mode="outlined"
                style={[{ flex: 1, borderRadius: 10 }, getButtonStyle(index*2)]}
                onPress={() => handleButtonClick(index*2)}
              >
                {label[0]}
              </Button>
            </View>
            <View key={index*2 + 1} style={{paddingHorizontal: '2%', flex: 1, paddingVertical: '2%'}}>
              { 
                label[1] != "undefined" &&
                <Button
                  key={index*2 + 1}
                  mode="outlined"
                  style={[{ flex: 1, borderRadius: 10 }, getButtonStyle(index*2 + 1)]}
                  onPress={() => handleButtonClick(index*2 + 1)}
                >
                  {label[1]}
                </Button>

              }
            </View>
          </View>
        );
      })}
    </>
  );
};


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