import Filters from "./Filters";
import { useState } from "react";
import UserItem from "./UserItem";
import { View, StyleSheet } from "react-native";

const UsersList = () => {
    const [users, setUsers] = useState([{
        username: 'Liam Carter',
        rating: 4,
        distance: 0.5
    },
    {
        username: 'Sophia Chang',
        rating: 3,
        distance: 0.8
    },
    {
        username: 'Oliver Patel',
        rating: 5,
        distance: 12
    },
    {
        username: 'Gianni',
        rating: 5,
        distance: 15
    }
    ])

    return (
        <>
            <View style={styles.container}>
                <Filters />
                <UserItem />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

export default UsersList;