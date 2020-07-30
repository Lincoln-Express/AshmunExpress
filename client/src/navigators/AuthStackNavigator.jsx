import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
const AuthStackNavigator = () => (
  <AuthStack.Navigator
    mode='modal'
    screenOptions={{ headerShown: false, animationEnabled: false }}
    anima
  >
    <AuthStack.Screen name='Login'>
      {() => (
        <LoginStack.Navigator
          mode='card'
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          <LoginStack.Screen name='Login' component={LoginScreen} />
        </LoginStack.Navigator>
      )}
    </AuthStack.Screen>
    <AuthStack.Screen name='Registration' component={RegistrationScreen} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
