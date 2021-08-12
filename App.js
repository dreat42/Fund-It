import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image, StyleSheet} from 'react-native';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator(
    {
      TrackList: {
        screen: TrackDetailScreen,

        navigationOptions: {
          tabBarLabel: 'Donate',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/active.png')
              : require('./src/inactive.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      TrackCreate: {
        screen: TrackCreateScreen,
        navigationOptions: {
          tabBarLabel: 'Request',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/pa.png')
              : require('./src/pia.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      TrackDetail: {
        screen: TrackListScreen,
        navigationOptions: {
          tabBarLabel: 'Feedback',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/pactive.png')
              : require('./src/pinactive.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: {
          tabBarLabel: 'Account',
          tabBarIcon: ({focused, size}) => {
            const iconimg = focused
              ? require('./src/ainactive.png')
              : require('./src/aactive.png');
            return (
              <Image
                source={iconimg}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            );
          },
        },
      },
    },
    {
      tabBarOptions: {
        showLabel: false,
        style: {height: 55},
      },
    },
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
