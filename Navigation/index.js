import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../Utility';
import LoginScreen from '../screens/LoginScreen';
import PostFeed from '../screens/PostFeed';
import {navigationRef} from './RootNavigation';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={screens.auth}>
        <Stack.Screen name={screens.auth} component={LoginScreen} />
        <Stack.Screen name={screens.app} component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
