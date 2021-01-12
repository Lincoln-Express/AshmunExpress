import * as React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import LightTheme from "./src/utils/themes/LightTheme";
import DarkTheme from "./src/utils/themes/DarkTheme";
import AuthStackNavigator from "./src/navigators/AuthStackNavigator";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import AuthContext from "./src/contexts/AuthContext";
import UserContext from "./src/contexts/UserContext";
import ThemeContext from "./src/contexts/ThemeContext";
import useAuth from "./src/hooks/useAuth";
import ErrorBoundary from "./src/base/errorBoundary/ErrorBoundary";

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = React.useState(colorScheme === "dark");
  const theme = isThemeDark ? DarkTheme : LightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  const { auth, state } = useAuth();

  const renderScreens = () => {
    return state.user ? (
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    ) : (
      <Stack.Screen name="MainStack" component={MainTabNavigator} />
    );
  };

  return (
    <ErrorBoundary>
      <AppearanceProvider>
        <AuthContext.Provider value={auth}>
          <UserContext.Provider value={state}>
            <ThemeContext.Provider value={preferences}>
              <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                  <StatusBar
                    backgroundColor={theme === LightTheme ? "#F57C00" : "#000"}
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
          </UserContext.Provider>
        </AuthContext.Provider>
      </AppearanceProvider>
    </ErrorBoundary>
  );
};

export default App;
