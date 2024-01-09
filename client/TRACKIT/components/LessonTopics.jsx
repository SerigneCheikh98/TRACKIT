import React from 'react';
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

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  contenuto: staticTopics[index],
});

const getItemCount = _data => staticTopics.length;

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