import axios from 'axios';
import React, { useState ,useEffect} from 'react';

import Cardscreen from './card/card';
import  {View, StyleSheet, Text,Image ,FlatList ,TouchableOpacity,ScrollView, Animated} from 'react-native';




const TrackDetailScreen = () =>{

    const [state, setstate] = useState([]);
    const [loading, setLoading] = useState(true);
   


    async function fetchData() {
      const request = await axios.get(
        'https://donationbackend.herokuapp.com/displayreq',
      );
      if (request.data !== []) {
        setstate(request.data);
        setLoading(false);
      }
  
      return request;
    }
  
    useEffect(() => {
      fetchData();
    }, []);


    console.log(state);
   


  




    const scrollY = React.useRef(new Animated.Value(0)).current;
    const SPACING=10;
    const AVATAR_SIZE =100;
    const ITEM_SIZE=AVATAR_SIZE+SPACING*20;



    return (
      <View >
      <View style={styles.bc}><Text style={styles.ds}>Donate Screen</Text></View>
      <Animated.View>
        <Image source={require('./background.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={5}
        />
      
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
    
      </View >
        <Animated.FlatList contentContainerStyle={{ paddingBottom: 200 }}
         onRefresh={() => fetchData()}
         refreshing={loading}
          keyExtractor={state => state.updatedAt}
          data={state}
          onScroll={Animated.event([{nativeEvent : {contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
            )}
          renderItem={({ item , index}) => {
            const inputRange =[-2,0,ITEM_SIZE * index,ITEM_SIZE*(index +7)]
            
          
            const scale = scrollY.interpolate({
              inputRange,
              outputRange:[1,1,1,0]
            })
            return (
              <Animated.View style={{flexDirection :'row', transform:[{scale}]}}>
                <Cardscreen title={item.title} problem={item.description} images={item.image} amount={item.fundrequired} name={item.username}/>
                </Animated.View>
                
              
             
            );
          }}
          
        />
        </Animated.View>
        </View>
      );
    };
    

    const styles = StyleSheet.create({ds:
      {textAlign:'center', 
      paddingTop:50, 
      paddingBottom:10,
      fontSize: 21,
      fontWeight: 'bold'
      ,letterSpacing: 5,
      color: 'black',},
      bc:{backgroundColor:'#e6e6e6',
    },main:{
      width:'100%',
      height:'100%',
      
  
    }
    })



export default TrackDetailScreen;



      
 


