
import axios from 'axios';
import React,{ useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input,Button} from 'react-native-elements';


import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  LogBox,
  Alert
} from 'react-native';
import {Heading} from 'material-bread';

const TrackCreateScreen = () => {
  const Boiler = async () => {
    setEmailFromAuth(await AsyncStorage.getItem('email'));
  };
  useEffect(() => {
    Boiler();
  }, []);
  const [emailAuth, setEmailFromAuth] = useState('loading...');

  const [Feedback, setFeedback] = useState('');

  
  const onSubmittrue= () =>  {
    


    const feedbackfun = {
      email:emailAuth,
      feedback:Feedback

      

    }

      console.log(feedbackfun);

      axios.post('https://donationbackend.herokuapp.com/feedback',feedbackfun)   
            .then(response =>{
              console.log(response.data);
            })
            .catch(error => {
              console.log(error.response.data);
            });

         

  };




  const onSubmit = () => {
    console.log(Feedback.length)
    if (Feedback.length >= 10 ) {

      


      
      Alert.alert('Submitted', 'Your feedback has been  recorded', [
        {text: 'OK'}
      ]);
      onSubmittrue();
    }
    
      
     else {
      Alert.alert('Failed to submit', 'Your feedback is too short to be recorded', [
        {text: 'OK'}
      ]);
    }
  };


  return (
    <View>
    <View style={styles.bc}><Text style={styles.ds}>Feedback Screen</Text></View>
    <Image
      style={styles.background}
 
        source={require('./ba.jpg')}
    
      
      />
      

    <View style={styles.main}>
    <View style={styles.topcontainer}>
      <Image
        style={styles.backgroundImage}
        blurRadius={1}
        source={require('./contactcard.jpg')}
      />
      <View style={styles.container}>
        <Heading type={2} text="Contact  Us" style={styles.Heading} />

        
        <View>
          <Input
            style={{color: '#D8D8D8'}}
            label="Email"
            placeholder="Enter email"
            editable={false}
            labelStyle={{color: 'white'}}
            placeholderTextColor="#D8D8D8"
            value={emailAuth}
          />
        </View>
        <View>
          <Input
            style={{color: '#D8D8D8',height:100,textAlignVertical: 'top',}}
            label="Feedback"
            labelStyle={{color: 'white'}}
            placeholderTextColor="#D8D8D8"
            placeholder="Enter Feedback"
            onChangeText={userInput => setFeedback(userInput)}
            value={Feedback}
            multiline={true}
            maxLength={150}
        
        />
    
        <Button  title='Submit'  type="outline" buttonStyle={{ 
       
      borderRadius: 15,
      borderWidth:2 ,
      borderColor:'white'
    }}  titleStyle={{color: "white" }}  onPress={()=>onSubmit()}/>
        </View>

        
      
      </View>

      </View>
      <View style={{paddingTop:30,paddingRight:90,}}>
        <Text style={{color: '#D8D8D8',fontStyle:'italic'}} >
          We all need people who will give us feedback. That’s how we improve.
        </Text>
      </View>
      

    </View>

   
  
    </View>
  );
};

const styles = StyleSheet.create({
  main:{padding:50},

  container: {margin: 20},


  backgroundImage: {
    borderRadius:20,
    position: 'absolute',
    top: 0,
    flex: 1,
    left: 0,
    bottom: 0,
    right: 0,

    width: '100%',
    height: '100%',
  },
  background: {
   
    position: 'absolute',
    
    top:90,
    

    width: '100%',
    height: '102%',
  },
  Heading: {color: 'white', fontFamily: ''},
  description: {
    color: '#D8D8D8',
    textAlignVertical: 'top',
    height: 100,
  },
  ds:
      {textAlign:'center', 
      paddingTop:50, 
      paddingBottom:10,
      fontSize: 21,
      fontWeight: 'bold'
      ,letterSpacing: 5,
      color: 'black',},
      bc:{backgroundColor:'#e6e6e6',
    }
});

export default TrackCreateScreen;

      
      
  