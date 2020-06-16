import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/SignUpScreen';
import RegistrationScreen from './src/RegistrationScreen';
import LoginScreen from './src/LoginScreen';

const Stack = createStackNavigator();
export default function App() {
	// set the signup flag here
	return (
		<NavigationContainer>
			<StatusBar backgroundColor='#f57c00' barStyle='light-content' />
			<Stack.Navigator>
				<Stack.Screen name='SignUp' component={SignUpScreen} />
				<Stack.Screen name='Register' component={RegistrationScreen} />
				{/* if there is already an account */}
				<Stack.Screen name='Login' component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
