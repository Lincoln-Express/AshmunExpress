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
import getTabIcon from '../utils/utils';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QuizStack = createStackNavigator();
const SettingsStack = createStackNavigator();

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
const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name='Settings' component={SettingsScreen} />
  </SettingsStack.Navigator>
);
// const nameValue = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;

const MainStackNavigator = () => (
  <MainTab.Navigator
    initialRouteName='Home'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const platform = Platform.OS === 'ios' ? 'ios' : 'android';
        const iconName = getTabIcon(platform, focused, route.name);

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'Quiz') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#273A7F',
      inactiveTintColor: 'gray',
    }}
  >
    <MainTab.Screen name='Home' component={HomeStackScreen} />
    <MainTab.Screen name='Quiz' component={QuizStackScreen} />
    <MainTab.Screen name='Settings' component={SettingsStackScreen} />
    <MainTab.Screen name='Profile' component={ProfileStackScreen} />
  </MainTab.Navigator>
);

export default MainStackNavigator;
