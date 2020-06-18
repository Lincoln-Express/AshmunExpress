import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();
export default function App() {
	// set the signup flag here
	return <LoginScreen />;
}
