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
import ModeIntroScreen from "../screens/mode/ModeIntroScreen";
import ModePenultimateScreen from "../screens/mode/ModePenultimateScreen";
import ModeListScreen from "../screens/mode/ModeListScreen";
import ModeResultScreen from "../screens/mode/ModeResultScreen";
import ExampleScreen from "../screens/mode/ExampleScreen";
import TestScreen from "../screens/mode/TestScreen";
import PracticeScreen from "../screens/mode/PracticeScreen";
import TutorialScreen from "../screens/mode/TutorialScreen";
import AboutScreen from "../screens/settings/AboutScreen";
import FeedbackScreen from "../screens/settings/FeedbackScreen";
import NotificationsScreen from "../screens/settings/NotificationsScreen";
import AccountScreen from "../screens/settings/AccountScreen";

const HomeStack = createStackNavigator();
const ModeStack = createStackNavigator();
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

const ModeStackScreen = () => {
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();

  return (
    <ModeStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomColor: isThemeDark
            ? theme.colors.primary
            : theme.colors.accent,
          borderBottomWidth: 0.5,
        },
      }}
      initialRouteName="Mode"
    >
      <ModeStack.Screen
        name="Mode"
        component={ModeIntroScreen}
        options={{
          title: "Topics",
          headerTitleAlign: "center",
        }}
      />
      <ModeStack.Screen
        name="ModeList"
        component={ModeListScreen}
        options={({ route }) => ({
          title: `${route.params.section} -> ${route.params.topic}`,
        })}
      />
      <ModeStack.Screen
        name="ModeResult"
        component={ModeResultScreen}
        options={({ route }) => ({
          title: `${route.params.topic}/${route.params.section} Level ${route.params.level}`,
        })}
      />
      <ModeStack.Screen
        name="ModePenultimate"
        component={ModePenultimateScreen}
        options={({ route }) => ({
          title: `${route.params.topic} ${route.params.mode}`,
        })}
      />
      <ModeStack.Screen
        name="Example"
        component={ExampleScreen}
        options={{
          headerTitleAlign: "center",
          headerLeft: undefined,
        }}
      />
      <ModeStack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerTitleAlign: "center", headerLeft: undefined }}
      />
      <ModeStack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{ headerTitleAlign: "center", headerLeft: undefined }}
      />
      <ModeStack.Screen
        name="Practice"
        component={PracticeScreen}
        options={{ headerTitleAlign: "center", headerLeft: undefined }}
      />
    </ModeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
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
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
      <SettingsStack.Screen name="Account" component={AccountScreen} />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <SettingsStack.Screen name="Feedback" component={FeedbackScreen} />
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
          } else if (route.name === "Topics") {
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
        name="Topics"
        component={ModeStackScreen}
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
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
