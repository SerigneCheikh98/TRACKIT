import { useState, useCallback, useEffect, React } from 'react';
import API from '../API';


import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const staticTopics = [{
    topicName: 'U turn',
    critical: true
},
{
    topicName: 'Signals and roundabouts',
    critical: true
},
{
    topicName: 'Signals and roundabouts',
    critical: true
},
{
    topicName: 'Signals and roundabouts',
    critical: false
},
{
    topicName: 'Signals and roundabouts',
    critical: false
},
{
    topicName: 'Signals and roundabouts',
    critical: false
},
]



const Item = ({contenuto}) => (
    contenuto.critical === true ? (<View style={styles.itemCritical}>
                                         <BouncyCheckbox  text={contenuto.topicName} textStyle={{textDecorationLine: "none", color:'black'}} textContainerStyle={styles.title} isChecked={true} onPress={(isChecked ) => {}} />
                                    </View>) 
                                    : 
                                    (<View style={styles.item}>
                                         <BouncyCheckbox  text={contenuto.topicName} textStyle={{textDecorationLine: "none", color:'black'}} textContainerStyle={styles.title} isChecked={false} onPress={(isChecked ) => {}} />
                                    </View>)
);

const Topics = () => {
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
            uniqueTitles.add({topicName : match.Title, critical : true});
            avgTopic.add({title: match.Title, avg: AverageRating});
          }
        });

        topics.forEach((topic) => {
          if(!uniqueTitles.has(topic.Title)){
            uniqueTitles.add({topicName : topic.Title , critical : false});
          }
        });

        setAllTopics(topics);
        console.log(topics[0].Title)
        setWeaknesses([...uniqueTitles]);
        console.log(weaknesses)
        // [{"avg": 2, "title": "Hill start"}, {"avg": 3, "title": "Parking"}, {"avg": 3.5, "title": "Emergency break"}]
        setWeaknessesAvg([...avgTopic]);
      })
      
      

      setLoading(false);
    });
  }, [selectedWeakness]);

  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    contenuto: weaknesses[index],
  });
  
  const getItemCount = _data => weaknesses.length;


  return (
    <SafeAreaView style ={styles.container}>
      <VirtualizedList style={styles.scroll}
        initialNumToRender={5}
        renderItem={({item}) => <Item contenuto={item.contenuto} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    
  },
  itemCritical: {
    backgroundColor: '#DDDDDD',
    height: 60,
    justifyContent: 'center',
    marginHorizontal: '4%',
    padding: '2%',
    


  },
  item: {
    height: 60,
    justifyContent: 'center',
    marginHorizontal: '4%',
    padding: '2%'
  },
  title: {
    fontSize: 15,
    
    
  },
  scroll: {
  }
});

export default Topics;