import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen}options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}options={{headerShown: false}}/>
        <Stack.Screen name="AppNavigator" component={AppNavigator}options={{headerShown: false}}/>
    </Stack.Navigator>
)

export default AuthNavigator;