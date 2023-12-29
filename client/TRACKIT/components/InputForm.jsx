import { View, StyleSheet } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { useState } from "react";

const InputForm = () => {
  const [location, setLocation] = useState("");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ flex: 1 }}
            mode='outlined'
            label="Location"
            value={location}
            onChangeText={location => setLocation(location)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <View style={{ flex: 2 }}></View>
          <Button style={styles.submitButton} buttonColor='black' mode="contained">
            Apply changes
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  textInputContainer: {
    flexDirection: 'row',
    paddingBottom: '4%',
  },
  submitButton: {
    flex: 1,
    borderRadius: 10
  }
});

export default InputForm;