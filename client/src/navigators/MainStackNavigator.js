import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const MainStack = createStackNavigator();
export default function MainStackNavigator() {
	return (
		<MainStack.Navigator>
			<MainStack.Screen name={'HomePage'} component={HomeScreen} />
		</MainStack.Navigator>
	);
}
