import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import KeyboardHelper from './KeyboardHelper';

export default function InputField({ style, ...props }) {
	return <TextInput {...props} style={[style, styles.inputBox]} />;
}

const styles = StyleSheet.create({
	inputBox: {
		backgroundColor: '#e8e8e8',
		width: '100%',
		color: '#273A7F',
		padding: 20,
		borderRadius: 5,
	},
});
