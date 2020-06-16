import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './Logo';
import LoginForm from './LoginForm';

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Logo />
			<LoginForm />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
