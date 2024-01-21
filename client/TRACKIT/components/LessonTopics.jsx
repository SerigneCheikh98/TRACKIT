import { useState, useCallback, useEffect, React, useRef } from 'react';
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





const Topics = (props) => {
  const [weaknesses, setWeaknesses] = useState([]);

  const numSelected = useRef(0); // Use useRef instead of useState for numSelected
  const [loading, setLoading] = useState(true);

  const Item = ({ contenuto }) => (
    contenuto.top === true ? (<View style={styles.itemCritical}>
      <BouncyCheckbox text={contenuto.topicName} textStyle={{ textDecorationLine: "none", color: 'black' }} textContainerStyle={styles.title} isChecked={contenuto.critical} onPress={(isChecked) => {
        isChecked ? numSelected.current += 1 : numSelected.current -= 1;
        contenuto.critical = !contenuto.critical;
        if (numSelected.current <= 0) {
          props.disable(true)
        } else {
          props.disable(false);

        }
      }} />
    </View>)
      :
      (<View style={styles.item}>
        <BouncyCheckbox text={contenuto.topicName} textStyle={{ textDecorationLine: "none", color: 'black' }} textContainerStyle={styles.title} isChecked={contenuto.critical} onPress={(isChecked) => {
          isChecked ? numSelected.current += 1 : numSelected.current -= 1;
          contenuto.critical = !contenuto.critical;
          if (numSelected.current <= 0) {
            props.disable(true)
          }else {
            props.disable(false);
  
          }

        }} />
      </View>)
  );


  useEffect(() => {
    API.getEvaluationsByStudentId().then((evals) => {
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

      numSelected.current = lowestRatings.length;
      // [{"AverageRating": 2, "TopicId": 4}, {"AverageRating": 3, "TopicId": 3}, {"AverageRating": 3.5, "TopicId": 6}]
      //console.log(lowestRatings);

      API.getAllTopics().then((topics) => {
        const uniqueTitles = new Set();
        const avgTopic = new Set();

        lowestRatings.forEach(({ TopicId, AverageRating }) => {
          const match = topics.find(({ Id }) => Id === TopicId);
          if (match && !uniqueTitles.has(match.Title)) {
            uniqueTitles.add({ topicName: match.Title, critical: true, top : true });
            avgTopic.add({ title: match.Title, avg: AverageRating });
          }
        });
        topics.forEach((topic) => {
          if (!uniqueTitles.has(topic.Title)) {
            uniqueTitles.add({ topicName: topic.Title, critical: false, top : false });
          }
        });
        setWeaknesses([...uniqueTitles]);
      })

      setLoading(false);
    });
  }, []);

  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    contenuto: weaknesses[index],
  });

  const getItemCount = _data => weaknesses.length;


  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList style={styles.scroll}
        initialNumToRender={5}
        renderItem={({ item }) => <Item contenuto={item.contenuto} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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