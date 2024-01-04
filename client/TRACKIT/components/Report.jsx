import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Card, List, Avatar } from 'react-native-paper';
import { useState, useCallback } from 'react';
import { PieChart } from "react-native-gifted-charts";

const ReportScreen = ({ navigation }) => {
  const weaknesses = ["Initial setup", "Parking", "Intersections"];

  const pieData = [
    { value: 47, color: '#009FFF', gradientCenterColor: '#006DFF', focused: true },
    { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#006DFF')}
            <Text style={{ color: 'white' }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#8F80F3')}
            <Text style={{ color: 'white' }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#3BE9DE')}
            <Text style={{ color: 'white' }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#FF7F97')}
            <Text style={{ color: 'white' }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{`\u2022 ${title}`}</Text>
    </View>
  );

  const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb" color='yellow' />
  const tips = "You received good feedback practicing in the city, now it's time to practice parking! Start with L parking!";

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: '#34448B',
            flex: 1,
          }}>
          <View
            style={{
              margin: 20,
              padding: 16,
              borderRadius: 20,
              backgroundColor: '#232B5D',
            }}>
            <View style={{ padding: 20, alignItems: 'center' }}>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text
                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                        47%
                      </Text>
                      <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                    </View>
                  );
                }}
              />
            </View>
            {renderLegendComponent()}
          </View>
        </View>
        <View style={{ paddingVertical: 1 }}>
          <View>
            <List.Section title={`Top ${weaknesses.length} weaknesses:`} titleStyle={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline', color: 'black' }}>
              {weaknesses.map((weakness, index) => (
                <List.Item key={index} title={`\u2022 ${weakness}`} titleStyle={styles.title} style={{ marginBottom: -5 }} />
              ))}
            </List.Section>
          </View>
          <Card mode='contained'>
            <Card.Title title="Tips for next practice:" titleVariant='titleLarge' left={LeftContent} />
            <Card.Content>
              <Text variant="bodyLarge"> {tips} </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => { navigation.navigate('HomePage') }} style={styles.button} >
            <Text style={styles.buttonText}>Book your next lesson</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 20,
    margin: -8
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    color: '#782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  button:
  {
    backgroundColor: "#1F1937",
    width: '100%',
    padding: '4%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '2%',
    width: 210,

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ReportScreen


