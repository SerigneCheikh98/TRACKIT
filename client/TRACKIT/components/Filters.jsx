import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';

const Filters = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>Sort by: </Text>
        <Button icon="map-marker-distance" mode="outlined" style={styles.buttons} onPress={() => console.log('Pressed')}>
          Distance
        </Button>
        <Button  icon='star' mode="outlined" style={styles.buttons} onPress={() => console.log('Pressed')}>
          Rating
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: '2%'
  },
  buttons: {
    marginHorizontal: '2%',
    maxWidth: '40%',
    borderRadius: 10,
    flex: 1
  }
});

export default Filters;