import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
export default function LoginForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInputStyle}
				placeholder='First Name'
				onChangeText={(firstName) => setFirstName(firstName)}
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder='Last Name'
				onChangeText={(lastName) => setLastName(lastName)}
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder='Lincoln Email Address'
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				style={styles.textInputStyle}
				placeholder='Pick a Username'
				onChangeText={(userName) => setUserName(userName)}
			/>
			<TextInput
				style={styles.textInputStyle}
				secureTextEntry={true}
				placeholder='Password'
				onChangeText={(password) => setPassword(password)}
			/>
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

	textInputStyle: {
		width: 300,
		height: 40,
		borderColor: '#273A7F',
		borderWidth: 1,
	},
});
