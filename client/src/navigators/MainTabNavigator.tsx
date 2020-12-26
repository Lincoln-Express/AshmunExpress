import "react-native-gesture-handler";
import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import QuizIntroScreen from "../screens/quiz/QuizIntroScreen";
import QuizPageScreen from "../screens/quiz/QuizPageScreen";
import QuizListScreen from "../screens/quiz/QuizListScreen";
import QuizResultScreen from "../screens/quiz/QuizResultScreen";
import ExampleScreen from "../screens/quiz/ExampleScreen";
import TestScreen from "../screens/quiz/TestScreen";
import PracticeScreen from "../screens/quiz/PracticeScreen";
import TutorialScreen from "../screens/quiz/TutorialScreen";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QuizStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const MainTab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const QuizStackScreen = () => (
  <QuizStack.Navigator>
    <QuizStack.Screen
      name="Quiz"
      component={QuizIntroScreen}
      options={{
        title: "Topics",
        headerTitleAlign: "center",
      }}
    />
    <QuizStack.Screen
      name="QuizList"
      component={QuizListScreen}
      options={({ route }) => ({
        title: `${route.params.topic}`,
      })}
    />
    <QuizStack.Screen
      name="QuizResult"
      component={QuizResultScreen}
      options={{ title: "Quiz Result" }}
    />
    <QuizStack.Screen
      name="QuizPage"
      component={QuizPageScreen}
      options={({ route }) => ({
        title: `${route.params.topic} ${route.params.quiz}`,
      })}
    />
    <QuizStack.Screen
      name="Example"
      component={QuizPageScreen}
      options={{ headerShown: false }}
    />
    <QuizStack.Screen
      name="Test"
      component={QuizPageScreen}
      options={{ headerShown: false }}
    />
    <QuizStack.Screen
      name="Tutorial"
      component={QuizPageScreen}
      options={{ headerShown: false }}
    />
    <QuizStack.Screen
      name="Practice"
      component={QuizPageScreen}
      options={{ headerShown: false }}
    />
  </QuizStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

const MainTabNavigator = (): JSX.Element => (
  <MainTab.Navigator
    // initialRoute.name='Home'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "";

        if (route.name === "Home") {
          if (Platform.OS === "ios") {
            iconName = "ios-home";
          } else {
            iconName = "md-home";
          }
        } else if (route.name === "Settings") {
          if (Platform.OS === "ios") {
            iconName = "ios-settings";
          } else {
            iconName = "md-settings";
          }
        } else if (route.name === "Quiz") {
          if (Platform.OS === "ios") {
            iconName = "ios-list";
          } else {
            iconName = "md-list";
          }
        } else if (route.name === "Profile") {
          if (Platform.OS === "ios") {
            iconName = "ios-person";
          } else {
            iconName = "md-person";
          }
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#273A7F",
      inactiveTintColor: "#808080",
    }}
  >
    <MainTab.Screen name="Home" component={HomeStackScreen} />
    <MainTab.Screen name="Quiz" component={QuizStackScreen} />
    <MainTab.Screen name="Profile" component={ProfileStackScreen} />
    <MainTab.Screen name="Settings" component={SettingsStackScreen} />
  </MainTab.Navigator>
);

export default MainTabNavigator;
