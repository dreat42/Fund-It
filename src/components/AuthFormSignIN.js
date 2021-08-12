import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import NavLink from '../components/NavLink';

const AuthFormIN = ({errorMessage, onSubmit, submitButtonText}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleEmailError = mail => {
    if (
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
        mail,
      )
    ) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      return false;
    }
  };

  const handlePasswordError = pass => {
    if (pass.length < 8) {
      setPassError(true);
      return false;
    } else {
      setPassError(false);
      return true;
    }
  };

  const startLoader = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  });

  const checkData = () => {
    handleEmailError(email);

    handlePasswordError(password);

    if (handleEmailError(email) && handlePasswordError(password)) {
      startLoader();
      onSubmit({email, password});
    } else {
      console.log('data is incorrect');
    }
  };

  return (
    <View style={styles.back}>
      <Image
        source={require('../screens/bgimage.jpg')}
        style={{height: '50%', width: '100%'}}
      />
      <View style={styles.back1}></View>
      <View style={styles.top}>
        <Text style={{fontSize: 20}}>Welcome Back!!!</Text>
        <Text style={{fontSize: 40, fontWeight: 'bold', paddingBottom: 4}}>
          Login
        </Text>
        <View style={styles.field}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 15,
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.6)',
            }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              borderColor: '#000',
              borderRadius: 10,
              borderWidth: 2,
              color: 'rgba(0,0,0,0.7)',
              fontSize: 18,
              paddingLeft: 7,
              fontWeight: 'bold',
            }}
            placeholder="example@email.com"
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          {emailError ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Please enter a valid Email address.
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={{
            paddingBottom: 4,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.6)',
          }}>
          Password
        </Text>
        <View style={styles.field}>
          <TextInput
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              borderColor: '#000',
              borderRadius: 10,
              borderWidth: 2,
              color: 'rgba(0,0,0,0.7)',
              fontSize: 18,
              paddingLeft: 7,
              fontWeight: 'bold',
            }}
            placeholder="Must have at least 6 characters"
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          {passError ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Password must be at least 8 characters long.
              </Text>
            </View>
          ) : null}
        </View>

        {errorMessage ? (
          <View>
            <Text style={{color: '#F16A62', fontWeight: 'bold', fontSize: 16}}>
              There was an error in logging you in.
            </Text>
          </View>
        ) : null}

        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            title={submitButtonText}
            onPress={() => checkData()}>
            {loading ? (
              <ActivityIndicator color="#FFFF" />
            ) : (
              <Text style={{color: '#FFFF', fontSize: 20}}>
                {submitButtonText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 17}}>Dont't have an account?</Text>
          <NavLink text="Register " text2="here!" routeName="Signup" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back1: {
    width: '100%',
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  top: {
    backgroundColor: '#FFFF',
    marginTop: 'auto',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 120,
    padding: 20,
    paddingTop: 30,
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFF',
  },

  field: {
    paddingBottom: '1.3%',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#050522',
    padding: 16,
    alignItems: 'center',

    width: '100%',
  },
});

export default AuthFormIN;
