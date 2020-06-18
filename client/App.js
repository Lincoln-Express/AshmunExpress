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
import { createAction } from './src/utils/createAction';

const Stack = createStackNavigator();
export default function App() {
	// add statusBar later
	// temp state manager
	const [state, dispatch] = React.useReducer(
		(reducer = (state, action) => {
			switch (action.type) {
				case 'SET_USER':
					return {
						...state,
						user: { ...action.payload },
					};
				default:
					return state;
			}
		}),
		(initialState = {
			user = undefined,
		})
	);
	const auth = React.useMemo(
		() => ({
			login: async (email, password) => {
				// backend code should go in here

				// should add username option soon
				const user = {
					email: '', // stuff.user.email,
					token: '' // stuff.jwt,
				}
				dispatch(createAction('SET_USER', user));
			},
			logout: () => {
				console.log('logged out');
			},
			register: async (firstname, lastname, email, password) => {
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
