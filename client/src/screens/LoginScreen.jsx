import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../components/Logo';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import ErrorBoundary from '../components/ErrorBoundary';
import AuthContext from '../contexts/AuthContext';
import Loading from '../components/Loading';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 250,
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
    marginVertical: 10,
  },
  buttonStyle: {
    marginVertical: 15,
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

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
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
      <ErrorBoundary error={error} />
      <Header>Welcome Back</Header>
      <TextInput
        style={styles.inputBoxStyle}
        placeholder='Email'
        placeholderTextColor='#273A7F'
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
        title='Login'
        style={styles.buttonStyle}
        handlePress={async () => {
          try {
            await login(email, password);
            // response ? setLoading(true) : setLoading(false);
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <TextButton
        title={"Don't have an account? create one here"}
        handlePress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
