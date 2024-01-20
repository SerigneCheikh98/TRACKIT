import { View, StyleSheet, Text,SafeAreaView,VirtualizedList } from "react-native"
import TopBar from "./TopBar"
import UserItem from "./UserItem"
import { Avatar } from "react-native-paper";
import { Icon } from "@rneui/themed";
import DriverBar from "./DriverBar";
import DriverDescription from "./DriverDescription";
import Topics from "./LessonTopics";

const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 5;
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Booking = ({navigation, route}) => {
  console.log(route.params);

  const { name, lastname, rating, description } = route.params;

  return (
            <View>
                <TopBar back={'HomePage'}/>
                <View style={styles.bigContainer} >
                    <DriverBar name = {name} lastname = {lastname} rating = {rating}/>
                    <DriverDescription name = {name} description = {description}/>
                    <Topics/>

                </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1    },
    item: {
      backgroundColor: '#f9c2ff',
      height: 150,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
    scroll: {
    },
    bigContainer:{
      marginTop: '5%',
      height: '83%'
    }
  });



export default Booking