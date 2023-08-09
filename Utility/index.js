import {Dimensions} from 'react-native';

export const screens = {
  auth: 'Auth',
  app: 'App',
  postList: 'PostList',
  post: 'Post',
};

export const constants = {
  userInfo: 'userInfo',
  userToken: 'userToken',
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export {windowWidth, windowHeight};

export default screens;
