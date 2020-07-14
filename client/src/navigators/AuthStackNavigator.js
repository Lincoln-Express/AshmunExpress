import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
export default function AuthStackNavigator() {
	return (
		<AuthStack.Navigator
			mode={'modal'}
			screenOptions={{ headerShown: false, animationEnabled: false }}
			anima
		>
			<AuthStack.Screen name={'Login'}>
				{() => (
					<LoginStack.Navigator
						mode={'card'}
						screenOptions={{
							headerShown: false,
							animationEnabled: false,
						}}
					>
						<LoginStack.Screen
							name={'Login'}
							component={LoginScreen}
						/>
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
