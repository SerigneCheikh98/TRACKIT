import Filters from "./Filters";
import { useState } from "react";
import UserItem from "./UserItem";
import { View, StyleSheet } from "react-native";

const UsersList = (props) => {
    return (
        <>
            <View style={styles.container}>
                <Filters />
                <View style={styles.list}>
                    {
                        props.users.map(item => {
                            return <UserItem key={item.userId} style={styles.list} user={item} />
                        })
                    }
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