import 'react-native-gesture-handler';
import React, { useReducer, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import LightTheme from './src/themes/LightTheme';
import { AuthContext } from './src/contexts/AuthContext';
import { UserContext } from './src/contexts/UserContext';
import useAuth from './src/hooks/useAuth';

const Stack = createStackNavigator();
export default function App() {
	// add statusBar later
	const { auth, state } = useAuth();
	function renderScreens() {
		return state.user ? (
			<Stack.Screen name={'MainStack'}>
				{() => {
					<UserContext.Provider value={(user = state.user)}>
						<MainStackNavigator />
					</UserContext.Provider>;
				}}
			</Stack.Screen>
		) : (
			<Stack.Screen name={'AuthStack'} component={AuthStackNavigator} />
		);
	}
	return (
		// <AuthContext.Provider value={auth}>
		// 	<NavigationContainer>
		// 		<StatusBar backgroundColor='#f57c00' style='auto' />
		// 		<Stack.Navigator screenOptions={{ headerShown: false }}>
		// 			{renderScreens()}
		// 		</Stack.Navigator>
		// 	</NavigationContainer>
		// </AuthContext.Provider>

		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={'MainStack'}
					component={MainStackNavigator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
