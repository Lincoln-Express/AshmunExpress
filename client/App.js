import 'react-native-gesture-handler';
import React, { useReducer, useMemo } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import LightTheme from './src/themes/LightTheme';
import { AuthContext } from './src/contexts/AuthContext';
import { createAction } from './src/utils/createAction';
import axios from 'axios';
import { BASE_URL } from './src/config';

const Stack = createStackNavigator();
export default function App() {
	// add statusBar later
	// temp state manager
	const [state, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case 'SET_USER':
					return {
						...state,
						user: { ...action.payload },
					};
				default:
					return state;
			}
		},
		(initialState = {
			user: undefined,
		})
	);
	const auth = useMemo(
		() => ({
			login: async (email, password) => {
				// backend code should go in here
				const { data } = await axios.post(`${BASE_URL}`, {
					username: email,
					password,
				});
				const user = {
					email: data.user.email,
					token: data.jwt,
				};
				dispatch(createAction('SET_USER', user));
			},
			logout: () => {
				console.log('logged out');
			},
			register: async (firstname, lastname, email, password) => {
				// backend code should go in here
				await axios.post(`${BASE_URL}`, {
					username: email,
					firstname,
					lastname,
					email,
					password,
				});
			},
		}),
		[]
	);
	return (
		<AuthContext.Provider value={auth}>
			<NavigationContainer theme={LightTheme}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{state.user ? (
						<Stack.Screen
							name={'MainStack'}
							component={MainStackNavigator}
						/>
					) : (
						<Stack.Screen
							name={'AuthStack'}
							component={AuthStackNavigator}
						/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
