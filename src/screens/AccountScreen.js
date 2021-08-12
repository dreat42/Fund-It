import React, { useState, useEffect,useContext} from 'react';
import { Image, View, Platform ,StyleSheet,Text,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import {Heading} from 'material-bread';
import {Input,Button} from 'react-native-elements';
import axios from 'axios';



const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  
  const Boiler = async () => {
    setEmailFromAuth(await AsyncStorage.getItem('email'));
  };

  
  useEffect(() => {
    Boiler();
   
 
  }, []);

 
   

 


  const [emailAuth, setEmailFromAuth] = useState('loading...');

  
  return (
    <View>
  
    
      <View style={styles.bc}><Text style={styles.ds}>Account Screen</Text></View>
      <Image
      style={styles.background}
      blurRadius={2}
        source={require('./dac.jpg')}
    
      
      />
      <View style={styles.main}>
    <View style={styles.topcontainer}>
      <Image
        style={styles.backgroundImage}
        blurRadius={0.2}
        source={require('./abs.jpg')}
      />
     
    <View ><Image
        style={styles.user}
   
        source={require('./as.png')}
      /></View>
       
      <View style={styles.container}>
        <View> 
     
  
     
          <Text style={{fontSize:18,color:'#FFFF'}}>{emailAuth}</Text>
        </View>
        </View>

        
      
      </View>
      </View>

      

    
     
 <TouchableOpacity    style={{ 
       
       borderRadius: 8,
      
       marginLeft:70,
       marginRight:70,
       backgroundColor:'#212121',
       alignItems:'center',
       padding:10
      
       
     }}    onPress={signout}><Text style={{color:'white',fontWeight:'bold'}}>Sign Out</Text></TouchableOpacity>
     <View style={{paddingTop:30,paddingLeft:15,}}>
        <Text style={{color: '#D8D8D8',fontStyle:'italic'}} >
          For more information regarding anything you can visit "https://dreat42.github.io/home" 
        </Text>
      </View>
       
        </View>
      
    
      
        
    
  );
};

const styles = StyleSheet.create({ 
  main:{padding:50},

  container: {margin: 30},


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
  user: {


    top: 0,

    left: 20,
    bottom: 0,
    right: 0,
  

    width: 140,
    height: 140,
  },
  background: {
   
    position: 'absolute',
    
    top:90,
    paddingBottom:640,
  

    

    width: '100%',
    height: '100%',
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
    },
   });

export default AccountScreen;
