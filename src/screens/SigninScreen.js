import React, {useContext, useEffect} from 'react';
import {View, LogBox} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AuthFormIN from '../components/AuthFormSignIN';

import {Context} from '../context/AuthContext';

const SigninScreen = () => {
  const {state, signin, clearErrorMessage} = useContext(Context);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <View>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthFormIN
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Login"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: () => false,
};

export default SigninScreen;
