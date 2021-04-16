import * as React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import LightTheme from "./src/themes/LightTheme";
import "react-native-get-random-values";
import DarkTheme from "./src/themes/DarkTheme";
import AuthStackNavigator from "./src/navigators/AuthStackNavigator";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import ThemeContext from "./src/contexts/ThemeContext";
import ErrorBoundary from "./src/base/errorBoundary/ErrorBoundary";
import useAuth from "./src/hooks/useAuth/useAuth";
import QuizProvider from "./src/providers/quizProvider/QuizProvider";
import QuizSessionProvider from "./src/providers/quizSessionProvider/QuizSessionProvider";
import AuthContext from "./src/contexts/AuthContext";
import UserContext from "./src/contexts/UserContext";

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const { state } = useAuth();
  const [isThemeDark, setIsThemeDark] = React.useState(colorScheme === "dark");
  const [user, setUser] = React.useState(state.user);
  const theme = isThemeDark ? DarkTheme : LightTheme;

  React.useEffect(() => {
    setUser(state.user);
  }, [state.user]);
  const toggleTheme = () => {
    return setIsThemeDark(!isThemeDark);
  };

  const themeContextProps = {
    toggleTheme,
    isThemeDark,
  };

  const updateUser = (newValue, attribute) => {
    if (attribute === "quiz") {
      const { quizzes } = user;
      quizzes.push(newValue);
      return setUser({ ...user, quizzes });
    }

    const newUser = user;
    newUser[attribute] = newValue;
    return setUser(newUser);
  };

  const userContextProps = {
    user,
    updateUser,
  };

  const renderScreens = () => {
    return state.isSignedIn ? (
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    ) : (
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  };

  return (
    <ErrorBoundary>
      <AppearanceProvider>
        <AuthContext.Provider value={state}>
          <UserContext.Provider value={userContextProps}>
            <QuizProvider>
              <QuizSessionProvider>
                <ThemeContext.Provider value={themeContextProps}>
                  <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                      <StatusBar
                        backgroundColor={
                          theme === LightTheme
                            ? theme.colors.primary
                            : theme.colors.surface
                        }
                        barStyle="default"
                      />

                      <Stack.Navigator
                        screenOptions={{
                          headerShown: false,
                          animationEnabled: false,
                          gestureEnabled: true,
                        }}
                      >
                        {renderScreens()}
                      </Stack.Navigator>
                    </NavigationContainer>
                  </PaperProvider>
                </ThemeContext.Provider>
              </QuizSessionProvider>
            </QuizProvider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </AppearanceProvider>
    </ErrorBoundary>
  );
};

export default App;
