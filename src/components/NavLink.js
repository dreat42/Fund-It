import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {withNavigation} from 'react-navigation';

const NavLink = ({navigation, text, routeName, text2}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 17}}>{text2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#F16A62',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default withNavigation(NavLink);
