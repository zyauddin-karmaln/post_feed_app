import AsyncStorage from '@react-native-async-storage/async-storage';
import {constants} from '.';

export const getUser = async (callback = () => {}) => {
  try {
    const userObj = await AsyncStorage.getItem(constants.userInfo);
    if (!!userObj) {
      callback(JSON.parse(userObj));
    } else {
      callback(null);
    }
  } catch (e) {
    callback(null);
  }
};

export const setUser = async userObj => {
  try {
    await AsyncStorage.setItem(constants.userInfo, JSON.stringify(userObj));
    console.log('userObj set successfully');
  } catch (e) {
    console.log('error saving userObj:- ', e);
  }
};

export const getToken = async (callback = () => {}) => {
  try {
    const userToken = await AsyncStorage.getItem(constants.userToken);
    if (!!userToken) {
      callback(JSON.parse(userToken));
    } else {
      callback(null);
    }
  } catch (e) {
    callback(null);
  }
};

export const setToken = async userToken => {
  try {
    await AsyncStorage.setItem(constants.userToken, JSON.stringify(userToken));
    console.log('userToken set successfully');
  } catch (e) {
    console.log('error saving userToken:- ', e);
  }
};
