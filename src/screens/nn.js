import axios from 'axios';
import React, {useState, useEffect} from 'react';

import Progress from '../components/ProgressBar';

import {
  View,
  StyleSheet,
  Image,
  LogBox,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {ActivityIndicator} from 'react-native';

const TrackDetailScreen = ({navigation}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const [state, setstate] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const request = await axios.get(
      'https://donate-server-new.herokuapp.com/displayreq',
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

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const SPACING = 20;
  const AVATAR_SIZE = 100;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 2;

  return (
    <View style={styles.background}>
      <View style={{padding: 5}}>
        <Text
          style={{
            fontSize: 40,
            color: 'white',
            letterSpacing: 8,
            textAlign: 'center',
            color: 'white',
          }}>
          DONATE
        </Text>
      </View>

      <Animated.View>
        <Animated.FlatList
          onRefresh={() => fetchData()}
          refreshing={loading}
          contentContainerStyle={{padding: SPACING / 1.4, paddingBottom: 150}}
          keyExtractor={item => item.upi}
          data={state}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              -2,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View
                style={{
                  flexDirection: 'row',
                  transform: [{scale}],
                  padding: SPACING / 2,
                  marginBottom: SPACING,
                  backgroundColor: '#151528',
                  borderRadius: 12,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 1,
                  shadowRadius: 12,
                  elevation: 8,
                }}>
                <View>
                  <Image
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      borderRadius: 5,
                      marginRight: SPACING / 2,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>

                <View style={{width: '70%'}}>
                  <Text
                    style={{
                      fontSize: 13.5,

                      color: 'rgba(255,255,255,1)',

                      alignSelf: 'flex-start',

                      paddingLeft: 0.6,
                      fontFamily: 'HelveticaNowText-Regular',
                    }}>
                    {item.username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'HelveticaNowText-Medium',

                      color: 'rgba(255,255,255,1)',
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      marginTop: 'auto',

                      flexDirection: 'row',
                    }}>
                    <View>
                      <Progress
                        step={item.fundraised}
                        steps={item.fundrequired}
                        height={14}
                        totalWidth={130}
                        fontColor={'rgba(255,255,255,1)'}
                      />
                    </View>

                    <View
                      style={{
                        marginTop: '7%',
                        left: 0,
                        paddingLeft: '30%',
                        paddingRight: '30%',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('TrackDetail', {
                            title: item.title,
                            name: item.username,
                            fundrequired: item.fundrequired,
                            fundraised: item.fundraised,
                            problem: item.description,
                            image: item.image,
                            upi: item.upi,
                            id: item._id,
                          })
                        }>
                        <Text
                          style={{
                            color: 'rgba(255,255,255,1)',
                          }}>
                          read more
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Animated.View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#191A32',
    height: '100%',
    width: '100%',
  },

  main: {
    width: '100%',
    height: '100%',
  },
});

export default TrackDetailScreen;
