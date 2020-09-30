import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegistrationScreen from "../screens/auth/register/RegistrationScreen";

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();
const AuthStackNavigator = (): JSX.Element => (
  <AuthStack.Navigator
    mode="modal"
    screenOptions={{ headerShown: false, animationEnabled: false }}
  >
    <AuthStack.Screen name="Login">
      {() => (
        <LoginStack.Navigator
          mode="card"
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
      )}
    </AuthStack.Screen>
    <AuthStack.Screen name="Registration" component={RegistrationScreen} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
