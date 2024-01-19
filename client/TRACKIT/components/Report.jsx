import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Card, List, Avatar, Portal, PaperProvider } from 'react-native-paper';
import { useState, useCallback, useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import TopBar from './TopBar';
import API from '../API';

const ReportScreen = ({ navigation }) => {
  const [allTopics, setAllTopics] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeakness, setSelectedWeakness] = useState('');
  const [weaknessesAvg, setWeaknessesAvg] = useState([]);
  const [weaknessData, setWeaknessData] = useState([]);
  const [generalPieData, setGeneralPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const pieData = [
    { value: 70, color: '#009FFF', gradientCenterColor: '#006DFF', focused: true },
    { value: 30, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    // { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    // { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    // { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];

  useEffect(() => {
    API.getEvaluationsByStudentId().then((evals) => {
      setEvaluations(evals);
      // Group data by TopicId
      const groupedByTopic = evals.reduce((acc, item) => {
        const key = item.TopicId;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      // Calculate the average rating for each TopicId
      const averageRatingsByTopic = Object.entries(groupedByTopic).map(([topicId, ratings]) => {
        const totalRatings = ratings.length;
        const sumOfRatings = ratings.reduce((sum, item) => sum + parseFloat(item.Rating), 0);
        const averageRating = sumOfRatings / totalRatings;
        return { TopicId: parseInt(topicId), AverageRating: averageRating };
      });

      averageRatingsByTopic.sort((a, b) => parseFloat(a.AverageRating) - parseFloat(b.AverageRating));
      const lowestRatings = averageRatingsByTopic.slice(0, 3);
      
      // [{"AverageRating": 2, "TopicId": 4}, {"AverageRating": 3, "TopicId": 3}, {"AverageRating": 3.5, "TopicId": 6}]
      //console.log(lowestRatings);

      API.getAllTopics().then((topics) => {
        const uniqueTitles = new Set();
        const avgTopic = new Set();

        lowestRatings.forEach(({ TopicId, AverageRating }) => {
          const match = topics.find(({ Id }) => Id === TopicId);
          if (match && !uniqueTitles.has(match.Title)) {
            uniqueTitles.add(match.Title);
            avgTopic.add({title: match.Title, avg: AverageRating});
          }
        });

        setAllTopics(topics);
        setWeaknesses([...uniqueTitles]);
        // [{"avg": 2, "title": "Hill start"}, {"avg": 3, "title": "Parking"}, {"avg": 3.5, "title": "Emergency break"}]
        setWeaknessesAvg([...avgTopic]);
      })
      
      // fetch weakness data for pie chart 
      const result = WeaknessPie(selectedWeakness);
      setWeaknessData(result);

      const generalPieData = generalPie(averageRatingsByTopic);
      setGeneralPieData([...generalPieData]);

      setLoading(false);
    });
  }, [selectedWeakness]);

  // prepare the data for the pie chart of a specific weakness
  const WeaknessPie = (topic) => {
    const weakness = weaknessesAvg.find((w) => (w.title === topic));
    const value = weakness? weakness.avg*10 : 0;

    const data = [{value: value, color: 'red', gradientCenterColor: '#3BE9DE'}, { value: 100-value, color: 'lightgrey', gradientCenterColor: 'lightgrey' }];
    return data;
  };

  // prepare the data for the pie chart of a specific weakness
  const generalPie = (topics) => {
    const data = new Set();
    topics.forEach((t) => {
      data.add({value: t.AverageRating*10, gradientCenterColor: '#006DFF'});
    });

    
    
    return data;
  };

  const tips = () => {
    const topics = allTopics.filter((t) => {
      return !evaluations.some((e) => (e.TopicId === t.Id))
    });

    return <>
      <Text style={{ paddingBottom: 6, fontSize:16}}> Here is a list of topics you didn't practice yet:</Text>
      { topics && topics.length > 0 && (
        topics.map((topic) => (
          <Text key={topic.Id} style={{fontSize:16}}>{`\u2022 ${topic.Title}`} </Text>
        ))
      )}
    </>
  }

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
        <Text style={{ color: "white", paddingBottom:5 , marginLeft: '25%'}}> Best performances:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#006DFF')}
            <Text style={{ color: 'white' }}>U turn: 90%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#8F80F3')}
            <Text style={{ color: 'white' }}>Gear shifting: 79%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
            {renderDot('#3BE9DE')}
            <Text style={{ color: 'white' }}>Steering: 79%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#FF7F97')}
            <Text style={{ color: 'white' }}>Signals and roundabouts: 75%</Text>
          </View>
        </View>
      </>
    );
  };

  

  const handleWeaknessTopic = (topic) => {
    setSelectedWeakness(topic);
    setModalVisible(true);
  };

  // const Item = ({ title }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{`\u2022 ${title}`}</Text>
  //   </View>
  // );

  const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb" color='yellow' />

  return (
    <SafeAreaProvider>
      <TopBar navigation={navigation} />
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
              <Text style={{ color: 'white', fontSize: 15, paddingBottom:5 }}> Average performance over all rides  </Text>
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
                        70%
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
                <List.Item key={index} title={`\u2022 ${weakness}`} titleStyle={styles.title} description="more.." descriptionStyle={styles.description} style={{ marginBottom: -5 }} onPress={() => handleWeaknessTopic(weakness)} />
              ))}
            </List.Section>
          </View>
          <Card mode='contained' style={{marginLeft:10, marginRight:10}}>
            <Card.Title title="Feedback: Good" subtitle="Tips for next practice" titleVariant='titleLarge' left={LeftContent} />
            <Card.Content>
              
              {/* <Text variant="bodyLarge"> Tips for next practice: </Text> */}
                {tips()}
            </Card.Content>
          </Card>
          <Modal visible={modalVisible} transparent={true} animationType="slide" onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.containerStyle}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{selectedWeakness}</Text>
                <PieChart
                data={loading ? [] : weaknessData}
                showGradient
                //radius={120}
                centerLabelComponent={() => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                      {loading ? "-" : weaknessData[0].value}%
                      </Text>
                    </View>
                  );
                }}
              />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
  description: {
    fontSize: 12,
    marginTop: 8,
    marginLeft: 6,
    color: "#a158cc"
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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
});

export default ReportScreen


