import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QuizStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const MainTab = createBottomTabNavigator();

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='Home'
				component={HomeScreen}
			></HomeStack.Screen>
		</HomeStack.Navigator>
	);
};
const ProfileStackScreen = () => {
	return (
		<ProfileStack.Navigator>
			<ProfileStack.Screen
				name='Profile'
				component={ProfileScreen}
			></ProfileStack.Screen>
		</ProfileStack.Navigator>
	);
};
const QuizStackScreen = () => {
	return (
		<QuizStack.Navigator>
			<QuizStack.Screen
				name='Quiz'
				component={QuizScreen}
			></QuizStack.Screen>
		</QuizStack.Navigator>
	);
};
const SettingsStackScreen = () => {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name='Settings'
				component={SettingsScreen}
			></SettingsStack.Screen>
		</SettingsStack.Navigator>
	);
};
export default function MainStackNavigator() {
	return (
		<MainTab.Navigator initialRouteName='Home'>
			<MainTab.Screen name='Home' component={HomeStackScreen} />
			<MainTab.Screen name='Quiz' component={QuizStackScreen} />
			<MainTab.Screen name='Settings' component={SettingsStackScreen} />
			<MainTab.Screen name='Profile' component={ProfileStackScreen} />
		</MainTab.Navigator>
	);
}
