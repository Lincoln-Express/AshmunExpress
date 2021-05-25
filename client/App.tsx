import * as React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";
import LightTheme from "./src/themes/LightTheme";
import DarkTheme from "./src/themes/DarkTheme";
import AuthStackNavigator from "./src/navigators/AuthStackNavigator";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import ThemeContext from "./src/contexts/ThemeContext";
import ErrorBoundary from "./src/base/errorBoundary/ErrorBoundary";
import useAuth from "./src/hooks/useAuth/useAuth";
import ModeProvider from "./src/providers/modeProvider/ModeProvider";
import ModeSessionProvider from "./src/providers/modeSessionProvider/ModeSessionProvider";
import AuthContext from "./src/contexts/AuthContext";
import UserContext from "./src/contexts/UserContext";
import { Appearance, Mode } from "./src/types/types";

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const { state, auth } = useAuth();
  const [isThemeDark, setIsThemeDark] = React.useState(colorScheme === "dark");
  const [user, setUser] = React.useState(state.user);
  const theme = isThemeDark ? DarkTheme : LightTheme;

  React.useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  const toggleTheme = () => {
    const { appearance } = user;
    const newAppearance =
      appearance === Appearance.DARK ? Appearance.LIGHT : Appearance.DARK;
    setUser({ ...user, appearance: newAppearance });
    return setIsThemeDark(!isThemeDark);
  };

  const themeContextProps = {
    toggleTheme,
    isThemeDark,
  };

  const updateUser = async (newValue, attribute) => {
    if (attribute === "mode") {
      const { modes } = user;
      if (modes) {
        modes.push(newValue);
        return setUser({ ...user, modes });
      } else {
        const newModesArray = [] as Mode[];
        newModesArray.push(newValue);
        return setUser({ ...user, modes: newModesArray });
      }
    }

    const newUser = user;
    newUser[attribute] = newValue;

    await SecureStore.setItemAsync("user", JSON.stringify(newUser));
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
        <AuthContext.Provider value={auth}>
          <UserContext.Provider value={userContextProps}>
            <ModeProvider>
              <ModeSessionProvider>
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
              </ModeSessionProvider>
            </ModeProvider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </AppearanceProvider>
    </ErrorBoundary>
  );
};

export default App;
