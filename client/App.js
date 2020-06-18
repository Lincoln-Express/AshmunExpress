import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import lightTheme from './src/themes/LightTheme';
import { AuthContext } from './src/contexts/AuthContext';

const Stack = createStackNavigator();
export default function App() {
	// add statusBar later
	const auth = React.useMemo(
		() => ({
			login: (email, password) => {
				console.log('logged in');
			},
			logout: () => {
				console.log('logged out');
			},
			register: (firstname, lastname, email, password) => {
				// backend code should go in here

				console.log('registered');
			},
		}),
		[]
	);
	return (
		<AuthContext.Provider value={auth}>
			<NavigationContainer theme={lightTheme}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name={'AuthStack'}
						component={AuthStackNavigator}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
