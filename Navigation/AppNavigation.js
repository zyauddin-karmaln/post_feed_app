import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../Utility';
import PostFeed from '../screens/PostFeed';
import PostDetails from '../screens/PostDetails';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screens.postList}>
      <Stack.Screen
        name={screens.postList}
        component={PostFeed}
        options={{headerShown: true, title: 'Post List'}}
      />
      <Stack.Screen
        name={screens.post}
        component={PostDetails}
        options={{headerShown: true, title: 'Post Details'}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
