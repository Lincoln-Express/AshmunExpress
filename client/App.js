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
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
export default function App() {
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
		<SafeAreaProvider>
			<AuthContext.Provider value={auth}>
				<NavigationContainer>
					<StatusBar backgroundColor='#f57c00' style='dark' />
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							animationEnabled: false,
						}}
					>
						{renderScreens()}
					</Stack.Navigator>
				</NavigationContainer>
			</AuthContext.Provider>
		</SafeAreaProvider>
	);
}
