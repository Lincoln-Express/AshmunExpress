import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Logo from './Logo';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
export default function SignUpScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.buttonStyle}>
				<Button
					title={'Join Ashmun Express'}
					onPress={() => navigation.navigate(RegistrationScreen)}
					color='#273A7F'
				></Button>
				<Text
					style={styles.textStyle}
					onPress={() => navigation.navigate(LoginScreen)}
				>
					{' '}
					Have an account? Login Here{' '}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 45,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 200,
		width: 250,
		height: 50,
		borderRadius: 10,
	},
	textStyle: {
		textAlign: 'center',
	},
});
