import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
export default function LoginForm() {
	return (
		<View style={styles.container}>
			<TextInput style={styles.textInputStyle} placeholder='Username' />
			<TextInput
				style={styles.textInputStyle}
				secureTextEntry={true}
				placeholder='Password'
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
