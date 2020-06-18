import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import LoginScreen from './LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import { set } from 'react-native-reanimated';
import Loading from '../components/Loading';

export default function RegistrationScreen({ navigation }) {
	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		padding: 16,
		backgroundColor: '#fff',
	},
});
