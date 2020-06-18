import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
export default function AuthStackNavigator() {
	// add statusBar later
	return (
		<AuthStack.Navigator
			mode={'modal'}
			screenOptions={{ headerShown: false }}
		>
			<AuthStack.Screen name={'Login'}>
				{() => (
					<LoginStack.Navigator
						mode={'card'}
						screenOptions={{ headerShown: false }}
					>
						<LoginStack.Screen
							name={'Login'}
							component={LoginScreen}
						></LoginStack.Screen>
					</LoginStack.Navigator>
				)}
			</AuthStack.Screen>
			<AuthStack.Screen
				name={'Registration'}
				component={RegistrationScreen}
			/>
		</AuthStack.Navigator>
	);
}
