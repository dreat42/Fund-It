import React,{useState} from 'react';
import  {View, StyleSheet, Text,Image, TouchableOpacity,Modal } from 'react-native';
// import  {Card,CardMedia,Image ,CardContent,CardActions} from 'material-bread';
import {Card} from 'material-bread';
// import RNUpiPayment from 'react-native-upi-payment'
import {CardContent} from 'material-bread';
import {CardMedia} from 'material-bread';
import { FontAwesome } from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import Progress from './ProgressBar'
// import * as Progress from 'react-native-progress';

// import RNUpiPayment from 'react-native-upi-pay';



//   const callInitPayment = () => {
//     RNUpiPayment.initializePayment({
//       vpa: 'john@upi', // or can be john@ybl or mobileNo@upi
//       payeeName: 'John Doe',
//       amount: '1',
//       transactionRef: 'aasf-332-aoei-fn'
//     }, successCallback, failureCallback);
//   }
//     const successCallback = () => {}
//     const failureCallback =() => {}
  
//   const compoundDidMount=()=>{
//   // callPayment

// }



const Cardscreen = ({problem,title ,images,amount,name}) => {

  const [state , setState ] = useState({showMe:false})
  const [damount, setAmount] = useState('');



  
 

  return (<View style={{flexDirection: 'row', alignItems: 'center', marginTop:15,paddingLeft:30,paddingRight:30 }}>
    
  <Card style={styles.Card}>
    <CardMedia style={{padding:12}}
    
        
        image={
          
            <Image style={{ width: '105%', height: '110%', alignSelf: 'center' ,borderRadius:5}}  source={{uri: `${images}`}}/>
        

            
        }
    />
    <CardContent style={{ fontSize:16, padding:10 }}>
    <Text style={{ color: '#ffff', fontSize: 14 ,fontSize: 14,fontWeight: 'bold',textAlign: 'left' ,backgroundColor:"#00C7AB",alignSelf: 'flex-start',borderRadius:4,paddingLeft:4,paddingRight:4}}>
        {name}
      </Text>
     
      
      <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 14 ,fontSize: 14,fontWeight: 'bold',textAlign: 'left'}}>
        {title}
      </Text>
      <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 14 ,fontSize: 14,textAlign: 'left'}}>
        {problem}
      </Text>
      <Text><FontAwesome name="money" size={14} color="black" />  {amount}</Text> 
      
      <Progress 
              step={damount}
              steps={amount}
              height={10}
              totalWidth={80}
              fontColor={'rgba(0,0,0,1)'}
            />
      <TouchableOpacity onPress={()=> {setState({showMe:true})}} style={styles.donate}><Text style={styles.text}>Donate</Text></TouchableOpacity>



    
     <View >
        <Modal  visible={state.showMe} >
        <Image 
         
         source={require('../image.jpg')}
         style={StyleSheet.absoluteFillObject}
                blurRadius={0}
              
      />
          <View style={{paddingTop:180,padding:50}}>
            <Text style={{fontSize:40,alignItems:'center',fontStyle:'italic'}}>We are glad to see your contribution</Text>
            <Input
            style={{color: 'black',textAlignVertical: 'top',paddingTop:34}}
          
            labelStyle={{color: 'black'}}
            placeholderTextColor="black"

            placeholder="Enter amount in Rupee"
            onChangeText={userInput => setAmount(userInput)}
            value={damount}
            keyboardType="numeric"
      
        />
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity  onPress={()=> {setState({showMe:false})}} ><Text style={{ padding: 15,borderRadius: 35,  backgroundColor: '#D798BA',opacity:0.7,alignSelf: 'flex-start'}}>Close</Text></TouchableOpacity>
        
         
          <TouchableOpacity ><Text style={{ padding: 15,borderRadius: 35,  backgroundColor: '#BBDDA4',opacity:0.7,alignSelf: 'flex-start'}}>Donate</Text></TouchableOpacity>
          </View>
          </View>
        </Modal>
        </View>
   


 
   
     
      
     
    </CardContent>

   

 


    
   
  </Card>
</View>);
  


};







const styles = StyleSheet.create({
  background:{
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
    
    justifyContent:'center'
},

  
  Card:{

  backgroundColor:'#FFFF',
  
  
  width:'100%',
  height:'100%',
  shadowColor:'#000',
  shadowOpacity:1,
  shadowRadius: 3.84,
  elevation: 30,
  shadowOffset:{
    width:3,
    height:3

  },
  borderRadius:15

},
donate:{alignItems: 'flex-end',

paddingVertical: 1,
paddingTop:8,
paddingBottom:8,
paddingRight:30,




}
,
text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'green',
  },
});

export default Cardscreen;
