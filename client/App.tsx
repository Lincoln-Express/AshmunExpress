import * as React from "react";
import "react-native-gesture-handler";
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import AuthStackNavigator from "./src/navigators/AuthStackNavigator";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import AuthContext from "./src/contexts/AuthContext";
import UserContext from "./src/contexts/UserContext";
import useAuth from "./src/hooks/useAuth";
import ErrorBoundary from "./src/base/ErrorBoundary/ErrorBoundary";

// LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const App = (): JSX.Element => {
  const { auth, state } = useAuth();

  function renderScreens() {
    return state.user ? (
      <Stack.Screen name="MainStack" component={MainTabNavigator} />
    ) : (
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={state}>
          <PaperProvider>
            <NavigationContainer>
              <StatusBar backgroundColor="#f57c00" barStyle="default" />

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
        </UserContext.Provider>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
