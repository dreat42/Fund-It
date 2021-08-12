import React, {useRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const Progress = ({step, steps, height, totalWidth, fontColor}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    //-width + width * step/steps
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <View>
      <Text style={{ color: fontColor}}>
        ₹{step}/{steps}
      </Text>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;

          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: '#545568',
          borderRadius: 15,

          overflow: 'hidden',
          width: totalWidth,
        }}>
        <Animated.View
          style={{
            height:40,
            width: '100%',
            borderRadius: 1,
            backgroundColor: '#33E6F6',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [{translateX: animatedValue}],
          }}
        />
      </View>
    </View>
  );
};
export default Progress;
