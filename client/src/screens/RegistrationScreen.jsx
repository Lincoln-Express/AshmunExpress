/* eslint-disable react/jsx-fragments */
import React, { useContext, useState, Fragment } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Logo from '../components/Logo';
import Header from '../components/Header';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import AuthContext from '../contexts/AuthContext';
import Loading from '../components/Loading';
import InputField from '../components/InputField';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerStyle: { paddingTop: 170 },
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object().shape({
    firstName: yup.string().required().label('First Name'),
    lastName: yup.string().required().label('Last Name'),
    email: yup.string().email().required().label('Your input'),
    password: yup
      .string()
      .required()
      .min(8, 'Password should be 8 characters or more')
      .label('Password'),
    confirmPassword: yup
      .string()
      .required()
      .min(8, 'Password should be 8 characters or more')
      .label('Confirm Password')
      .test('passwords-match', "Passwords don't match", function (value) {
        // eslint-disable-next-line react/no-this-in-sfc
        return this.parent.password === value;
      }),
  });

  // registration screen will have a confirm password field
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#fff' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      enableOnAndroid
      // extraScrollHeight={200}
    >
      <ImageBackground
        // eslint-disable-next-line global-require
        source={require('../../assets/background.jpg')}
        style={styles.imageStyle}
      />
      <Logo />
      <IconButton
        style={styles.iconButtonStyle}
        name='close-circle-outline'
        handlePress={() => {
          navigation.pop();
        }}
      />
      <Header style={styles.headerStyle}>Register Here</Header>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            await register(
              values.firstName,
              values.lastName,
              values.email,
              // eslint-disable-next-line comma-dangle
              values.password
            );
            navigation.pop();
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
              label='FirstName'
              formikProps={formikProps}
              pointer='firstName'
              placeholder='John'
              placeholderTextColor='#808080'
              secureTextEntry
              autoFocus
            />
            <InputField
              label='LastName'
              formikProps={formikProps}
              pointer='lastName'
              placeholder='Doe'
              placeholderTextColor='#808080'
              secureTextEntry
              autoFocus
            />
            <InputField
              label='Email'
              formikProps={formikProps}
              pointer='email'
              placeholder='johndoe@gmail.com'
              placeholderTextColor='#808080'
              secureTextEntry
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

            <InputField
              label='Confirm Password'
              formikProps={formikProps}
              pointer='confirmPassword'
              placeholder='confirm password'
              placeholderTextColor='#808080'
              secureTextEntry
              autoFocus
            />

            <FilledButton
              title='Register'
              handlePress={formikProps.handleSubmit}
            />
          </Fragment>
        )}
      </Formik>
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
}
