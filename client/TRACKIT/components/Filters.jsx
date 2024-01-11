import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';

const Filters = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>Sort by: </Text>
        <Button icon="map-marker-distance" mode="outlined" labelStyle={{ color: props.inUseFilter === 1 ? '#1F1937' : 'grey' }} style={styles.buttons} onPress={() => props.handleSetFilter(1)}>
          Distance
        </Button>
        <Button  icon='star' mode="outlined" labelStyle={{ color: props.inUseFilter === 2 ? '#1F1937' : 'grey' }} style={styles.buttons} onPress={() => props.handleSetFilter(2)}>
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