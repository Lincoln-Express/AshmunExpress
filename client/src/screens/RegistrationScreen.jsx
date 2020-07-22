import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../components/Logo';
import Header from '../components/Header';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import AuthContext from '../contexts/AuthContext';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputBoxStyle: {
    borderColor: '#273A7F',
    borderWidth: 1,
    width: '100%',
    color: '#273A7F',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerStyle: { paddingTop: 170 },
  buttonStyle: {
    marginVertical: 15,
  },
  iconButtonStyle: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#fff' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraHeight={150}
    >
      <ImageBackground
        // eslint-disable-next-line global-require
        source={require('../../assets/background.jpg')}
        style={styles.imageStyle}
      />
      <Logo />
      <Header style={styles.headerStyle}>Register Here</Header>
      <IconButton
        style={styles.iconButtonStyle}
        name='close-circle-outline'
        handlePress={() => {
          navigation.pop();
        }}
      />
      <ErrorBoundary error={error} />
      <TextInput
        style={styles.inputBoxStyle}
        placeholder='First Name'
        placeholderTextColor='#273A7F'
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.inputBoxStyle}
        placeholder='Last Name'
        placeholderTextColor='#273A7F'
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.inputBoxStyle}
        placeholder='Email'
        placeholderTextColor='#273A7F'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputBoxStyle}
        placeholder='Password'
        placeholderTextColor='#273A7F'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title='Register'
        style={styles.buttonStyle}
        handlePress={async () => {
          try {
            setLoading(true);
            await register(firstName, lastName, email, password);
            navigation.pop();
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
}
