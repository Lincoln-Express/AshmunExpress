import React from 'react';
import { View, Text } from 'react-native';
import Logo from './Logo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
export default function SignUpScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Logo />
			<TouchableOpacity
				style={styles.buttonStyle}
				onPress={() => navigation.navigate(RegistrationScreen)}
			>
				<Text>Join Ashmun Express</Text>
			</TouchableOpacity>
			<Text onPress={() => navigation.navigate(LoginScreen)}>
				{' '}
				Have an account? Login Here{' '}
			</Text>
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
	buttonStyle: {
		width: 280,
		height: 55,
		color: '#273A7F',
		borderRadius: 10,
	},
	textStyle: {},
});
