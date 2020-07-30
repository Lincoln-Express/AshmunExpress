/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-fragments */
import React, { useContext, useState, Fragment } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Logo from '../components/Logo';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import ErrorBoundary from '../components/ErrorBoundary';
import AuthContext from '../contexts/AuthContext';
import Loading from '../components/Loading';
import Header from '../components/Header';
import InputField from '../components/InputField';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 250,
    padding: 16,
    backgroundColor: '#fff',
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const validationSchema = yup.object().shape({
    email: yup.string().email().required().label('Your input'),
    password: yup
      .string()
      .required()
      .min(8, 'Password should be 8 characters or more')
      .label('Password'),
  });

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
      {/* <ErrorBoundary error={error} /> */}
      <Header>Welcome Back</Header>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await login(values.email, values.password);
            setLoading(true);
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Fragment>
            <InputField
              label='Email'
              formikProps={formikProps}
              pointer='email'
              placeholder='johndoe@email.com'
              placeholderTextColor='#808080'
              autoFocus
            />
            <InputField
              label='Password'
              formikProps={formikProps}
              pointer='password'
              placeholder='********'
              placeholderTextColor='#808080'
              secureTextEntry
              autoFocus
            />

            <FilledButton
              title='Login'
              handlePress={formikProps.handleSubmit}
            />
            <TextButton
              title={"Don't have an account? create one here"}
              handlePress={() => {
                navigation.navigate('Registration');
              }}
            />
          </Fragment>
        )}
      </Formik>
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
