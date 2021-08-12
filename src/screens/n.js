import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import {Button, Image} from 'react-native-elements';
import axios from 'axios';

import {
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  LogBox,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Heading} from 'material-bread';
import ImagePicker from 'react-native-image-picker';

const TrackCreateScreen = () => {
  const [emailAuth, setEmailFromAuth] = useState('loading...');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [UPI, setUPI] = useState('');
  const [image, setImage] = useState('');
  const [imagesend, setImagesend] = useState('');

  const [loading, setLoading] = useState(false);

  const [nameError1, setNameError1] = useState(false);
  const [nameError2, setNameError2] = useState(false);
  const [titleError1, setTitleError1] = useState(false);
  const [descError, setDiscError] = useState(false);
  const [fundError1, setfundError1] = useState(false);
  const [fundError2, setfundError2] = useState(false);
  const [upiError, setUpiError] = useState(false);

  const handleNameError = () => {
    if (name.length == 0) {
      setNameError2(true);
      setNameError1(false);
      return false;
    } else if (name.length < 3) {
      setNameError1(true);
      setNameError2(false);
      return false;
    } else {
      setNameError1(false);
      setNameError2(false);
      return true;
    }
  };

  const handleTitleError = () => {
    if (title.length < 17 || title.length > 40) {
      setTitleError1(true);
      return false;
    } else {
      setTitleError1(false);
      return true;
    }
  };

  const handleFundError = () => {
    if (amount.length == 0) {
      setfundError1(true);
      setfundError2(false);
      return false;
    } else if (amount > 5000) {
      setfundError2(true);
      setfundError1(false);

      return false;
    } else {
      setfundError1(false);
      setfundError2(false);
      return true;
    }
  };

  const handleUPIError = () => {
    if (UPI.length > 17 || UPI.length < 5) {
      setUpiError(true);
      return false;
    } else {
      setUpiError(false);
      return true;
    }
  };
  const handleDescError = () => {
    if (description.length < 40 || description.length > 150) {
      setDiscError(true);
      return false;
    } else {
      setDiscError(false);
      return true;
    }
  };

  const addimage = () => {
    setLoading(true);
    const options = {
      title: 'Select Avatar',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setLoading(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setLoading(false);
      } else {
        setImage(response.uri);

        let newfile = {
          uri: response.uri,
          type: `test/${response.type.split('.')[1]}`,
          name: `test.${response.type.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    });
  };

  const handleUpload = image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'donateApp');
    data.append('cloud_name', 'fishmeister');

    axios
      .post('https://api.cloudinary.com/v1_1/fishmeister/image/upload', data)
      .then(response => {
        console.log(response.data);
        setImagesend(response.data.url);
        setImage(response.data.url);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const Boiler = async () => {
    setEmailFromAuth(await AsyncStorage.getItem('email'));
  };
  useEffect(() => {
    Boiler();
  }, []);

  const onSubmit = () => {
    const Request = {
      username: name,
      title: title,
      email: emailAuth,
      fundrequired: amount,
      fundraised: 0,
      upi: UPI,
      description: description,
      image: imagesend,
    };

    trackerApi
      .post('/request', Request)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const checkData = () => {
    handleNameError();
    handleTitleError();
    handleFundError();
    handleUPIError();
    handleDescError();
    if (
      handleNameError() &&
      handleTitleError() &&
      handleFundError() &&
      handleUPIError() &&
      handleDescError()
    ) {
      onSubmit();
    } else {
      console.log('data is incorrect');
    }
  };

  return (
    <ScrollView style={styles.topcontainer}>
      <Heading text="REQUEST" style={styles.Heading} />
      <View style={styles.container}>
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Name
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              backgroundColor: '#F0EEFF',
              borderRadius: 5,
            }}
            placeholder="Enter full name"
            placeholderTextColor="black"
            onChangeText={userInput => setName(userInput)}
            value={name}
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
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Email
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              backgroundColor: '#F0EEFF',
              borderRadius: 5,
            }}
            label="Email"
            placeholder="Enter email"
            editable={false}
            placeholderTextColor="black"
            value={emailAuth}
          />
        </View>
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Title
          </Text>

          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              backgroundColor: '#F0EEFF',
              borderRadius: 5,
            }}
            label="Title"
            placeholder="Enter title"
            placeholderTextColor="black"
            onChangeText={userInput => setTitle(userInput)}
            value={title}
          />
          {titleError1 ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Title must be 17-40 characters long.
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Description
          </Text>
          <TextInput
            style={styles.description}
            placeholderTextColor="black"
            placeholder="Tell your story"
            onChangeText={userInput => setDescription(userInput)}
            value={description}
            multiline={true}
          />
          {descError ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Description must be 40-150 characters long.
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Fund required
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              backgroundColor: '#F0EEFF',
              borderRadius: 5,
            }}
            label="Fund Required"
            placeholder="Enter the amount of fund required"
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={userInput => setAmount(parseInt(userInput))}
            value={amount}
          />
          {fundError1 ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Fund required can not be empty.
              </Text>
            </View>
          ) : null}
          {fundError2 ? (
            <View style={{padding: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Amount can not be more than ₹5000
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.child}>
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            UPI ID
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              backgroundColor: '#F0EEFF',
              borderRadius: 5,
            }}
            placeholder="Enter your UPI ID"
            placeholderTextColor="black"
            onChangeText={userInput => setUPI(userInput)}
            value={UPI}
          />
          {upiError ? (
            <View style={{paddingTop: 1, paddingBottom: 1}}>
              <Text style={{color: '#F16A62', fontWeight: 'bold'}}>
                Please enter a valid UPI ID.
              </Text>
            </View>
          ) : null}
          <Text
            style={{
              paddingBottom: 4,
              fontSize: 14,
              fontWeight: 'bold',

              color: 'rgba(0,0,0,0.8)',
              paddingTop: 2,
            }}>
            NOTE: You must be Merchant to accept payments, please enter a valid
            merchant ID
          </Text>
        </View>
        <Text
          style={{
            color: 'black',

            fontSize: 16,
            paddingBottom: 9,

            fontWeight: 'bold',
          }}>
          Select Banner
        </Text>

        <View style={styles.childi}>
          <View style={{height: '100%', width: '100%'}}>
            <Image
              source={{uri: image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#5344C2',
            borderRadius: 7,
            marginBottom: 6,
          }}>
          <TouchableOpacity onPress={() => addimage()}>
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                Choose Image
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.child}>
          <Button
            title="Submit"
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: '#5344C2',
            }}
            titleStyle={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'SF-Regular',
              letterSpacing: 5,
              fontSize: 18,
            }}
            onPress={() => checkData()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topcontainer: {
    backgroundColor: '#1C1C32',
  },
  container: {
    backgroundColor: 'white',
    marginTop: '2%',

    paddingTop: 10,

    padding: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  childi: {
    borderRadius: 1,
    marginBottom: 10,

    borderStyle: 'dashed',
    borderWidth: 2.5,
    borderColor: 'black',
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Heading: {
    color: 'white',
    fontSize: 40,
    paddingTop: 10,
    letterSpacing: 8,
    textAlign: 'center',
  },
  description: {
    color: 'black',
    textAlignVertical: 'top',
    height: 120,
    fontSize: 16,
    backgroundColor: '#F0EEFF',
    borderRadius: 4,
  },
  child: {
    paddingBottom: 5,
  },
});

export default TrackCreateScreen;
