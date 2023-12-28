import { View, StyleSheet } from "react-native";
import { Icon, Text } from 'react-native-paper'

const UserItem = () => {
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {/* <Icon
        name="profile"
        type="material"
        size={23}
        color=""
        /> */}
        <Text>ICON</Text>
      </View>
      <View style={{flex: 3}}>
        <Text>NOME</Text>
        <Text>RATING</Text>
      </View>
      <View style={{flex: 2}}>
        <Text>DISTANCE</Text>
      </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1
    },
    buttons: {
      flex: 1,
    }
  });

export default UserItem;