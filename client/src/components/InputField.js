import React from 'react';
import {
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	View,
} from 'react-native';

export default function InputField({ style, ...props }) {
	return (
		// <KeyboardAvoidingView
		// 	behavior={Platform.OS === 'ios' ? 'padding' : null}
		// 	style={{ flex: 1 }}
		// >
		<TextInput {...props} style={[styles.inputBox, style]} />
		// </KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	inputBox: {
		backgroundColor: '#e8e8e8',
		width: '100%',
		color: '#273A7F',
		padding: 20,
		borderRadius: 5,
		justifyContent: 'flex-end',
	},
});
