import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./src/navigators/AuthStackNavigator";
import MainTabNavigator from "./src/navigators/MainTabNavigator";
import AuthContext from "./src/contexts/AuthContext";
import UserContext from "./src/contexts/UserContext";
import useAuth from "./src/hooks/useAuth";
import ErrorBoundary from "./src/base/ErrorBoundary/ErrorBoundary";

const Stack = createStackNavigator();
export default function App() {
  const { auth, state } = useAuth();
  function renderScreens() {
    return state.user ? (
      <Stack.Screen name="MainStack">
        {() => {
          const { user } = state;
          // eslint-disable-next-line react/jsx-indent
          <UserContext.Provider value={user}>
            <MainTabNavigator />
          </UserContext.Provider>;
        }}
      </Stack.Screen>
    ) : (
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <StatusBar backgroundColor="#f57c00" barStyle="default" />

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {renderScreens()}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ErrorBoundary>
    // <NavigationContainer>
    //   <MainTabNavigator />
    // </NavigationContainer>
  );
}
