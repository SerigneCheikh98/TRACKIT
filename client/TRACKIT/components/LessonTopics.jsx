import { useState, useCallback, useEffect, React, useRef } from 'react';
import API from '../API';
import { IconButton, Card, Button, Divider } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';
import { Pressable, Modal } from 'react-native';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ControlFilled } from '@ant-design/icons';
import Separator from './Separator';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const handleTopic = (topic) => {
    setSelectedTopic(topic.topicName);
    setSelectedDescription(topic.description);
    setModalVisible(true);
  };

  const Item = ({ contenuto }) => (
    contenuto.top === true ? (<View style={styles.itemCritical}>
      <BouncyCheckbox style={styles.container} text={topicBox(contenuto, setModalVisible, handleTopic)}  textStyle={{ textDecorationLine: "none", color: 'black' }} textContainerStyle={styles.title} isChecked={contenuto.critical} onPress={(isChecked) => {
        //text={contenuto.topicName}
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
        <BouncyCheckbox text={topicBox(contenuto, setModalVisible, handleTopic)} textStyle={{ textDecorationLine: "none", color: 'black' }} textContainerStyle={styles.title} isChecked={contenuto.critical} onPress={(isChecked) => {
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
            uniqueTitles.add({ topicName: match.Title, critical: true, top : true, description: match.Description });
            avgTopic.add({ title: match.Title, avg: AverageRating, description: match.Description });
          }
        });
        topics.forEach((topic) => {
          if (!uniqueTitles.has(topic.Title)) {
            uniqueTitles.add({ topicName: topic.Title, description: topic.Description, critical: false, top : false });
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
       <Overlay containerStyle={{backgroundColor: 'rgba(128, 128, 128, 0.75)'}} visible={ modalVisible} childrenWrapperStyle={{ padding: 0}} onClose={()=>{setModalVisible(false)}} closeOnTouchOutside>
          <Modal visible={modalVisible} transparent={true}  animationType="slide" onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.containerStyle}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{selectedTopic}</Text>
                <Text>{selectedDescription}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          </Overlay>
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


const topicBox = (contenuto, setModalVisible, handleTopic)=>{
  return(
    <View style = {
      {
       
       flex: 1
        

      }
      
    }>
      <View
      style={
        {
          flex: 1,
          flexDirection: 'row',
          
          flexWrap: 'nowrap',
          flexBasis:'auto',
          flexShrink: '100%',
        
        borderStartColor:'#1F1937',
        width: 260,
        borderRadius: 5,
       
      }
      }>
      <Text style={{fontSize:15,  paddingTop: '3%', paddingBottom:'5%'}}>{contenuto.topicName}</Text>
      <IconButton
      onPress={()=>{handleTopic(contenuto)}}
      style={{
         marginRight: '1%',
         position:'absolute',
         marginLeft: '87%'

    }}
    icon="information-variant"
    size={15}
    backgroundColor='#1F1937'
    iconColor='white'
    ></IconButton> 

      
    {/* <Card
  style={{
   
    marginTop:'1%',
    marginLeft:'3%',
    marginRight:'3%',
    backgroundColor:'white',
    borderRadius:5,
    height:'100%',
    width: 260

  }}>
    <Card.Content ><Text style={{fontSize:15, fontWeight:'bold', color:'#1F1937'}}>{contenuto.topicName}</Text>
    <Text style={{fontSize:15, fontStyle:'italic',  color:'#1F1937'}}>Weakness</Text>
    </Card.Content>
    <Card.Actions>
     
      <IconButton
      onPress={()=>{}}
    icon="information-variant"
    size={15}
    backgroundColor='#1F1937'
    iconColor='white'
    ></IconButton> 
    </Card.Actions>
  </Card> */}
  </View>
  <Divider/>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex:1,
   width: '100%',
   
  },
  itemCritical: {
    backgroundColor: '#DDDDDD',
    flex:1,
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
  },
  topicBox:{
    flex: 1,
    height: '100%',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    backgroundColor:'white',
    alignItems: 'flex-start',
    borderRadius:5,
    marginRight:'1%'
  },
   icon: {
   width: '50%'
   },
   topicName:{
    width: '50%'
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
      height: 0,
    }
  },
  buttonClose: {
    backgroundColor: '#F9C977',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },

  });

export default Topics;