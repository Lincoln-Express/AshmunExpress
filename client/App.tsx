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
import UserProvider, {
  useUserDispatch,
} from "./src/providers/userProvider/UserProvider";
import AuthProvider, {
  useAuthState,
} from "./src/providers/authProvider/AuthProvider";
import QuizProvider from "./src/providers/quizProvider/QuizProvider";
import QuizSessionProvider from "./src/providers/quizSessionProvider/QuizSessionProvider";
import { ActionType } from "./src/types/types";

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const state = useAuthState();
  const [isThemeDark, setIsThemeDark] = React.useState(colorScheme === "dark");
  const theme = isThemeDark ? DarkTheme : LightTheme;
  const dispatch = useUserDispatch();

  const toggleTheme = () => {
    return setIsThemeDark(!isThemeDark);
  };

  const themePreferences = {
    toggleTheme,
    isThemeDark,
  };

  React.useEffect(() => {
    if (dispatch) {
      dispatch({ type: ActionType.SET_USER, payload: state.user ?? null });
    }
  }, [dispatch]);

  const renderScreens = () => {
    return state.user?.firstName ? (
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    ) : (
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  };

  return (
    <ErrorBoundary>
      <AppearanceProvider>
        <AuthProvider>
          <UserProvider>
            <QuizProvider>
              <QuizSessionProvider>
                <ThemeContext.Provider value={themePreferences}>
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
          </UserProvider>
        </AuthProvider>
      </AppearanceProvider>
    </ErrorBoundary>
  );
};

export default App;
