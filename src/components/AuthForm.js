import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import NavLink from '../components/NavLink';

const AuthForm = ({errorMessage, onSubmit, submitButtonText}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const [loading, setLoading] = useState(false);

  const [nameError1, setNameError1] = useState(false);
  const [nameError2, setNameError2] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleNameError = () => {
    if (username.length == 0) {
      setNameError2(true);
      setNameError1(false);
      return false;
    } else if (username.length < 3) {
      setNameError1(true);
      setNameError2(false);
      return false;
    } else {
      setNameError1(false);
      setNameError2(false);
      return true;
    }
  };

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
    handleNameError();
    handlePasswordError(password);

    if (
      handleEmailError(email) &&
      handleNameError() &&
      handlePasswordError(password)
    ) {
      startLoader();
      onSubmit({username, email, password});
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
      
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingBottom: 4}}>
          Register
        </Text>
        <View style={styles.field}>
          <Text
            style={{
              paddingBottom: '1%',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.6)',
            }}>
            Name
          </Text>
          <TextInput
            value={username}
            onChangeText={setusername}
            autoCorrect={false}
            style={{
              borderColor: '#000',
              borderRadius: 12,
              borderWidth: 2,
              color: 'black',
              fontSize: 20,
              paddingLeft:10
            }}
            placeholder="Enter name"
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          {nameError1 ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Name must be at least 3 characters long.
              </Text>
            </View>
          ) : null}
          {nameError2 ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Please enter your name.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text
            style={{
              paddingBottom: '1%',
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
              borderRadius: 12,
              borderWidth: 2,
              color: 'black',
              fontSize: 20,
              paddingLeft:10
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

        <View style={styles.field}>
          <Text
            style={{
              paddingBottom: '1%',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.6)',
            }}>
            Password
          </Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              borderColor: '#000',
              borderRadius: 12,
              borderWidth: 2,
              color: 'black',
              fontSize: 20,
              paddingLeft:10
            }}
            placeholder="Must have at least 8 characters"
            placeholderTextColor="rgba(0,0,0,0.6)"
          />
          {passError ? (
            <View style={{padding: 1,paddingLeft:1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Password must be at least 8 characters long.
              </Text>
            </View>
          ) : null}
        </View>

        <View>
          {errorMessage ? (
            <Text style={{color: '#F16A62', fontWeight: 'bold', fontSize: 16}}>
              Failed to register, please try again!
            </Text>
          ) : null}
        </View>

        <View
          style={{
            paddingTop: '2%',
            paddingBottom: '2%',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.button} onPress={() => checkData()}>
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
          <Text style={{fontSize: 17}}>Already have an account?</Text>
          <NavLink routeName="Signin" text="Login " text2="instead" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 100,
    padding: 20,
    paddingTop: 24,
   
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFF',
  },

  field: {
    paddingBottom: '0%',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#050522',
    padding: 7,
    alignItems: 'center',

    width: '100%',
  },
});

export default AuthForm;
