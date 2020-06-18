import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Logo />
			<Header style={styles.header}> Login</Header>
			<InputField style={styles.inputBox} placeholder={'Username'} />
			<InputField
				style={styles.inputBox}
				placeholder={'Password'}
				secureTextEntry={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		padding: 20,
	},
	inputBox: { marginVertical: 5 },
	header: { marginBottom: 15 },
});
