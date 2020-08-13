import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import MainTabNavigator from './src/navigators/MainTabNavigator';
import AuthContext from './src/contexts/AuthContext';
import UserContext from './src/contexts/UserContext';
import useAuth from './src/hooks/useAuth';

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};
const Stack = createStackNavigator();
export default function App() {
  const screenData = useScreenDimensions();

  const container = {
    flex: 1,
    width: screenData.width,
    height: screenData.height,
    // marginTop: 90,
  };

  const { auth, state } = useAuth();
  function renderScreens() {
    return state.user ? (
      <Stack.Screen name='MainStack'>
        {() => {
          const { user } = state;
          // eslint-disable-next-line react/jsx-indent
          <UserContext.Provider value={user}>
            <MainTabNavigator />
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
    <View style={{ flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <SafeAreaView style={container}>
          <AuthContext.Provider value={auth}>
            <NavigationContainer>
              <StatusBar backgroundColor='#f57c00' barStyle={theme.dark} />

              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                {renderScreens()}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </SafeAreaView>
      </ScrollView>
    </View>
    // <NavigationContainer>
    //   <MainTabNavigator />
    // </NavigationContainer>
  );
}
