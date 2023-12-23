import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';

const Sliders = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <View style={styles.contentView}>
        <Text style={styles.subHeader}>Distance</Text>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={4}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 0, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={10}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
              />
            ),
          }}
        />
        <Text style={{ paddingTop: 20 }}>Value: {value}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    paddingHorizontal: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  subHeader: {
    color: 'black',
    textAlign: 'left',
    paddingVertical: 10,
  },
});

export default Sliders;
