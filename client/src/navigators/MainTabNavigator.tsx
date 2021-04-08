import "react-native-gesture-handler";
import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper/src/core/theming";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../contexts/ThemeContext";
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

const HomeStackScreen = () => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomColor: isThemeDark
            ? theme.colors.primary
            : theme.colors.accent,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomColor: isThemeDark
            ? theme.colors.primary
            : theme.colors.accent,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const QuizStackScreen = () => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();

  return (
    <QuizStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomColor: isThemeDark
            ? theme.colors.primary
            : theme.colors.accent,
          borderBottomWidth: 0.5,
        },
      }}
      initialRouteName="Quiz"
    >
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
        component={ExampleScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <QuizStack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerTitleAlign: "center", headerLeft: undefined }}
      />
      <QuizStack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <QuizStack.Screen
        name="Practice"
        component={PracticeScreen}
        options={{ headerTitleAlign: "center", headerLeft: undefined }}
      />
    </QuizStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomColor: isThemeDark
            ? theme.colors.primary
            : theme.colors.accent,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const MainTabNavigator = (): JSX.Element => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();
  return (
    <MainTab.Navigator
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
        activeTintColor: isThemeDark
          ? theme.colors.primary
          : theme.colors.accent,
        inactiveTintColor: isThemeDark
          ? theme.colors.text
          : theme.colors.backdrop,
      }}
    >
      <MainTab.Screen name="Home" component={HomeStackScreen} />
      <MainTab.Screen
        name="Quiz"
        component={QuizStackScreen}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "Practice" || routeName === "Test") {
              return false;
            }

            return true;
          })(route),
        })}
      />
      <MainTab.Screen name="Profile" component={ProfileStackScreen} />
      <MainTab.Screen name="Settings" component={SettingsStackScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
