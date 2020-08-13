/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TopicsScreen from '../screens/TopicsScreen';
import LevelsScreen from '../screens/LevelsScreen';
import QuizListScreen from '../screens/QuizListScreen';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QuizStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const TopicsStack = createStackNavigator();
const LevelsStack = createStackNavigator();
const QuizListStack = createStackNavigator();

const MainTab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={HomeScreen} />
  </HomeStack.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name='Profile' component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const QuizStackScreen = () => (
  <QuizStack.Navigator>
    <QuizStack.Screen name='Quiz' component={QuizScreen} />
  </QuizStack.Navigator>
);

const QuizListStackScreen = () => (
  <QuizListStack.Navigator>
    <QuizStack.Screen name='QuizList' component={QuizListScreen} />
    <QuizStack.Screen name='Quiz' component={QuizStackScreen} />
  </QuizListStack.Navigator>
);

const LevelsStackScreen = () => (
  <LevelsStack.Navigator>
    <LevelsStack.Screen name='Levels' component={LevelsScreen} />
    <LevelsStack.Screen name='QuizList' component={QuizListStackScreen} />
  </LevelsStack.Navigator>
);

const TopicsStackScreen = () => (
  <TopicsStack.Navigator>
    <TopicsStack.Screen name='Topics' component={TopicsScreen} />
    <TopicsStack.Screen name='Levels' component={LevelsStackScreen} />
  </TopicsStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name='Settings' component={SettingsScreen} />
  </SettingsStack.Navigator>
);

const MainTabNavigator = () => (
  <MainTab.Navigator
    // initialRoute.name='Home'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          if (Platform.OS === 'ios') {
            iconName = 'ios-home';
          } else {
            iconName = 'md-home';
          }
        } else if (route.name === 'Settings') {
          if (Platform.OS === 'ios') {
            iconName = 'ios-settings';
          } else {
            iconName = 'md-settings';
          }
        } else if (route.name === 'Topics') {
          if (Platform.OS === 'ios') {
            iconName = 'ios-list';
          } else {
            iconName = 'md-list';
          }
        } else if (route.name === 'Profile') {
          if (Platform.OS === 'ios') {
            iconName = 'ios-person';
          } else {
            iconName = 'md-person';
          }
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#273A7F',
      inactiveTintColor: '#808080',
    }}
  >
    <MainTab.Screen name='Home' component={HomeStackScreen} />
    <MainTab.Screen name='Topics' component={TopicsStackScreen} />
    <MainTab.Screen name='Profile' component={ProfileStackScreen} />
    <MainTab.Screen name='Settings' component={SettingsStackScreen} />
  </MainTab.Navigator>
);

export default MainTabNavigator;
