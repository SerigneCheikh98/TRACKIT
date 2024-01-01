import Filters from "./Filters";
import UserItem from "./UserItem";
import { View, StyleSheet, ScrollView } from "react-native";

const UsersList = (props) => {
    const sortingFn = (props.inUseFilter == 1 ? (a, b) => a.distance-b.distance : (a, b) => a.rating - b.rating)
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
                        props.users.sort(props.inUseFilter != 0 ? sortingFn : () => {}).map(item => {
                            return <UserItem navigation={props.navigation} key={item.userId} style={styles.list} user={item} />
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