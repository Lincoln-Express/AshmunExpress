import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import MainStackNavigator from './navigators/MainStackNavigator';
import AuthContext from './contexts/AuthContext';
import UserContext from './contexts/UserContext';
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();
export default function App() {
  const { auth, state } = useAuth();
  function renderScreens() {
    return state.user ? (
      <Stack.Screen name='MainStack'>
        {() => {
          const { user } = state;
          // eslint-disable-next-line react/jsx-indent
          <UserContext.Provider value={user}>
            <MainStackNavigator />
          </UserContext.Provider>;
        }}
      </Stack.Screen>
    ) : (
      <Stack.Screen name='AuthStack' component={AuthStackNavigator} />
    );
  }

  const theme = {
    dark: 'dark',
  };

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <StatusBar backgroundColor='#f57c00' barStyle={theme.dark} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}
          >
            {renderScreens()}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
