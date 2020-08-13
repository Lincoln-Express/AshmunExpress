import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleScreen from '../screens/ExampleScreen';
import PracticeScreen from '../screens/PracticeScreen';
import TestScreen from '../screens/TestScreen';
import TutorialScreen from '../screens/TutorialScreen';

const QuizStack = createStackNavigator();
const QuizStackNavigator = () => (
  <QuizStack.Navigator
    mode='modal'
    screenOptions={{ headerShown: false, animationEnabled: false }}
  >
    <QuizStack.Screen name='Example' component={ExampleScreen} />
    <QuizStack.Screen name='Practice' component={PracticeScreen} />
    <QuizStack.Screen name='Test' component={TestScreen} />
    <QuizStack.Screen name='Tutorial' component={TutorialScreen} />
  </QuizStack.Navigator>
);

export default QuizStackNavigator;
