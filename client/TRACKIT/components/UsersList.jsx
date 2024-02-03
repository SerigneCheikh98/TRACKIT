import { useState } from "react";
import Filters from "./Filters";
import UserItem from "./UserItem";
import { View, StyleSheet, ScrollView } from "react-native";

const UsersList = (props) => {

    

    const sortingFn = (a,b)=>
    {
        if(props.inUseFilter == 1)
        { 
           return a.distance-b.distance
        }
        else if(props.inUseFilter == 2) 
        { return b.rating - a.rating 
         }
         else { 
        return parseInt(a.from.split(':')[0]) - parseInt(b.from.split(':')[0])
        }
    }
    



    const toggleDropdown = (index) => {
        if(showDrop == index)
            setShowDrop(-1)
        else setShowDrop(index);
    };
    const [showDrop, setShowDrop] = useState(-1)
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');

    return (
        <>
            <View style={styles.container}>
                {   
                    props.users.length != 0 &&
                    <Filters inUseFilter={props.inUseFilter} handleSetFilter={props.handleSetFilter}/>
                }
                <View style={styles.list}>
                    {/* <ScrollView> */}
                    {
                        props.users.sort(sortingFn).map((item, index) => {
                         
                            return <UserItem params={props.params} showDrop={showDrop} toggleDropdown={toggleDropdown} key={index} index={index} style={styles.list} user={item} available={props.available} duration={props.duration} timeUnit={props.timeUnit} throwPopup={props.throwPopup} closePopup={props.closePopup} setSelectedButtons={setSelectedButtons} selectedButtons={selectedButtons}/>
                        })
                    }
                    {/* </ScrollView> */}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: '2%',
      backgroundColor: '#fff',

    },
    list: {
        paddingHorizontal: '6%',
        paddingVertical: '2%'
    }
  });

export default UsersList;