import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    padding: 16,
    backgroundColor: '#fff',
  },
});
const HomeScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();

  // const { logout } = useContext(AuthContext); // move this to profile
  // const { user } = useContext(UserContext); // not sure if i will need this here

  return (
    <View style={styles.container}>
      <Text>Welcome, students</Text>
    </View>
  );
};

export default HomeScreen;
